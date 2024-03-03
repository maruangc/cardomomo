from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Professional, Case, Customer, Category, Typeservice
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

routes = Blueprint('routes_professional',__name__)

CORS(routes)

#---------------------------------------------- /professional
@routes.route('/new',endpoint='add_professional', methods=['POST'])
@jwt_required()
def add_professional():
    body=request.json
    name=body.get('name', None)
    identification=body.get('identification', None)
    profession=body.get('profession', None)
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    texto=""
    if name is None:
        texto="El nombre no se ha recibido "+chr(10)
    elif len(name)==0 or name.strip()=="":
        texto=texto+"Nombre no debe estar vacio "+chr(10)
    if identification is None:
        texto=texto+"No se recibio la identificación"+chr(10)
    elif len(identification)==0 or identification.strip()=="":
        texto=texto+"Identificacion no debe estar vacia "
    if len(texto)>0:
        return jsonify({'ok':False,'error':texto,'status':400}),400
    filter=Professional.query.filter_by(name=name).one_or_none()
    if filter is not None:
        return jsonify({'ok':False,'error':'Nombre ya existe ','status':400}),400
    filter=Professional.query.filter_by(identification=identification).one_or_none()
    if filter is not None:
        return jsonify({'ok':False,'error':'Identificación ya existe ','status':400}),400
    db.session.add(Professional(name=name,identification=identification,profession=profession,phone=phone,email=email,address=address,comment=comment))
    try:
        db.session.commit()
        return jsonify({'ok':True, 'data': 'Profesional creado', 'status':201}),201
    except Exception as error:
        print("-*-*-*-*commit error: ", error)
        db.session.rollback()
        return jsonify({'ok':False, 'error': 'internal server error','status':500}),500

@routes.route('/<int:id>',endpoint='get_professional', methods=['GET'])
@jwt_required()
def get_professional(id):
    filter=Professional.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'Profesional no encontrado','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=filter.serialize()
    return jsonify(dic)

@routes.route('/all',endpoint='get_professionals', methods=['GET'])
@jwt_required()
def get_professionals():
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    count=Professional.query.all()
    if limit=='0':
        filter=Professional.query.order_by(Professional.name)
    else:
        filter=Professional.query.order_by(Professional.name).offset(offset).limit(limit)
    filter=filter.all()
    dic={'ok':True,'status':200,'count':len(count)}
    dic['data']=[professional.serialize() for professional in filter]
    return jsonify(dic)

@routes.route('/cases/<int:id>', endpoint='professional_cases', methods=['GET'])
@jwt_required()
def professional_cases(id):
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    count=Case.query.filter_by(professional_id=id).all()
    if limit=='0':
        filter=Case.query.filter_by(professional_id=id)
    else:
        filter=Case.query.filter_by(professional_id=id).offset(offset).limit(limit)
    filter=filter.all()
    print(str(filter))
    dic={'ok':True, 'status': 200, 'data':[], 'count':len(count)}
    for eachcase in filter:
        customer_id=eachcase.customer_id
        professional_id=eachcase.professional_id
        category_id=eachcase.category_id
        typeservice_id=eachcase.typeservice_id

        filter_table=Customer.query.filter_by(id=customer_id).one_or_none()
        if filter_table is None:
            customer_json={'ok':False, 'status':404, 'data':'customer id not found'}
        else:
            customer_json=filter_table.serialize()

        filter_table=Professional.query.filter_by(id=professional_id).one_or_none()
        if filter_table is None:
            professional_json={'ok':False, 'status':404, 'data':'professional id not found'}
        else:
            professional_json=filter_table.serialize()

        filter_table=Category.query.filter_by(id=category_id).one_or_none()
        if filter_table is None:
            category_json={'ok':False, 'status':404, 'data':'category id not found'}
        else:
            category_json=filter_table.serialize()

        filter_table=Typeservice.query.filter_by(id=typeservice_id).one_or_none()
        if filter_table is None:
            typeservice_json={'ok':False, 'status':404, 'data':'typeservice id not found'}
        else:
            typeservice_json=filter_table.serialize()
            
        dic['data'].append({'case':eachcase.serialize(),
                            'customer':customer_json,
                            'professional':professional_json,
                            'category':category_json,
                            'typeservice':typeservice_json,
                            })
    return jsonify(dic)

