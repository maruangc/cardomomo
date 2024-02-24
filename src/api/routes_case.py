import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Case, Customer, Professional, Category, Typeservice
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

routes = Blueprint('routes_case',__name__)

CORS(routes)

#---------------------------------------------case
@routes.route('/new',endpoint='add_case', methods=['POST'])
@jwt_required()
def add_case():
    body=request.json
    customer_id=body.get('customer_id', None) #requerido
    category_id=body.get('category_id', None) #requerido
    typeservice_id=body.get('typeservice_id', None) #requerido
    # These fields will get these default values --------------
    # is_active = True, created = datetime.now()
    started=body.get('started', None) if body.get('started', None) is not None else False
    date_init=body.get('date_init', None) if body.get('date_init', None) is not None else datetime.now().strftime('%Y-%m-%d %H:%M:%S') # default value
    professional_id=body.get('professional_id', None) if body.get('professional_id', None) is not None else None
    initial_note=body.get('initial_note', None) if body.get('initial_note', None) is not None else ''
    description=body.get('description', None) if body.get('description', None) is not None else ''
    closed=body.get('closed', None) if body.get('closed', None) is not None else False # Default value
    close_date=body.get('close_date', None) if body.get('close_date', None) is not None else datetime.now().strftime('%Y-%m-%d %H:%M:%S') # default value
    close_description=body.get('close_description', None) if body.get('close_description', None) is not None else ''
    delivered=body.get('delivered', None) if body.get('delivered', None) is not None else False # default value
    delivered_date=body.get('delivered_date', None) if body.get('delivered_date', None) is not None else datetime.now().strftime('%Y-%m-%d %H:%M:%S') # default value
    delivered_description=body.get('delivered_description', None) if body.get('delivered_description', None) is not None else ''
    texto=""
    if customer_id is None:
        texto="the customer_id must exist in the request "+chr(10)
    elif type(customer_id)!=int:
        texto+="the customer_id parameter has an invalid value, must be integer and greather than zero "+chr(10)
    if category_id is None:
        texto+="the category_id must exist in the request "+chr(10)
    elif type(category_id)!=int:
        texto+="the category_id parameter has an invalid value, must be integer and greather than zero "+chr(10)
    if typeservice_id is None:
        texto="the typeservice_id must exist in the request "+chr(10)
    elif type(typeservice_id)!=int:
        texto+="the typeservice_id parameter has an invalid value, must be integer and greather than zero "+chr(10)
    if type(started)!=bool or type(closed)!=bool or type(delivered)!=bool:
        texto+="started, closed and delivered fields must be boolean"+chr(10)
    print('------***------***------', date_init)
    try: 
        date_init=datetime.strptime(date_init,'%Y-%m-%d %H:%M:%S')
    except Exception as error:
        texto+="date_init - "+str(error)+chr(10)
    try:
        close_date=datetime.strptime(close_date,'%Y-%m-%d %H:%M:%S')
    except Exception as error:
        texto+="close_date - "+str(error)+chr(10)
    try:
        delivered_date=datetime.strptime(delivered_date,'%Y-%m-%d %H:%M:%S')
    except Exception as error:
        texto+="delivered_date - "+str(error)+chr(10)
    if len(texto)>0:
        return jsonify({'ok':False,'error':texto,'status':400}),400
    db.session.add(Case(customer_id=customer_id,
                        category_id=category_id,
                        typeservice_id=typeservice_id,
                        started=started,
                        date_init=date_init,
                        professional_id=professional_id,
                        initial_note=initial_note,
                        description=description,
                        closed=closed,
                        close_date=close_date,
                        close_description=close_description,
                        delivered=delivered,
                        delivered_date=delivered_date,
                        delivered_description=delivered_description))
    try:
        db.session.commit()
        return jsonify({'ok':True, 'data': 'case created', 'status':201}),201
    except Exception as error:
        print("-*-*-*-*commit error: ", error)
        db.session.rollback()
        return jsonify({'ok':False, 'error': 'internal server error','status':500}),500

