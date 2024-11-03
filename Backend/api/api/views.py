from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework import status

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