@routes.route('/filter',endpoint='filter_professional', methods=['POST'])
@jwt_required()
def filter_professional():
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    body=request.json
    name=body.get('name', None) if body.get('name', None) is not None else ''
    identification=body.get('identification', None) if body.get('identification', None) is not None else ''
    profession=body.get('profession', None) if body.get('profession', None) is not None else ''
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    created_from=body.get('created_from', None) if body.get('created_from', None) is not None else ''
    created_until=body.get('created_until', None) if body.get('created_until', None) is not None else ''
    if (name+identification+phone+email+address+comment+profession).strip()=="":
        return jsonify({'ok':False,'error':'Ningun dato recibido ','status':400}),400
    
    if len(created_from)>0 and len(created_until)>0:
        fdd=datetime.strptime(created_from+' 00:00:00','%Y-%m-%d %H:%M:%S') # convierte de string a date
        fhd=datetime.strptime(created_until+' 23:59:59','%Y-%m-%d %H:%M:%S')
        fd = fdd.strftime('%Y-%m-%d %H:%M:%S') # convierte de date a string
        fh = fhd.strftime('%Y-%m-%d %H:%M:%S')
    else: 
        created_from=''

    filter=Professional.query.filter(
        Professional.name.ilike('%'+name+'%') if name != '' else Professional.name.ilike('%'+name+'%') | (Professional.name==None))
    if phone != '':
        filter=filter.filter(Professional.phone.ilike('%'+phone+'%'))
    if identification != '':
        filter=filter.filter(Professional.identification.ilike('%'+identification+'%'))
    if profession != '':
        filter=filter.filter(Professional.profession.ilike('%'+profession+'%'))
    if email != '':
        filter=filter.filter(Professional.email.ilike('%'+email+'%'))
    if address != '':
        filter=filter.filter(Professional.address.ilike('%'+address+'%'))
    if comment != '':
        filter=filter.filter(Professional.comment.ilike('%'+comment+'%'))
    if created_from !='':
        filter=filter.filter(Professional.created.between(fd,fh))

        # Professional.phone.ilike('%'+phone+'%') if phone != '' else Professional.phone.ilike('%'+phone+'%') | (Professional.phone==None),
        # Professional.identification.ilike('%'+identification+'%') if identification != '' else Professional.identification.ilike('%'+identification+'%') | (Professional.identification == None),
        # Professional.profession.ilike('%'+profession+'%') if profession != '' else Professional.profession.ilike('%'+profession+'%') | (Professional.profession == None),
        # Professional.email.ilike('%'+email+'%') if email != '' else Professional.email.ilike('%'+email+'%') | (Professional.email==None),
        # Professional.address.ilike('%'+address+'%') if address != '' else Professional.address.ilike('%'+address+'%') | (Professional.address==None),
        # Professional.comment.ilike('%'+comment+'%') if comment != '' else Professional.comment.ilike('%'+comment+'%') | (Professional.comment==None),
        # Professional.created.between(fd,fh) if created_from != '' else Professional.created.between('1901-01-01','3100-12-31')
        
    if limit=='0':
        filter=filter.order_by(Professional.name)
    else:
        filter=filter.order_by(Professional.name).offset(offset).limit(limit)
    
    filter=filter.all()

    dic={'ok':True,'status':200,'count':len(filter)}
    dic['data']=[professional.serialize() for professional in filter]
    return jsonify(dic)

@routes.route('/edit/<int:id>',endpoint='edit_professional', methods=['PUT'])
@jwt_required()
def edit_professional(id):
    body=request.json
    name=body.get('name', None) if body.get('name', None) is not None else ''
    identification=body.get('identification', None) if body.get('identification', None) is not None else ''
    profession=body.get('profession', None) if body.get('profession', None) is not None else ''
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    if (name+identification+phone+email+address+comment).strip()=="":
        return jsonify({'ok':False,'error':'Ningun dato recibido ','status':400}),400
    
    filter=Professional.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'Profesional no encontrado ','status':404}),404
    
    filter.name=name if len(name)>0 else filter.name
    filter.identification=identification if len(identification)>0 else filter.identification
    filter.profession=profession if len(profession)>0 else filter.profession
    filter.phone=phone if len(phone)>0 else filter.phone
    filter.email=email if len(email)>0 else filter.email
    filter.address=address if len(address)>0 else filter.address
    filter.comment=comment if len(comment)>0 else filter.comment
    try:
        db.session.commit()
        texto='name:'+name+', ' if name != '' else ''
        texto+='identification:'+identification+', ' if identification != '' else ''
        texto+='profession:'+profession+', ' if profession != '' else ''
        texto+='phone:'+phone+', ' if phone != '' else ''
        texto+='email:'+email+', ' if email != '' else ''
        texto+='address:'+address+', ' if address != '' else ''
        texto+='comment:'+comment+', ' if comment != '' else ''
        return jsonify({'ok':True,'data': f'Datos del profesional actualizado - '+texto,'status':201}),201
    except Exception as error:
        print('-*-*-*-*Update Error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500

@routes.route('/DELETE/<int:id>',endpoint='del_professional', methods=['DELETE'])
@jwt_required()
def del_professional(id):
    filter=Professional.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':f'profesional id:{id} no encontrado ','status':404}),404
    db.session.delete(filter)
    try: 
      db.session.commit()
      return jsonify({'ok':True,'data': f'profesional id:{id} Eliminado','status':202}),202
    except Exception as error:
      print('-*-*-*-*--- DELETE Error:', error)
      db.session.rollback()
      return jsonify({'ok':False,'error': 'internal server error','status':500}),500