@routes.route('/<int:id>', endpoint='get_case', methods=['GET'])
#@jwt_required()
def get_case(id):
    filter=Case.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'case id not found','status':404}),404
    dic={'ok':True,'status':200,'data':{}}
    dic['data']['case']=filter.serialize()
    customer_id=filter.customer_id
    professional_id=filter.professional_id
    category_id=filter.category_id
    typeservice_id=filter.typeservice_id
    filter=Customer.query.filter_by(id=customer_id).one_or_none()
    if filter is None:
        dic['data']['customer']={'ok':False,'error':'customer id not found ','status':404}
    else:
        dic['data']['customer']=filter.serialize()
    filter=Professional.query.filter_by(id=professional_id).one_or_none()
    if filter is None:
        dic['data']['professional']={'ok':False,'error':'professional id not found ','status':404}
    else:
        dic['data']['professional']=filter.serialize()
    filter=Category.query.filter_by(id=category_id).one_or_none()
    if filter is None:
        dic['data']['category']={'ok':False,'error':'category id not found ','status':404}
    else:
        dic['data']['category']=filter.serialize()
    filter=Typeservice.query.filter_by(id=typeservice_id).one_or_none()
    if filter is None:
        dic['data']['typeservice']={'ok':False,'error':'typeservice id not found ','status':404}
    else:
        dic['data']['typeservice']=filter.serialize()
    return jsonify(dic),200

@routes.route('/all', endpoint='get_cases', methods=['GET'])
@jwt_required()
def get_cases():
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0

    if limit=='0':
        filter=Case.query.all()
    else:
        filter=Case.query.offset(offset).limit(limit).all()
    dic={'ok':True,'status':200,'data':[],'count':len(filter)}

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
    return jsonify(dic),200

