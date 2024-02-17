from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Typeservice, Status
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

routes = Blueprint('routes_tablas',__name__)

CORS(routes)

#---------------------------------------------type
@routes.route('/type/<int:id>',endpoint='get_typeservice', methods=['GET'])
@jwt_required
def get_typeservice(id):
    filter=Typeservice.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'typeservice id not found ','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=filter.serialize()
    return jsonify(dic)
# some data returned from this endpoint
"""
{
  "data": {
    "id": 1,
    "type_service": "FACTURABLE"
  },
  "ok": true,
  "status": 200
}
{
  "error": "typeservice id not found ",
  "ok": false,
  "status": 404
}
"""

@routes.route('/type/all',endpoint='get_typeservices', methods=['GET'])
@jwt_required
def get_typeservices():
    filter=Typeservice.query.all()
    dic={'ok':True,'status':200}
    dic['data']=[typeservice.serialize() for typeservice in filter]
    return jsonify(dic)
# some data returned from this endpoint
"""
{
  "data": [
    {
      "id": 1,
      "type_service": "FACTURABLE"
    },
    {
      "id": 2,
      "type_service": "GARANTIA"
    },
    {
      "id": 3,
      "type_service": "RECLAMO"
    }
  ],
  "ok": true,
  "status": 200
}
"""
#---------------------------------------------status
@routes.route('/status/<int:id>',endpoint='get_status', methods=['GET'])
@jwt_required
def get_status(id):
    filter=Status.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'status id not found ','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=filter.serialize()
    return jsonify(dic)
# some data returned from this endpoint
"""
{
  "data": {
    "id": 1,
    "status": "1.- CREADO"
  },
  "ok": true,
  "status": 200
}
{
  "error": "status id not found ",
  "ok": false,
  "status": 404
}
"""

@routes.route('/status/all',endpoint='get_all_status', methods=['GET'])
@jwt_required
def get_all_status():
    filter=Status.query.all()
    dic={'ok':True,'status':200}
    dic['data']=[status.serialize() for status in filter]
    return jsonify(dic)
# some data returned from this endpoint
"""
{
  "data": [
    {
      "id": 1,
      "status": "1.- CREADO"
    },
    {
      "id": 2,
      "status": "2.- INICIADO"
    },
    {
      "id": 3,
      "status": "3.- COMPLETADO"
    },
    {
      "id": 4,
      "status": "4.- ENTREGADO"
    }
  ],
  "ok": true,
  "status": 200
}
"""