from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

routes = Blueprint('routes_tablas',__name__)

CORS(routes)

#---------------------------------------------type
@routes.route('/type', methods=['GET'])
# @jwt_required
def get_typeservice():
    pass
#---------------------------------------------status
@routes.route('/status', methods=['GET'])
# @jwt_required
def get_status():
    pass