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
from django.core.exceptions import ValidationError
from django.http import Http404
from django.db import DatabaseError

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
        results = User.objects.filter(Q(username__icontains=query) | Q(email__icontains(query)))
        data = [{"id": user.id, "username": user.username, "email": user.email} for user in results]
        return StandardizedResponse.success(data)

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

def handle_404(request, exception):
    return JsonResponse({'error': 'Resource not found'}, status=404)

def handle_400(request, exception):
    return JsonResponse({'error': 'Bad Request'}, status=400)

def handle_401(request, exception):
    return JsonResponse({'error': 'You are not authorized to access this resource'}, status=401)

def handle_403(request, exception):
    return JsonResponse({'error': 'You don\'t have the permission to access this resource'}, status=403)

def handle_405(request, exception):
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def handle_database_error(request, exception):
    return JsonResponse({'error': 'A database error occurred'}, status=500)

def handle_validation_error(request, exception):
    return JsonResponse({'error': 'A validation error occurred'}, status=400)

def handle_authentication_error(request, exception):
    return JsonResponse({'error': 'An authentication error occurred'}, status=401)

def handle_unexpected_error(request, exception):
    return JsonResponse({'error': 'An unexpected error occurred'}, status=500)

def init_error_handlers():
    from django.conf.urls import handler404, handler500, handler400, handler403, handler405
    handler404 = handle_404
    handler400 = handle_400
    handler401 = handle_401
    handler403 = handle_403
    handler405 = handle_405
    handler500 = handle_unexpected_error
    from django.core.exceptions import ValidationError
    from django.db import DatabaseError
    from django.http import Http404
    from rest_framework.exceptions import AuthenticationFailed
    from rest_framework.views import exception_handler

    def custom_exception_handler(exc, context):
        response = exception_handler(exc, context)
        if isinstance(exc, Http404):
            return handle_404(context['request'], exc)
        elif isinstance(exc, ValidationError):
            return handle_validation_error(context['request'], exc)
        elif isinstance(exc, DatabaseError):
            return handle_database_error(context['request'], exc)
        elif isinstance(exc, AuthenticationFailed):
            return handle_authentication_error(context['request'], exc)
        return response

    from rest_framework.settings import api_settings
    api_settings.EXCEPTION_HANDLER = custom_exception_handler

init_error_handlers()
