from Backend import app
from flask import jsonify
from werkzeug.exceptions import HTTPException # type: ignore

def init_error_handler(app):
    @app.errorhandler(HTTPException)
    def handle_exception(e):
        #pass through HTTP errors
        if isinstance(e, HTTPException):
            return jsonify(error=str(e)), e.code
        
        app.logger.error(f"Unhandled Exception: {str(e)}")
        return jsonify(error="An Unexpected error occu"), 500
    
@app.errorhandler(404)
def not_found(e):
    return jsonify(error = "Resource not found"), 404

@app.errorhandler(400)
def bad_request(e):
    return jsonify(error = "Bad Request"), 400

@app.errorhandler(401)
def unauthorized(e):
    return jsonify(error = "You are not authorized to access this resourese"), 401

@app.errorhandler(403)
def forbidden(e):
    return jsonify(error = "You don't have the permission to access this resourese")

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify(error = "Method not allowed" )




    
        
        