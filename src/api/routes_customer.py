from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Customer, Case, Professional, Category, Typeservice
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_,text
from datetime import datetime
import string
import random

routes = Blueprint('routes_customer',__name__)

CORS(routes)

def genera_string(longitud):
    letras = string.ascii_lowercase
    return ''.join(random.choice(letras) for i in range(longitud))

def generar_numero(longitud):
    numeros = '0123456789'
    return ''.join(random.choice(numeros) for i in range(longitud))

def aleatorio(minimo, maximo):
    return random.randint(minimo, maximo)

@routes.route('/create/<int:count>',endpoint='create_customers', methods=['POST'])
def create_customer(count):
    for i in range(count):
        db.session.add(Customer(name=genera_string(aleatorio(5,10))+' '+genera_string(aleatorio(5,10)),
                                identification=generar_numero(8),
                                phone=generar_numero(11),
                                email=genera_string(aleatorio(5,10))+'@'+genera_string(aleatorio(5,10))+'.'+genera_string(3),
                                address=genera_string(aleatorio(5,10))+' '+genera_string(aleatorio(5,20))+' '+genera_string(aleatorio(5,10)),
                                comment=genera_string(aleatorio(3,10))+' '+genera_string(aleatorio(10,20))+' '+genera_string(aleatorio(5,10))))
        try:
            db.session.commit()
        except Exception as error:
            print("-*-*-*-*commit error: ", error)
            db.session.rollback()
            return jsonify({'ok':False, 'error': 'internal server error','status':500}),500
    return jsonify({'ok':True, 'data': str(count)+' Clientes creados', 'status':201}),201

#--------------------------------------------- /customer
@routes.route('/new',endpoint='add_customer', methods=['POST'])
@jwt_required()
def add_customer():
    body=request.json
    
    name=body.get('name', None)
    identification=body.get('identification', None)
    phone=body.get('phone', None)
    email=body.get('email', None)
    address=body.get('address', None)
    comment=body.get('comment', None)
    texto=""
    
    if name is None:
        texto="El nombre no se ha recibido "+chr(10)
    elif len(name)==0 or name.strip()=="":
        texto=texto+"El nombre no debe estar vacio "+chr(10)
    if identification is None:
        texto=texto+"Identificacion no se ha recibido"+chr(10)
    elif len(identification)==0 or identification.strip()=="":
        texto=texto+"Identificacion no debe estar vacia "
    if len(texto)>0:
        return jsonify({'ok':False,'error':texto,'status':400}),400
    customer_filter=Customer.query.filter_by(name=name).one_or_none()
    if customer_filter is not None:
        return jsonify({'ok':False,'error':'El nombre ya existe, no puede duplicarse ','status':400}),400
    customer_filter=Customer.query.filter_by(identification=identification).one_or_none()
    if customer_filter is not None:
        return jsonify({'ok':False,'error':'Identificacion ya existe, no debe duplicarse ','status':400}),400
    phone='' if phone is None else phone
    email='' if email is None else email
    address='' if address is None else address
    comment='' if comment is None else comment
    db.session.add(Customer(name=name,identification=identification,phone=phone,email=email,address=address,comment=comment))
    try:
        db.session.commit()
        return jsonify({'ok':True, 'data': 'Cliente creado', 'status':201}),201
    except Exception as error:
        print("-*-*-*-*commit error: ", error)
        db.session.rollback()
        return jsonify({'ok':False, 'error': 'internal server error','status':500}),500