@routes.route('/edit/<int:id>', endpoint='edit_case', methods=['PUT'])
@jwt_required()
def edit_case(id):
    filter=Case.query.filter_by(id=id).one_or_none()
    if filter is None:
        return jsonify({'ok':False,'error':'case id not found ','status':404}),404
    body=request.json
    if body=={}:
       return jsonify({'ok':False,'error':'body is empty ','status':400}),400
    customer_id=body.get('customer_id', None) 
    category_id=body.get('category_id', None) 
    typeservice_id=body.get('typeservice_id', None) 
    is_active=body.get('is_active', None) 
    # started=body.get('started', None) 
    # date_init=body.get('date_init', None) 
    professional_id=body.get('professional_id', None) 
    initial_note=body.get('initial_note', None) 
    description=body.get('description', None) 
    # closed=body.get('closed', None) 
    # close_date=body.get('close_date', None) 
    close_description=body.get('close_description', None) 
    # delivered=body.get('delivered', None) 
    # delivered_date=body.get('delivered_date', None) 
    delivered_description=body.get('delivered_description', None) 
    if customer_id is None and category_id is None and typeservice_id is None:
       if is_active is None and professional_id is None and initial_note is None and description is None:
             if close_description is None and delivered_description is None:
                return jsonify({'ok':False,'error':"no fields-name valid in body, you must send any field: example: {'is_active':False}",'status':400}),400
    if customer_id is not None and type(customer_id)!=int:
       return jsonify({'ok':False,'error':'customer_id must be a integer ','status':400}),400
    if category_id is not None and type(category_id)!=int:
       return jsonify({'ok':False,'error':'category_id must be a integer ','status':400}),400
    if typeservice_id is not None and type(typeservice_id)!=int:
       return jsonify({'ok':False,'error':'typeservice_id must be a integer ','status':400}),400
    if is_active is not None and type(is_active)!=bool:
       return jsonify({'ok':False,'error':'is_active must be a boolean ','status':400}),400
    if professional_id is not None and type(professional_id)!=int:
      return jsonify({'ok':False,'error':'professional_id must be a integer ','status':400}),400
    # if started is not None and type(started)!=bool:
      #  return jsonify({'ok':False,'error':'started must be a boolean ','status':400}),400
    # if closed is not None and type(closed)!=bool:
      # return jsonify({'ok':False,'error':'closed must be a boolean ','status':400}),400
    # if delivered is not None and type(delivered)!=bool:
      # return jsonify({'ok':False,'error':'delivered must be a boolean ','status':400}),400        
    if initial_note is not None and type(initial_note)!=str:
      return jsonify({'ok':False,'error':'initial_note must be a string ','status':400}),400        
    if description is not None and type(description)!=str:
      return jsonify({'ok':False,'error':'description must be a string ','status':400}),400        
    if close_description is not None and type(close_description)!=str:
      return jsonify({'ok':False,'error':'close_description must be a string ','status':400}),400            
    if delivered_description is not None and type(delivered_description)!=str:
      return jsonify({'ok':False,'error':'delivered_description must be a string ','status':400}),400            
    # texto=""
    # if date_init is not None:
    #   try: 
    #       date_init=datetime.strptime(date_init,'%Y-%m-%d %H:%M:%S')
    #   except Exception as error:
    #       texto+="date_init - "+str(error)+chr(10)
    # if close_date is not None:
    #   try:
    #       close_date=datetime.strptime(close_date,'%Y-%m-%d %H:%M:%S')
    #   except Exception as error:
    #       texto+="close_date - "+str(error)+chr(10)
    # if delivered_date is not None:
    #   try:
    #       delivered_date=datetime.strptime(delivered_date,'%Y-%m-%d %H:%M:%S')
    #   except Exception as error:
    #       texto+="delivered_date - "+str(error)+chr(10)
    # if len(texto)>0:
    #     return jsonify({'ok':False,'error':texto,'status':400}),400
    
    filter.category_id=category_id if category_id is not None else filter.category_id
    filter.typeservice_id=typeservice_id if typeservice_id is not None else filter.typeservice_id
    filter.is_active=is_active if is_active is not None else filter.is_active
    # filter.started=started if started is not None else filter.started
    # filter.date_init=date_init if date_init is not None else filter.date_init
    filter.professional_id=professional_id if professional_id is not None else filter.professional_id
    filter.initial_note=initial_note if initial_note is not None else filter.initial_note
    filter.description=description if description is not None else filter.description
    # filter.closed=closed if closed is not None else filter.closed
    # filter.close_date=close_date if close_date is not None else filter.close_date
    filter.close_description=close_description if close_description is not None else filter.close_description
    # filter.delivered=delivered if delivered is not None else filter.delivered
    # filter.delivered_date=delivered_date if delivered_date is not None else filter.delivered_date
    filter.delivered_description=delivered_description if delivered_description is not None else filter.delivered_description
    texto='category_id:'+str(category_id)+', ' if category_id !=None else ''
    texto+='typeservice_id:'+str(typeservice_id)+', ' if typeservice_id != None else ''
    texto+='is_active:'+str(is_active)+', ' if is_active != None else ''
    # texto+='started:'+str(started)+', ' if started != None else ''
    # texto+='date_init:'+str(date_init)+', ' if date_init != None else ''
    texto+='professional_id:'+str(professional_id)+', ' if professional_id != None else ''
    texto+='initial_note:'+initial_note+', ' if initial_note != None else ''
    texto+='description:'+description+', ' if description != None else ''
    # texto+='closed:'+str(closed)+', ' if closed != None else ''
    # texto+='close_date:'+str(close_date)+', ' if close_date != None else ''
    texto+='close_description:'+close_description+', ' if close_description != None else ''
    # texto+='delivered:'+str(delivered)+', ' if delivered != None else ''
    # texto+='delivered_date:'+str(delivered_date)+', ' if delivered_date != None else ''
    texto+='delivered_description:'+delivered_description+', ' if delivered_description != None else ''
    try:
       db.session.commit()
       return jsonify({'ok':True,'data': f'case id updated '+chr(10)+texto,'status':200}),200
    except Exception as error:
       print('-*-*-*-*-*-*-*-*-Update Error: ', error+chr(10)+texto)
       db.session.rollback()
       return jsonify({'ok':False,'error': 'internal server error '+chr(10)+texto,'status':500}),500


