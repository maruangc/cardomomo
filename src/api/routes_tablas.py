from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Typeservice, Status,Category,Customer,Professional,Case
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

routes = Blueprint('routes_tablas',__name__)

CORS(routes)

#---------------------------------------------Inicializacion de Tablas
@routes.route('/init',endpoint='init_tables', methods=['POST'])
# @jwt_required()
def init_tables():
    db.session.add(Typeservice(type_service="Facturable"))
    db.session.add(Typeservice(type_service="Garantia"))
    db.session.add(Typeservice(type_service="Reclamo"))
    db.session.add(Status(status="Recibido"))
    db.session.add(Status(status="Iniciado"))
    db.session.add(Status(status="Terminado"))
    db.session.add(Status(status="Entregado"))
    db.session.add(Category(category='Mantenimiento (añadido por metodo init)',description='Descripcion (añadido por metodo init)'))
    db.session.add(Professional(name='Juan Perez',identification='14201785',profession='Tecnico',phone='04142545574',email='alguien@gmail.com',address='Calle 1, nro 2 (añadido por metodo init)',comment='Comentario añadido por metodo init'))
    db.session.add(Customer(name='Pedro Perez',identification='18225478',phone='0212545778',email='alguien@hotmail.com',address='Calle 3, edif 4, piso 1 apto 2',comment='Comentario (añadido por metodo init)'))
    db.session.add(Case(customer_id=1,
                        category_id=1,
                        typeservice_id=1,
                        started=False,
                        date_init=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        professional_id=1,
                        initial_note='initial_note añadido por metodo init',
                        description='description añadido por metodo init',
                        closed=False,
                        close_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        close_description='close_description añadido por metodo init',
                        delivered=False,
                        delivered_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        delivered_description='delivered_description añadido por metodo init'))
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