@routes.route('/<int:id>', endpoint='get_customer', methods=['GET'])
@jwt_required()
def get_customer(id):
    customer_filter=Customer.query.filter_by(id=id).one_or_none()
    if customer_filter is None:
        return jsonify({'ok':False,'error':'Cliente no encontrado ','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=customer_filter.serialize()
    return jsonify(dic)

@routes.route('/all',endpoint='get_customers', methods=['GET'])
@jwt_required()
def get_customers():
# http://127.0.0.1:3001/customer/all/?limit=1&offset=1
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    count=Customer.query.all()
    if limit=='0':
        filter=Customer.query.order_by(Customer.name)
    else:
        filter=Customer.query.order_by(Customer.name).offset(offset).limit(limit)

    filter=filter.all()
    dic={'ok':True,'status':200,'count':len(count)}
    dic['data']=[customer.serialize() for customer in filter]
    dic['offset']=int(offset)+int(limit)
    return jsonify(dic)

@routes.route('/cases/<int:id>', endpoint='customer_cases', methods=['GET'])
@jwt_required()
def customer_cases(id):
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    count=Case.query.filter_by(customer_id=id).all()
    if limit=='0':
        filter=Case.query.filter_by(customer_id=id)
    else:
        filter=Case.query.filter_by(customer_id=id).offset(offset).limit(limit)
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
            customer_json={'ok':False, 'status':404, 'data':'Cliente no encontrado'}
        else:
            customer_json=filter_table.serialize()

        filter_table=Professional.query.filter_by(id=professional_id).one_or_none()
        if filter_table is None:
            professional_json={'ok':False, 'status':404, 'data':'Profesional no encontrado'}
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


@routes.route('/filter',endpoint='filter_customer', methods=['POST'])
@jwt_required()
def filter_customer():
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    body=request.json
    name=body.get('name', None) if body.get('name', None) is not None else ''
    identification=body.get('identification', None) if body.get('identification', None) is not None else ''
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    created_from=body.get('created_from', None) if body.get('created_from', None) is not None else ''
    created_until=body.get('created_until', None) if body.get('created_until', None) is not None else ''
    print('------Body: ', body)
    if (name+identification+phone+email+address+comment).strip()=="":
        return jsonify({'ok':False,'error':'Ningun dato no recibido ','status':400}),400
    
    if len(created_from)>0 and len(created_until)>0:
        fdd=datetime.strptime(created_from+' 00:00:00','%Y-%m-%d %H:%M:%S') # convierte de string a date
        fhd=datetime.strptime(created_until+' 23:59:59','%Y-%m-%d %H:%M:%S')
        fd = fdd.strftime('%Y-%m-%d %H:%M:%S') # convierte de date a string
        fh = fhd.strftime('%Y-%m-%d %H:%M:%S')
    else: 
        created_from=''

    filter=Customer.query.filter(
        Customer.name.ilike('%'+name+'%') if name != '' else Customer.name.ilike('%'+name+'%') | (Customer.name==None))
    if phone != '':
        filter=filter.filter(Customer.phone.ilike('%'+phone+'%'))
    if identification != '':
        filter=filter.filter(Customer.identification.ilike('%'+identification+'%'))
    if email != '':
        filter=filter.filter(Customer.email.ilike('%'+email+'%'))
    if address != '':
        filter=filter.filter(Customer.address.ilike('%'+address+'%'))
    if comment != '':
        filter=filter.filter(Customer.comment.ilike('%'+comment+'%'))
    if created_from !='':
        filter=filter.filter(Customer.created.between(fd,fh))      

    if limit=='0':
        filter=filter.order_by(Customer.name).all()
    else:
        filter=filter.order_by(Customer.name).offset(offset).limit(limit).all()
    dic={'ok':True,'status':200,'count':len(filter)}
    dic['data']=[customer.serialize() for customer in filter]
    return jsonify(dic)
    # --------- Notas para consideraciones futuras Maruan ----------
    # w="WHERE id>0 "
    # w+="AND name iLIKE '%"+name+"%' " if len(name)>0 else ''
    # w+="AND identification iLIKE '%"+identification+"%' " if len(identification)>0 else ''
    # w+="AND phone iLIKE '%"+phone+"%' " if len(phone)>0 else ''
    # w+="AND email iLIKE '%"+email+"%' " if len(email)>0 else ''
    # w+="AND address iLIKE '%"+address+"%' " if len(address)>0 else ''
    # w+="AND comment iLIKE '%"+comment+"%' " if len(comment)>0 else ''
    # w+="AND created "+bt if bt is not None else ''
    # sql_consult=text("SELECT * FROM customer "+w)
    # print(sql_consult)
    # filter=db.session.execute(sql_consult)
    # data=[]
    # for customer in filter:
    #     data.append({
    #             "id": customer.id,
    #             "created": customer.created,
    #             "name": customer.name,
    #             "identification": customer.identification,
    #             "phone": customer.phone,
    #             "email": customer.email,
    #             "address": customer.address,
    #             "comment": customer.comment,
    #         })
    # dic={"data":data,'ok':True,'status':200}
    # return jsonify(dic)

@routes.route('/edit/<int:id>',endpoint='edit_customer', methods=['PUT'])
@jwt_required()
def edit_customer(id):
    body=request.json
    name=body.get('name', None) if body.get('name', None) is not None else ''
    identification=body.get('identification', None) if body.get('identification', None) is not None else ''
    phone=body.get('phone', None) if body.get('phone', None) is not None else ''
    email=body.get('email', None) if body.get('email', None) is not None else ''
    address=body.get('address', None) if body.get('address', None) is not None else ''
    comment=body.get('comment', None) if body.get('comment', None) is not None else ''
    if (name+identification+phone+email+address+comment).strip()=="":
        return jsonify({'ok':False,'error':'Ningun dato reibido ','status':400}),400
    
    customer_filter=Customer.query.filter_by(id=id).one_or_none()
    if customer_filter is None:
        return jsonify({'ok':False,'error':'Cliente no encontrado ','status':404}),404
    
    customer_filter.name=name if len(name)>0 else customer_filter.name
    customer_filter.identification=identification if len(identification)>0 else customer_filter.identification
    customer_filter.phone=phone if len(phone)>0 else customer_filter.phone
    customer_filter.email=email if len(email)>0 else customer_filter.email
    customer_filter.address=address if len(address)>0 else customer_filter.address
    customer_filter.comment=comment if len(comment)>0 else customer_filter.comment
    try:
        db.session.commit()
        texto='name:'+name+', ' if name != '' else ''
        texto+='identification:'+identification+', ' if identification != '' else ''
        texto+='phone:'+phone+', ' if phone != '' else ''
        texto+='email:'+email+', ' if email != '' else ''
        texto+='address:'+address+', ' if address != '' else ''
        texto+='comment:'+comment+', ' if comment != '' else ''
        return jsonify({'ok':True,'data': f'Cliente actualizado - '+texto,'status':201}),201
    except Exception as error:
        print('-*-*-*-*Update Error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500

@routes.route('/DELETE/<int:id>',endpoint='del_customer', methods=['DELETE'])
@jwt_required()
def del_customer(id):
    filter=Customer.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':f'Cliente id:{id} no encontrado ','status':404}),404
    db.session.delete(filter)
    try: 
      db.session.commit()
      return jsonify({'ok':True,'data': f'Cliente id:{id} Eliminado','status':202}),202
    except Exception as error:
      print('-*-*-*-*--- DELETE Error:', error)
      db.session.rollback()
      return jsonify({'ok':False,'error': 'internal server error','status':500}),500
