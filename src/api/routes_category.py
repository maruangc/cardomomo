from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Category
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

routes_category = Blueprint('routes_category',__name__)

CORS(routes_category)

#----------------------------------------------- /category
@routes_category.route('/new',endpoint='add_category', methods=['POST'])
@jwt_required
def add_category():
    body=request.json
    category=body.get('category', None)
    description=body.get('description', None)
    texto=""
    if category is None:
        texto="category must exist in the request "+chr(10)
    elif len(category)==0 or category.strip()=="":
        texto+="category must have some value"
    if len(texto)>0:
        return jsonify({'ok':False,'error':texto,'status':400})
    if description is None:
        description=""
    resp=Category.query.filter_by(category=category).one_or_none()
    if resp is not None:
        return jsonify({'ok':False, 'error': 'category allready exists', 'status':409}),409
    db.session.add(Category(category=category,description=description))
    try:
        db.session.commit()
        return jsonify({'ok':True, 'data': 'category created', 'status':201}),201
    except Exception as error:
        print("-*-*-*-*commit error: ", error)
        db.session.rollback()
        return jsonify({'ok':False, 'error': 'internal server error','status':500}),500

#-----------------------------------
@routes_category.route('/<int:id>',endpoint='get_category', methods=['GET'])
# @jwt_required
def get_category(id):
    category_filter=Category.query.filter_by(id=id).one_or_none()
    if category_filter is None:
        return jsonify({'ok':False,'error':'category id not found ','status':404}),404
    dic={'ok':True,'status':200}
    dic['data']=[category_filter.serialize()]
    return jsonify(dic)

@routes_category.route('/list', endpoint='get_categories', methods=['GET'])
# @jwt_required
def get_categories():
    category_filter=Category.query.all()
    dic={'ok':True,'status':200}
    dic['data']=[category.serialize() for category in category_filter]
    return jsonify(dic)

@routes_category.route('/edit/<int:id>',endpoint='edit_category', methods=['PUT'])
@jwt_required
def edit_category(id):
    body=request.json
    category=body.get('category', None)
    description=body.get('description', None)
    if category is None and description is None:
        return jsonify({'ok':False,'error':'category or description must exist in the request ','status':400}),400
    category='' if category is None else category
    description='' if description is None else description
    if (len(category)==0 or category.strip()=='') and (len(description)==0 or description.strip()==''):
        return jsonify({'ok':False,'error':'category or description must must contain information ','status':400}),400
    category_filter=Category.query.filter_by(id=id).one_or_none()
    if category_filter is None:
        return jsonify({'ok':False,'error':'category id not found ','status':404}),404
    category_filter.category=category if len(category)>0 else category_filter.category
    category_filter.description=description if len(description)>0 else category_filter.description
    try:
        db.session.commit()
        texto='category:'+category+', ' if category != '' else ''
        texto+='description:'+description if description != '' else ''
        return jsonify({'ok':True,'data': f'category id updated - '+texto,'status':201}),201
    except Exception as error:
        print('-*-*-*-*Update Error:', error)
        db.session.rollback()
        return jsonify({'ok':False,'error': 'internal server error','status':500}),500