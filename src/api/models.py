import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(300), unique=False, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.now())

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "created": self.created,
            # do not serialize the password, its a security breach
        }

class Case(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, default=True, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)
    professional_id = db.Column(db.Integer, db.ForeignKey("professional.id"), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    started=db.Column(db.Boolean(), unique=False, default=False, nullable=False)
    date_init = db.Column(db.DateTime, default=datetime.datetime.now(), unique=False, nullable=True)
    typeservice_id = db.Column(db.Integer, db.ForeignKey("typeservice.id"), default=1, nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey("status.id"), default=1, nullable=False) #se asigna en el route
    initial_note = db.Column(db.String(400), nullable=True)
    description = db.Column(db.String(400), nullable=True)
    closed=db.Column(db.Boolean(), unique=False, default=False, nullable=False)
    close_date = db.Column(db.DateTime, default=datetime.datetime.now(), unique=False, nullable=True)
    close_description = db.Column(db.String(400), nullable=True)
    delivered=db.Column(db.Boolean(), unique=False, default=False, nullable=False)
    delivered_date = db.Column(db.DateTime, default=datetime.datetime.now(), unique=False, nullable=True)
    delivered_description = db.Column(db.String(400), nullable=True)

    def serialize(self):
        return{
            "id": self.id,
            "created": self.created,
            "is_active": self.is_active,
            "customer_id": self.customer_id,
            "professional_id": self.professional_id,
            "category_id": self.category_id,
            "started": self.started,
            "date_init": self.date_init,
            "typeservice_id": self.typeservice_id,
            "status_id": self.status_id,
            "initial_note": self.initial_note,
            "description": self.description,
            "closed": self.closed,
            "close_date": self.close_date,
            "close_description": self.close_description,
            "delivered": self.delivered,
            "delivered_date": self.delivered_date,
            "delivered_description": self.delivered_description,
        }
    
class Status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(100), unique=True, nullable=False)
    case = db.relationship("Case", backref="status_case") # backref es el nombre de la relacion

    def serialize(self):
        return {
            "id": self.id,
            "status": self.status,
        }

class Typeservice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type_service = db.Column(db.String(100), unique=True, nullable=False)
    case = db.relationship("Case", backref="typeservice_case") # backref es el nombre de la relacion

    def serialize(self):
        return {
            "id": self.id,
            "type_service": self.type_service,
        }
    
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now(), unique=False, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    identification = db.Column(db.String(30), unique=True, nullable=False)
    phone = db.Column(db.String(100), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=False, nullable=True)
    address = db.Column(db.String(200), unique=False, nullable=True)
    comment = db.Column(db.String(400), unique=False, nullable=True)
    case = db.relationship("Case", backref="customer_case") # backref es el nombre de la relacion

    def serialize(self):
        return {
            "id": self.id,
            "created": self.created,
            "name": self.name,
            "identification": self.identification,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
            "comment": self.comment,
        }
    def serialize_full(self):
        return {
            "id": self.id,
            "created": self.created,
            "name": self.name,
            "identification": self.identification,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
            "comment": self.comment,
            "cases": [case.serialize() for  case in self.case]
        }

class Professional(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now(), unique=False, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    identification = db.Column(db.String(30), unique=True, nullable=False)
    phone = db.Column(db.String(100), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=False, nullable=True)
    address = db.Column(db.String(200), unique=False, nullable=True)
    comment = db.Column(db.String(400), unique=False, nullable=True)
    case = db.relationship("Case", backref="professional_case") # backref es el nombre de la relacion

    def serialize(self):
        return {
            "id": self.id,
            "created": self.created,
            "name": self.name,
            "identification": self.identification,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
            "comment": self.comment,
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(150), unique=True, nullable=False)
    description = db.Column(db.String(300), unique=False, nullable=True)
    case = db.relationship("Case", backref="category_case") # backref es el nombre de la relacion

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category,
            "description": self.description,
        }
