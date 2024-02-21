from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Typeservice, Status
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

routes = Blueprint('routes_tablas',__name__)

CORS(routes)

#---------------------------------------------Inicializacion de Tablas
@routes.route('/init',endpoint='init_tables', methods=['POST'])
#@jwt_required()
def init_tables():
    db.session.add(Typeservice(type_service="Facturable"))
    db.session.add(Typeservice(type_service="Garantia"))
    db.session.add(Typeservice(type_service="Reclamo"))
    db.session.add(Status(status="Recibido"))
    db.session.add(Status(status="Iniciado"))
    db.session.add(Status(status="Terminado"))
    db.session.add(Status(status="Entregado"))
    try:
        db.session.commit()
        return jsonify({'ok':True, 'data': 'tables typeservice an status filled', 'status':201}),201
    except Exception as error:
        print("-*-*-*-*commit error: ", error)
        db.session.rollback()
        return jsonify({'ok':False, 'error': 'internal server error','status':500}),500


#---------------------------------------------type
@routes.route('/type/<int:id>',endpoint='get_typeservice', methods=['GET'])
@jwt_required()
def get_typeservice(id):
    filter=Typeservice.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'typeservice id not found ','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=filter.serialize()
    return jsonify(dic)

@routes.route('/type/all',endpoint='get_typeservices', methods=['GET'])
@jwt_required()
def get_typeservices():
    filter=Typeservice.query.all()
    dic={'ok':True,'status':200}
    dic['data']=[typeservice.serialize() for typeservice in filter]
    return jsonify(dic)

#---------------------------------------------status
@routes.route('/status/<int:id>',endpoint='get_status', methods=['GET'])
@jwt_required()
def get_status(id):
    filter=Status.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'status id not found ','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=filter.serialize()
    return jsonify(dic)

@routes.route('/status/all',endpoint='get_all_status', methods=['GET'])
@jwt_required()
def get_all_status():
    filter=Status.query.all()
    dic={'ok':True,'status':200}
    dic['data']=[status.serialize() for status in filter]
    return jsonify(dic)
