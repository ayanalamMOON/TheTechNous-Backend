from Backend.app.viwes import app
from flask import jsonify
from werkzeug.exceptions import HTTPException # type: ignore
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from flask_jwt_extended.exceptions import NoAuthorizationError

def init_error_handler(app):
    """
    Initialize error handlers for the Flask application.

    :param app: The Flask application instance.
    """
    @app.errorhandler(HTTPException)
    def handle_exception(e):
        """
        Handle HTTP exceptions.

        :param e: The HTTP exception.
        :return: JSON response with error message and status code.
        """
        #pass through HTTP errors
        if isinstance(e, HTTPException):
            app.logger.error(f"HTTP Exception: {str(e)}")
            return jsonify(error=str(e)), e.code
        
        app.logger.error(f"Unhandled Exception: {str(e)}")
        return jsonify(error="An Unexpected error occurred"), 500
    
    @app.errorhandler(404)
    def not_found(e):
        """
        Handle 404 Not Found errors.

        :param e: The exception.
        :return: JSON response with error message and status code 404.
        """
        app.logger.error(f"404 Error: {str(e)}")
        return jsonify(error = "Resource not found"), 404

    @app.errorhandler(400)
    def bad_request(e):
        """
        Handle 400 Bad Request errors.

        :param e: The exception.
        :return: JSON response with error message and status code 400.
        """
        app.logger.error(f"400 Error: {str(e)}")
        return jsonify(error = "Bad Request"), 400

    @app.errorhandler(401)
    def unauthorized(e):
        """
        Handle 401 Unauthorized errors.

        :param e: The exception.
        :return: JSON response with error message and status code 401.
        """
        app.logger.error(f"401 Error: {str(e)}")
        return jsonify(error = "You are not authorized to access this resource"), 401

    @app.errorhandler(403)
    def forbidden(e):
        """
        Handle 403 Forbidden errors.

        :param e: The exception.
        :return: JSON response with error message and status code 403.
        """
        app.logger.error(f"403 Error: {str(e)}")
        return jsonify(error = "You don't have the permission to access this resource"), 403

    @app.errorhandler(405)
    def method_not_allowed(e):
        """
        Handle 405 Method Not Allowed errors.

        :param e: The exception.
        :return: JSON response with error message and status code 405.
        """
        app.logger.error(f"405 Error: {str(e)}")
        return jsonify(error = "Method not allowed"), 405

    @app.errorhandler(SQLAlchemyError)
    def handle_database_error(e):
        """
        Handle database errors.

        :param e: The SQLAlchemy exception.
        :return: JSON response with error message and status code 500.
        """
        app.logger.error(f"Database Error: {str(e)}")
        return jsonify(error="A database error occurred"), 500

    @app.errorhandler(ValidationError)
    def handle_validation_error(e):
        """
        Handle validation errors.

        :param e: The Marshmallow validation exception.
        :return: JSON response with error message and status code 400.
        """
        app.logger.error(f"Validation Error: {str(e)}")
        return jsonify(error="A validation error occurred"), 400

    @app.errorhandler(NoAuthorizationError)
    def handle_authentication_error(e):
        """
        Handle authentication errors.

        :param e: The Flask-JWT-Extended NoAuthorizationError exception.
        :return: JSON response with error message and status code 401.
        """
        app.logger.error(f"Authentication Error: {str(e)}")
        return jsonify(error="An authentication error occurred"), 401
