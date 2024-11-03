from django.utils.deprecation import MiddlewareMixin
from corsheaders.middleware import CorsMiddleware

class CustomCorsMiddleware(MiddlewareMixin, CorsMiddleware):
    def process_response(self, request, response):
        response = super().process_response(request, response)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
