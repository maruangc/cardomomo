from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from datetime import timedelta
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required , get_jwt_identity

routes = Blueprint('routes_user', __name__)
# Allow CORS requests to this API
CORS(routes)

#----------------------------------------------- /user
@routes.route('/new',endpoint='user_register', methods=['POST'])
def user_register():
    body=request.json
    email=body.get('email', None)
    password=body.get('password', None)
    name=body.get('name', None)

    texto=""
    if email is None:
        texto=texto+'email no recibido '+chr(10)
    elif len(email)==0:
        texto=texto+'email recibido vacio '+chr(10)
    if password is None:
        texto=texto+'password no recibido '+chr(10)
    elif len(password)==0:
        texto=texto+'password no debe ser vacio '+chr(10)
    if name is None:
        texto=texto+'no se recibio el nombre '+chr(10)
    elif len(name)==0:
        texto=texto+'nombre no debe estar vacio '
    if len(texto)>0:
        return jsonify({'ok':False,'error': texto,'status':400}),400
    
    resp=User.query.filter_by(email = email).one_or_none()
    if resp is not None:
        return jsonify({'ok':False,'error': 'email/usuario ya existe','status':409}),409
    
    password_hash=generate_password_hash(password)
    new_user=User(email=email, password=password_hash, name=name, is_active=True)
    db.session.add(new_user)
    try:
        # db.session.begin_nested() # crea un checkpoint
        db.session.commit()
        return jsonify({'ok':True,'data': 'Usuario creado','status':201}),201
    except Exception as error:
        print ('-*-*-*-*Register error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500

@routes.route('/edit/<int:id>',endpoint='edit_user', methods=['PUT'])
@jwt_required()
def edit_user(id):
    # current_user = get_jwt_identity()
    user=User.query.filter_by(id=id).one_or_none()
    if user is None:
        return jsonify({'ok':False,'error': 'No fue encontrado el usuario','status':404}),404
    body=request.json
    name=body.get('name', None)
    email=body.get('email', None)
    texto=""
    if name is None and email is None:
        texto=texto+'nombre y correo deben existir en la solicitud '+chr(10)
    if name.strip()=="":
        texto=texto+'nombre debe tener un valor '
    if email.strip()=="":
        texto=texto+'email debe tener un valor '

    if len(texto)>0:
        return jsonify({'ok':False,'error': texto,'status':400}),400
        
    print('--*-*-*PUT: ', user.serialize())
    user.name=name
    user.email=email
    try:
        # db.session.begin_nested() # crea un checkpoint
        db.session.commit()
        return jsonify({'ok':True,'data': 'Datos de usuario actualizados','status':201}),201
    except Exception as error:
        print ('-*-*-*-*Update error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500

@routes.route('/<int:id>',endpoint='get_user', methods=['GET'])
@jwt_required()
def get_user(id):
    user=User.query.filter_by(id=id).one_or_none()
    if user is None:
        return jsonify({'ok':False,'error': 'No se ha encontrado el usuario','status':404})
    return jsonify({'data':user.serialize(),'ok':True,'status':200})

@routes.route('/all',endpoint='get_users', methods=['GET'])
@jwt_required()
def get_users():
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    count=User.query.all()
    if limit=='0':
        users=User.query.all()
    else:
        users=User.query.offset(offset).limit(limit).all()
    if users is None:
        return jsonify({'ok':False,'error':'Sin datos','status':404})
    dic={'ok':True,'status':200,'count':len(count)}
    dic['data']=[user.serialize() for user in users]
    dic['offset']=int(offset)+int(limit)
    return jsonify(dic)

@routes.route('/login',endpoint='login', methods=['POST'])
def login():
    body=request.json
    email=body.get('email', None)
    password=body.get('password', None)
    texto=""
    if email is None:
        texto=texto+'email debe existir en la solicitud '+chr(10)
    elif len(email)==0:
        texto=texto+'email debe tener un valor '+chr(10)
    if password is None:
        texto=texto+'password debe existir en la solicitud '+chr(10)
    elif len(password)==0:
        texto=texto+'password debe tener un valor '+chr(10)
    if len(texto)>0:
        return jsonify({'ok':False,'error': texto, 'status':400}),400
    
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({'ok':False,'error': 'email does not exist', 'status':404}),404
    pass_match=check_password_hash(user.password,password)
    if not pass_match:
        return jsonify({'ok':False,'error': 'Credencial inválida', 'status':401}),401
    
    # token=create_access_token({'email': user.email, 'id': user.id})
    expires = timedelta(minutes=60)
    token = create_access_token(identity={'email': user.email, 'id': user.id}, expires_delta=expires)
    return jsonify({'ok':True,'token': token, 'status':200}),200

@routes.route('/filter',endpoint='filter_user', methods=['POST'])
@jwt_required()
def filter_user():
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    body=request.json
    name=body.get('name', None)
    email=body.get('email', None)
    if name is None and email is None:
        return jsonify({'ok':False,'error':'Es requerido al menos un campo ','status':400}),400
    filter=User.query.filter(
        User.name.ilike('%'+name+'%') if name is not None else (User.id>0)
    )
    if email is not None and email != '':
        filter=filter.filter(
            User.email.ilike('%'+email+'%'))
    print(str(filter))
    if limit=='0':
        filter=filter.all()
    else:
        filter=filter.offset(offset).limit(limit).all()
    dic={'ok':True,'status':200,'count':len(filter)}
    dic['data']=[user.serialize() for user in filter]
    return jsonify(dic)