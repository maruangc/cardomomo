from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

routes = Blueprint('routes_customer',__name__)

CORS(routes)

#--------------------------------------------- /customer
@routes.route('/', methods=['POST'])
# @jwt_required
def add_customer():
    pass

@routes.route('/', methods=['GET'])
# @jwt_required
def get_customer():
    pass

@routes.route('/', methods=['PUT'])
# @jwt_required
def edit_customer():
    pass