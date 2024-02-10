from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

routes = Blueprint('routes_professional',__name__)

CORS(routes)

#---------------------------------------------- /professional
@routes.route('/', methods=['POST'])
# @jwt_required
def add_professional():
    pass

@routes.route('/', methods=['GET'])
# @jwt_required
def get_professional():
    pass

@routes.route('/', methods=['PUT'])
# @jwt_required
def edit_professional():
    pass