@routes.route('/setstate/<int:id>', endpoint='set_state', methods=['PUT'])
@jwt_required()
def set_state(id):
  
  filter=Case.query.filter_by(id=id).one_or_none()
  
  if filter is None:
      return jsonify({'ok':False,'error':'case id not found ','status':404}),404
  body=request.json
  if body=={}:
    return jsonify({'ok':False,'error':'body is empty ','status':400}),400
  started=body.get('started', None)
  closed=body.get('closed', None)
  delivered=body.get('delivered', None)
  
  if started is not None and type(started)!=bool:
    return jsonify({'ok':False,'error':'started must be a boolean ','status':400}),400
  if closed is not None and type(closed)!=bool:
    return jsonify({'ok':False,'error':'closed must be a boolean ','status':400}),400
  if delivered is not None and type(delivered)!=bool:
    return jsonify({'ok':False,'error':'delivered must be a boolean ','status':400}),400    
      
  filter.started=started if started is not None else filter.started
  filter.date_init=datetime.now().strftime('%Y-%m-%d %H:%M:%S') if started is True else filter.date_init
  filter.closed=closed if closed is not None else filter.closed
  filter.close_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S') if closed is True else filter.close_date
  filter.delivered=delivered if delivered is not None else filter.delivered
  filter.delivered_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S') if delivered is True else filter.delivered_date
  
  try:
      db.session.commit()
      return jsonify({'ok':True,'data': 'case id updated','status':200}),200
  except Exception as error:
      print('-*-*-*-*-*-*-*-*-Update Error: ', error)
      db.session.rollback()
      return jsonify({'ok':False,'error': 'internal server error','status':500}),500

    
