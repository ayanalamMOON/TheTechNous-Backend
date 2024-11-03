from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Notification
from app.activity_logger import log_user_activity
from app import app
import numpy as np
from sklearn.linear_model import LinearRegression

notifications = Blueprint('notifications', __name__, app=app)

def analyze_student_performance(user_id):
    """
    Analyze student performance using machine learning algorithms.

    :param user_id: The ID of the user.
    :return: Dictionary containing insights and recommendations.
    """
    # Example data, replace with actual data retrieval logic
    activities = [
        {"timestamp": 1, "score": 70},
        {"timestamp": 2, "score": 75},
        {"timestamp": 3, "score": 80},
        {"timestamp": 4, "score": 85},
        {"timestamp": 5, "score": 90},
    ]

    timestamps = np.array([activity["timestamp"] for activity in activities]).reshape(-1, 1)
    scores = np.array([activity["score"] for activity in activities])

    model = LinearRegression()
    model.fit(timestamps, scores)

    trend = model.coef_[0]
    recommendation = "Keep up the good work!" if trend > 0 else "Consider reviewing the material."

    return {
        "insights": {
            "average_score": np.mean(scores),
            "trend": trend
        },
        "recommendations": recommendation
    }

@notifications.route('/personalized_feedback', methods=['GET'])
@jwt_required()
def personalized_feedback():
    current_user_id = get_jwt_identity()
    feedback = analyze_student_performance(current_user_id)
    log_user_activity(current_user_id, 'Viewed personalized feedback')
    return jsonify(feedback), 200

@notifications.route('/send_notification', methods=['POST'])
@jwt_required()
def send_notification():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({"error": "Message is required"}), 400

    new_notification = Notification(user_id=current_user_id, message=message)
    db.session.add(new_notification)
    db.session.commit()

    log_user_activity(current_user_id, 'Sent a notification')
    return jsonify({"msg": "Notification sent successfully"}), 201
