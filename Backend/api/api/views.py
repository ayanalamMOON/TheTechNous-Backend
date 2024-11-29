from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework import status, viewsets
from django.contrib.auth.models import User, Group
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Q
from rest_framework import serializers
from channels.generic.websocket import WebsocketConsumer
import json
from django.utils.html import escape
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q as ESQ
from elasticsearch_dsl.query import MultiMatch


class StandardizedResponse:
    @staticmethod
    def success(data, metadata=None):
        response = {
            "status": "success",
            "data": data
        }
        if metadata:
            response["metadata"] = metadata
        return Response(response, status=status.HTTP_200_OK)

    @staticmethod
    def error(message, status_code=status.HTTP_400_BAD_REQUEST):
        response = {
            "status": "error",
            "message": message
        }
        return Response(response, status_code)


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return StandardizedResponse.success(
            data,
            metadata={
                'page': self.page.number,
                'page_size': self.page_size,
                'total_pages': self.page.paginator.num_pages,
                'total_items': self.page.paginator.count
            }
        )


class ExampleView(APIView):
    def get(self, request):
        data = {
            "message": "This is an example response"
        }
        return StandardizedResponse.success(data)

    def post(self, request):
        if not request.data.get("example_field"):
            return StandardizedResponse.error("example_field is required", status.HTTP_400_BAD_REQUEST)

        data = {
            "message": "Data received successfully",
            "received_data": escape(request.data)
        }
        return StandardizedResponse.success(data)


class UserRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        data = [{"id": user.id, "username": user.username, "roles": [group.name for group in user.groups.all()]}
                for user in users]
        return StandardizedResponse.success(data)

    def post(self, request):
        user_id = request.data.get("user_id")
        role_name = request.data.get("role_name")
        user = get_object_or_404(User, id=user_id)
        role, created = Group.objects.get_or_create(name=role_name)
        user.groups.add(role)
        return StandardizedResponse.success({"message": "Role added successfully"})


class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = request.user.notifications.all()
        data = [{"id": notification.id, "message": notification.message, "timestamp": notification.timestamp}
                for notification in notifications]
        return StandardizedResponse.success(data)

    def post(self, request):
        message = request.data.get("message")
        send_mail(
            'New Notification',
            escape(message),
            settings.DEFAULT_FROM_EMAIL,
            [request.user.email],
            fail_silently=False,
        )
        return StandardizedResponse.success({"message": "Notification sent successfully"})


class SocialMediaShareView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        post_id = request.data.get("post_id")
        post_url = f"{settings.SITE_URL}/post/{post_id}"
        # Here you would integrate with social media APIs to share the post
        return StandardizedResponse.success({"message": "Post shared successfully", "post_url": post_url})


class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.data.get('file')
        if not file:
            return StandardizedResponse.error("No file provided", status.HTTP_400_BAD_REQUEST)

        file_name = default_storage.save(file.name, ContentFile(file.read()))
        file_url = default_storage.url(file_name)
        return StandardizedResponse.success({"message": "File uploaded successfully", "file_url": file_url})


class AdvancedSearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')
        filter_by = request.query_params.get('filter_by', '')
        sort_by = request.query_params.get('sort_by', '')

        es = Elasticsearch()
        s = Search(using=es, index="users")

        if query:
            q = MultiMatch(query=query, fields=['username', 'email'])
            s = s.query(q)

        if filter_by:
            s = s.filter(ESQ('term', **{filter_by: True}))

        if sort_by:
            s = s.sort(sort_by)

        response = s.execute()
        results = [{"id": hit.meta.id, "username": hit.username, "email": hit.email} for hit in response]

        return StandardizedResponse.success(results)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return StandardizedResponse.success(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return StandardizedResponse.success(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return StandardizedResponse.success(serializer.data, status_code=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return StandardizedResponse.success(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return StandardizedResponse.success({"message": "User deleted successfully"})


class CustomPermission(IsAuthenticated):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_active


class CustomThrottle:
    def allow_request(self, request, view):
        # Implement custom throttling logic here
        return True


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return StandardizedResponse.success(
            data,
            metadata={
                'page': self.page.number,
                'page_size': self.page_size,
                'total_pages': self.page.paginator.num_pages,
                'total_items': self.page.paginator.count
            }
        )


class WebSocketConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        self.send(text_data=json.dumps({
            'message': escape(data['message'])
        }))


class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        self.send(text_data=json.dumps({
            'message': escape(data['message'])
        }))


class NotificationCenterView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = request.user.notifications.all()
        data = [{"id": notification.id, "message": notification.message, "timestamp": notification.timestamp}
                for notification in notifications]
        return StandardizedResponse.success(data)

    def post(self, request):
        message = request.data.get("message")
        send_mail(
            'New Notification',
            escape(message),
            settings.DEFAULT_FROM_EMAIL,
            [request.user.email],
            fail_silently=False,
        )
        return StandardizedResponse.success({"message": "Notification sent successfully"})
