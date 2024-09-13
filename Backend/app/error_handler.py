from flask import jsonify
from werkzeug.exceptions import HTTPException

def init_error_handler(app):
    @app.errorhandler(HTTPException)
    def handle_exception(e)
        #pass through HTTP errors
        if isinstance(e, HTTPException):
            return jsonify(error=str(e)), e.code
        
        