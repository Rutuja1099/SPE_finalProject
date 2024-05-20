from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow #ModuleNotFoundError: No module named 'flask_marshmallow' = pip install flask-marshmallow https://pypi.org/project/flask-marshmallow/
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from urllib.parse import quote_plus
import pickle

from model import yolomodel

app = Flask(__name__)
CORS(app)
 
# Databse configuration                                  Username:password@hostname/databasename
password = quote_plus('Saurabh123')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{password}@localhost/SPE'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
 
ma=Marshmallow(app)
 
class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    date = db.Column(db.DateTime,default=datetime.datetime.now)
 
    def __init__(self,name,email):
        self.name=name
        self.email=email
 
 
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','name','email','date')
 
user_schema = UserSchema()
users_schema = UserSchema(many=True)
 
@app.route('/',methods =['GET'])
def hello():
    return jsonify("hello")

@app.route('/listusers',methods =['GET'])
def listusers():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)
 
@app.route('/userdetails/<id>',methods =['GET'])
def userdetails(id):
    user = Users.query.get(id)
    return user_schema.jsonify(user)
 
@app.route('/userupdate/<id>',methods = ['PUT'])
def userupdate(id):
    user = Users.query.get(id)
 
    name = request.json['name']
    email = request.json['email']
 
    user.name = name
    user.email = email
 
    db.session.commit()
    return user_schema.jsonify(user)
 
@app.route('/userdelete/<id>',methods=['DELETE'])
def userdelete(id):
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)
 
@app.route('/useradd',methods=['POST'])
def useradd():
    name = request.json['name']
    email = request.json['email']
 
    users = Users(name,email)
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify(users)
 
@app.route("/image", methods=['GET', 'POST'])
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        with open('image.jpeg', 'wb') as out:
            out.write(bytesOfImage)
        return "Image read"


@app.route("/video", methods=['POST'])
def video():
    if(request.method == "POST"):
        bytesOfVideo = request.get_data()
        with open('video.mp4', 'wb') as out:
            out.write(bytesOfVideo)
        return "Video read"

def create_tables():
    db.create_all()


def model():
    # Load the model
    model = pickle.load(open('model.pkl','rb'))


if __name__=='__main__':
    with app.app_context():
        create_tables()
        app.run(debug=True)

        