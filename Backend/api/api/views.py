from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework import status
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
        return Response(response, status=status_code)

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
            "received_data": request.data
        }
        return StandardizedResponse.success(data)

class UserRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        data = [{"id": user.id, "username": user.username, "roles": [group.name for group in user.groups.all()]} for user in users]
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
        data = [{"id": notification.id, "message": notification.message, "timestamp": notification.timestamp} for notification in notifications]
        return StandardizedResponse.success(data)

    def post(self, request):
        message = request.data.get("message")
        send_mail(
            'New Notification',
            message,
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
        results = User.objects.filter(Q(username__icontains=query) | Q(email__icontains=query))
        data = [{"id": user.id, "username": user.username, "email": user.email} for user in results]
        return StandardizedResponse.success(data)
