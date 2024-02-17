from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Professional
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

routes = Blueprint('routes_professional',__name__)

CORS(routes)

#---------------------------------------------- /professional
@routes.route('/new',endpoint='add_professional', methods=['POST'])
@jwt_required
def add_professional():
    body=request.json
    name=body.get('name', None)
    identification=body.get('identification', None)
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    texto=""
    if name is None:
        texto="the name must exist in the request "+chr(10)
    elif len(name)==0 or name.strip()=="":
        texto=texto+"the name cannot be left empty "+chr(10)
    if identification is None:
        texto=texto+"the identification must exist in the request "+chr(10)
    elif len(identification)==0 or identification.strip()=="":
        texto=texto+"the identification cannot be left empty "
    if len(texto)>0:
        return jsonify({'ok':False,'error':texto,'status':400}),400
    filter=Professional.query.filter_by(name=name).one_or_none()
    if filter is not None:
        return jsonify({'ok':False,'error':'name allready exists ','status':400}),400
    filter=Professional.query.filter_by(identification=identification).one_or_none()
    if filter is not None:
        return jsonify({'ok':False,'error':'identification allready exists ','status':400}),400
    db.session.add(Professional(name=name,identification=identification,phone=phone,email=email,address=address,comment=comment))
    try:
        db.session.commit()
        return jsonify({'ok':True, 'data': 'professional created', 'status':201}),201
    except Exception as error:
        print("-*-*-*-*commit error: ", error)
        db.session.rollback()
        return jsonify({'ok':False, 'error': 'internal server error','status':500}),500
    
# --some data returned by this endpoint
""" 
{
  "data": "professional created",
  "ok": true,
  "status": 201
}

{
  "error": "name allready exists ",
  "ok": false,
  "status": 400
}

{
  "error": "the identification must exist in the request \n",
  "ok": false,
  "status": 400
}
"""

@routes.route('/<int:id>',endpoint='get_professional', methods=['GET'])
@jwt_required
def get_professional(id):
    filter=Professional.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'professional id not found ','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=filter.serialize()
    return jsonify(dic)
# some data returned from this endpoint
"""
{
  "data":
    {
      "address": "",
      "comment": "",
      "created": "Tue, 13 Feb 2024 14:38:46 GMT",
      "email": "",
      "id": 3,
      "identification": "V11445778",
      "name": "Profesional numero 8",
      "phone": ""
    },
  "ok": true,
  "status": 200
}

{
  "error": "professional id not found ",
  "ok": false,
  "status": 404
}
"""

@routes.route('/all',endpoint='get_professionals', methods=['GET'])
@jwt_required
def get_professionals():
    filter=Professional.query.all()
    dic={'ok':True,'status':200}
    dic['data']=[professional.serialize() for professional in filter]
    return jsonify(dic)
# some data returned from this endpoint
"""
{
  "data": [
    {
      "address": "",
      "comment": "",
      "created": "Tue, 13 Feb 2024 14:38:46 GMT",
      "email": "",
      "id": 3,
      "identification": "V11445778",
      "name": "Profesional numero 8",
      "phone": ""
    },
    {
      "address": "",
      "comment": "",
      "created": "Tue, 13 Feb 2024 14:40:28 GMT",
      "email": "",
      "id": 4,
      "identification": "J256774889",
      "name": "Empresa XYZ CA",
      "phone": ""
    },
    {
      "address": "",
      "comment": "",
      "created": "Tue, 13 Feb 2024 14:40:28 GMT",
      "email": "",
      "id": 5,
      "identification": "J44577851",
      "name": "Otra empresa prestadora de servicios CA",
      "phone": ""
    },
    {
      "address": "",
      "comment": "",
      "created": "Tue, 13 Feb 2024 14:49:58 GMT",
      "email": "",
      "id": 6,
      "identification": "V1548772",
      "name": "Persona Albañil",
      "phone": ""
    },
    {
      "address": "Algun lugar",
      "comment": "No hay comentarios",
      "created": "Tue, 13 Feb 2024 14:52:22 GMT",
      "email": "plomero@gmail.com",
      "id": 7,
      "identification": "V44115225",
      "name": "Juan Gonzalez",
      "phone": "04125526634"
    }
  ],
  "ok": true,
  "status": 200
}
"""

