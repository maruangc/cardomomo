from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

routes = Blueprint('routes_category',__name__)

CORS(routes)

#----------------------------------------------- /category
@routes.route('/', methods=['POST'])
# @jwt_required
def add_category():
    pass

@routes.route('/', methods=['GET'])
# @jwt_required
def get_category():
    pass

@routes.route('/', methods=['PUT'])
# @jwt_required
def edit_category():
    pass