from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

routes = Blueprint('routes_user', __name__)
# Allow CORS requests to this API
CORS(routes)

#----------------------------------------------- /user
@routes.route('/register', methods=['POST'])
def user_register():
    body=request.json
    email=body.get('email', None)
    password=body.get('password', None)
    name=body.get('name', None)

    texto=""
    if email is None:
        texto=texto+'email debe existir en la solicitud '+chr(10)
    elif len(email)==0:
        texto=texto+'email debe tener un valor '+chr(10)
    if password is None:
        texto=texto+'password debe existir en la solicitud '+chr(10)
    elif len(password)==0:
        texto=texto+'password debe tener un valor '+chr(10)
    if name is None:
        texto=texto+'nombre debe existir en la solicitud '+chr(10)
    elif len(name)==0:
        texto=texto+'nombre debe tener un valor '
    if len(texto)>0:
        return jsonify({'ok':False,'error': texto,'status':400}),400
    
    resp=User.query.filter_by(email = email).one_or_none()
    if resp is not None:
        return jsonify({'ok':False,'error': 'email/user allready exists','status':409}),409
    
    password_hash=generate_password_hash(password)
    new_user=User(email=email, password=password_hash, name=name, is_active=True)
    db.session.add(new_user)
    try:
        # db.session.begin_nested() # crea un checkpoint
        db.session.commit()
        return jsonify({'ok':True,'data': 'user created','status':201}),201
    except Exception as error:
        print ('-*-*-*-*Register error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500

@routes.route('/edit', methods=['PUT'])
@jwt_required()
def edit_user():
    current_user = get_jwt_identity()
    user=User.query.filter_by(id=current_user['id']).one_or_none()
    if user is None:
        return jsonify({'ok':False,'error': 'user not found','status':404}),404
    body=request.json
    name=body.get('name', None)
    texto=""
    if name is None:
        texto=texto+'nombre debe existir en la solicitud '+chr(10)
    elif len(name)==0:
        texto=texto+'nombre debe tener un valor '
    if len(texto)>0:
        return jsonify({'ok':False,'error': texto,'status':400}),
        
    print('--*-*-*PUT:', user.serialize())
    user.name=name
    try:
        # db.session.begin_nested() # crea un checkpoint
        db.session.commit()
        return jsonify({'ok':True,'data': 'user updated','status':201}),201
    except Exception as error:
        print ('-*-*-*-*Update error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500

@routes.route('/<int:id>', methods=['GET'])
# @jwt_required
def get_user(id):
    user=User.query.filter_by(id=id).one_or_none()
    if user is None:
        return jsonify({'ok':False,'error': 'user not found','status':404})
    return jsonify({'ok':True,'status':200},user.serialize())
    
@routes.route('/list', methods=['GET'])
@jwt_required
def get_users():
    users=User.query.all()
    if users is None:
        return jsonify({'ok':False,'error':'No data','status':404})
    user_list=[user.serialize() for user in users]
    return jsonify({'ok':True,'status':200},user_list),200

@routes.route('/login', methods=['POST'])
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
        return jsonify({'ok':False,'error': 'invalid password', 'status':401}),401
    
    token=create_access_token({'email': user.email, 'id': user.id})
    return jsonify({'ok':True,'token': token, 'status':200}),200