@routes.route('/filter', endpoint='filter_cases', methods=['GET'])
@jwt_required()
def filter_cases():
    limit=request.args.get('limit', None) if request.args.get('limit', None) is not None else 30
    offset=request.args.get('offset', None) if request.args.get('offset', None) is not None else 0
    body=request.json
    if body=={}:
       return jsonify({'ok':False,'error':'body is empty ','status':400}),400
    customer_id=body.get('customer_id', None)
    category_id=body.get('category_id', None)
    typeservice_id=body.get('typeservice_id', None)
    is_active=body.get('is_active', None)
    started=body.get('started', None)
    date_init_start=body.get('date_init_start', None)
    date_init_end=body.get('date_init_end', None)
    professional_id=body.get('professional_id', None)
    initial_note=body.get('initial_note', None)
    description=body.get('description', None)
    closed=body.get('closed', None)
    close_date_start=body.get('close_date_start', None)
    close_date_end=body.get('close_date_end', None)
    close_description=body.get('close_description', None)
    delivered=body.get('delivered', None)
    delivered_date_start=body.get('delivered_date_start', None)
    delivered_date_end=body.get('delivered_date_end', None)
    delivered_description=body.get('delivered_description', None)
    if customer_id is None and category_id is None and typeservice_id is None:
       if is_active is None and started is None and date_init_start is None and date_init_end in None and professional_id is None:
          if initial_note is None and description is None and closed is None and close_date_start is None and close_date_end is None:
             if close_description is None and delivered is None and delivered_date_start is None and delivered_date_end is None and delivered_description is None:
                return jsonify({'ok':False,'error':"no fields-name valid in body, you must send any field: example: {'is_active':False}",'status':400}),400
    if customer_id is not None and type(customer_id)!=int:
       return jsonify({'ok':False,'error':'customer_id must be a integer ','status':400}),400
    if category_id is not None and type(category_id)!=int:
       return jsonify({'ok':False,'error':'category_id must be a integer ','status':400}),400
    if typeservice_id is not None and type(typeservice_id)!=int:
       return jsonify({'ok':False,'error':'typeservice_id must be a integer ','status':400}),400
    if is_active is not None and type(is_active)!=bool:
       return jsonify({'ok':False,'error':'is_active must be a boolean ','status':400}),400
    if started is not None and type(started)!=bool:
       return jsonify({'ok':False,'error':'started must be a boolean ','status':400}),400
    if professional_id is not None and type(professional_id)!=int:
      return jsonify({'ok':False,'error':'professional_id must be a integer ','status':400}),400
    if closed is not None and type(closed)!=bool:
      return jsonify({'ok':False,'error':'closed must be a boolean ','status':400}),400
    if delivered is not None and type(delivered)!=bool:
      return jsonify({'ok':False,'error':'delivered must be a boolean ','status':400}),400        
    if initial_note is not None and type(initial_note)!=str:
      return jsonify({'ok':False,'error':'initial_note must be a string ','status':400}),400        
    if description is not None and type(description)!=str:
      return jsonify({'ok':False,'error':'description must be a string ','status':400}),400        
    if close_description is not None and type(close_description)!=str:
      return jsonify({'ok':False,'error':'close_description must be a string ','status':400}),400            
    if delivered_description is not None and type(delivered_description)!=str:
      return jsonify({'ok':False,'error':'delivered_description must be a string ','status':400}),400            
    texto=""
    if date_init_start is not None:
      try: 
          date_init_start=datetime.strptime(date_init_start,'%Y-%m-%d %H:%M:%S')
      except Exception as error:
          texto+="date_init_start - "+str(error)+chr(10)
    if date_init_end is not None:
      try: 
          date_init_end=datetime.strptime(date_init_end,'%Y-%m-%d %H:%M:%S')
      except Exception as error:
          texto+="date_init_end - "+str(error)+chr(10)
    if close_date_start is not None:
      try:
          close_date_start=datetime.strptime(close_date_start,'%Y-%m-%d %H:%M:%S')
      except Exception as error:
          texto+="close_date_start - "+str(error)+chr(10)
    if close_date_end is not None:
      try:
          close_date_end=datetime.strptime(close_date_end,'%Y-%m-%d %H:%M:%S')
      except Exception as error:
          texto+="close_date_end - "+str(error)+chr(10)
    if delivered_date_start is not None:
      try:
          delivered_date_start=datetime.strptime(delivered_date_start,'%Y-%m-%d %H:%M:%S')
      except Exception as error:
          texto+="delivered_date_start - "+str(error)+chr(10)
    if delivered_date_end is not None:
      try:
          delivered_date_end=datetime.strptime(delivered_date_end,'%Y-%m-%d %H:%M:%S')
      except Exception as error:
          texto+="delivered_date_end - "+str(error)+chr(10)
    if len(texto)>0:
        return jsonify({'ok':False,'error':texto,'status':400}),400
    filter=Case.query.filter(
      Case.customer_id==customer_id if customer_id is not None else (Case.id > 0),
      Case.category_id==category_id if category_id is not None else (Case.id > 0),
      Case.typeservice_id==typeservice_id if typeservice_id is not None else (Case.id > 0),
      Case.professional_id==professional_id if professional_id is not None else (Case.id > 0),
      Case.is_active==is_active if is_active is not None else (Case.id > 0),
      Case.started==started if started is not None else (Case.id > 0),
      Case.date_init.between(date_init_start,date_init_end) if date_init_start is not None else (Case.id > 0),
      Case.close_date.between(close_date_start,date_init_end) if close_date_start is not None else (Case.id > 0),
      Case.delivered_date.between(delivered_date_start,delivered_date_end) if delivered_date_start is not None else (Case.id > 0),
      Case.initial_note.ilike('%'+initial_note+'%') if initial_note is not None else (Case.id > 0),
      Case.description.ilike('%'+description+'%') if description is not None else (Case.id > 0),
      Case.closed==closed if closed is not None else (Case.id > 0),
      Case.close_description.ilike('%'+close_description+'%') if close_description is not None else (Case.id > 0),
      Case.delivered==delivered if delivered is not None else (Case.id > 0),
      Case.delivered_description.ilike('%'+delivered_description+'%') if delivered_description is not None else (Case.id > 0)
      )
    if limit=='0':
        filter=filter.all()
    else:
        filter=filter.offset(offset).limit(limit).all()
    dic={'ok':True,'status':200,'data':[],'count':len(filter)}

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
    return jsonify(dic),200

@routes.route('/DELETE/<int:id>', endpoint='del_case', methods=['DELETE'])
@jwt_required()
def del_case(id):
    filter=Case.query.filter_by(id=id).one_or_none()
    if filter is None:
      return jsonify({'ok':False,'error':f'case id:{id} not found ','status':404}),404
    if filter.is_active==False:
      return jsonify({'ok':False,'error':f'case id:{id} is deactivated ','status':400}),400
    filter.is_active=False
    try:
       db.session.commit()
       return jsonify({'ok':True,'data': f'is_active set to false, cases are not deleted, they are deactivated','status':202}),202
    except Exception as error:
       print('-*-*-*-*-*-*-*-*---DELETE Error: ', error)
       db.session.rollback()
       return jsonify({'ok':False,'error': 'internal server error','status':500}),500