@routes.route('/filter',endpoint='filter_professional', methods=['GET'])
@jwt_required
def filter_professional():
    body=request.json
    name=body.get('name', None) if body.get('name', None) is not None else ''
    identification=body.get('identification', None) if body.get('identification', None) is not None else ''
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    created_from=body.get('created_from', None) if body.get('created_from', None) is not None else ''
    created_until=body.get('created_until', None) if body.get('created_until', None) is not None else ''
    if (name+identification+phone+email+address+comment).strip()=="":
        return jsonify({'ok':False,'error':'all fields are missing ','status':400}),400
    
    if len(created_from)>0 and len(created_until)>0:
        fdd=datetime.strptime(created_from+' 00:00:00','%Y-%m-%d %H:%M:%S') # convierte de string a date
        fhd=datetime.strptime(created_until+' 23:59:59','%Y-%m-%d %H:%M:%S')
        fd = fdd.strftime('%Y-%m-%d %H:%M:%S') # convierte de date a string
        fh = fhd.strftime('%Y-%m-%d %H:%M:%S')
    else: 
        created_from=''

    filter=Professional.query.filter(
        Professional.name.ilike('%'+name+'%') if name != '' else Professional.name.ilike('%'+name+'%') | (Professional.name==None),
        Professional.phone.ilike('%'+phone+'%') if phone != '' else Professional.phone.ilike('%'+phone+'%') | (Professional.phone==None),
        Professional.identification.ilike('%'+identification+'%') if identification != '' else Professional.identification.ilike('%'+identification+'%') | (Professional.identification == None),
        Professional.email.ilike('%'+email+'%') if email != '' else Professional.email.ilike('%'+email+'%') | (Professional.email==None),
        Professional.address.ilike('%'+address+'%') if address != '' else Professional.address.ilike('%'+address+'%') | (Professional.address==None),
        Professional.comment.ilike('%'+comment+'%') if comment != '' else Professional.comment.ilike('%'+comment+'%') | (Professional.comment==None),
        Professional.created.between(fd,fh) if created_from != '' else Professional.created.between('1901-01-01','3100-12-31')
        ).all()
    dic={'ok':True,'status':200}
    dic['data']=[professional.serialize() for professional in filter]
    return jsonify(dic)
# some data returned from this endpoint
"""
{
  "data": [
    {
      "address": "",
      "comment": "",
      "created": "Tue, 13 Feb 2024 14:40:28 GMT",
      "email": "",
      "id": 4,
      "identification": "J256774889",
      "name": "Empresa XYZ CA",
      "phone": ""
    },
    {
      "address": "",
      "comment": "",
      "created": "Tue, 13 Feb 2024 14:40:28 GMT",
      "email": "",
      "id": 5,
      "identification": "J44577851",
      "name": "Otra empresa prestadora de servicios CA",
      "phone": ""
    }
  ],
  "ok": true,
  "status": 200
}

{
  "error": "all fields are missing ",
  "ok": false,
  "status": 400
}
"""

@routes.route('/edit/<int:id>',endpoint='edit_professional', methods=['PUT'])
@jwt_required
def edit_professional(id):
    body=request.json
    name=body.get('name', None) if body.get('name', None) is not None else ''
    identification=body.get('identification', None) if body.get('identification', None) is not None else ''
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    if (name+identification+phone+email+address+comment).strip()=="":
        return jsonify({'ok':False,'error':'all fields are missing ','status':400}),400
    
    filter=Professional.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'professional id not found ','status':404}),404
    
    filter.name=name if len(name)>0 else filter.name
    filter.identification=identification if len(identification)>0 else filter.identification
    filter.phone=phone if len(phone)>0 else filter.phone
    filter.email=email if len(email)>0 else filter.email
    filter.address=address if len(address)>0 else filter.address
    filter.comment=comment if len(comment)>0 else filter.comment
    try:
        db.session.commit()
        texto='name:'+name+', ' if name != '' else ''
        texto+='identification:'+identification+', ' if identification != '' else ''
        texto+='phone:'+phone+', ' if phone != '' else ''
        texto+='email:'+email+', ' if email != '' else ''
        texto+='address:'+address+', ' if address != '' else ''
        texto+='comment:'+comment+', ' if comment != '' else ''
        return jsonify({'ok':True,'data': f'professional id updated - '+texto,'status':201}),201
    except Exception as error:
        print('-*-*-*-*Update Error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500
# some data returned from this endpoint  
"""
{
  "data": "professional id updated - name:Nombre nuevo, ",
  "ok": true,
  "status": 201
}

{
  "error": "professional id not found ",
  "ok": false,
  "status": 404
}

{
  "error": "all fields are missing ",
  "ok": false,
  "status": 400
}
"""
@routes.route('/DELETE/<int:id>',endpoint='del_professional', methods=['DELETE'])
@jwt_required
def del_professional(id):
    filter=Professional.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':f'professional id:{id} not found ','status':404}),404
    db.session.delete(filter)
    try: 
      db.session.commit()
      return jsonify({'ok':True,'data': f'professional id:{id} DELETED','status':202}),202
    except Exception as error:
      print('-*-*-*-*--- DELETE Error:', error)
      db.session.rollback()
      return jsonify({'ok':False,'error': 'internal server error','status':500}),500
