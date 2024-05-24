from flask import Flask, jsonify, request
import datetime
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from urllib.parse import quote_plus
import pickle
import logging

from flask_sqlalchemy import SQLAlchemy #pip install Flask-SQLAlchemy
from flask_marshmallow import Marshmallow #ModuleNotFoundError: No module named 'flask_marshmallow' = pip install flask-marshmallow https://pypi.org/project/flask-marshmallow/
from urllib.parse import quote_plus

from create_db import create_database
from yolomodel import yolomodel

from logstash_async.handler import AsynchronousLogstashHandler
from logstash_async.formatter import LogstashFormatter


# ------------------------Defining flask app-------------------------

app = Flask(__name__)
CORS(app)
 


# ------------------------Logging with flask logger and logstash-------------------------

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(name)s : %(message)s',
                    handlers=[
                        logging.FileHandler("app.log"),
                        logging.StreamHandler()
                    ])

logger = logging.getLogger(__name__)


# adding logstash
# logstash_handler = AsynchronousLogstashHandler(
#     host='logstash',  # Use the service name defined in docker-compose
#     port=6000,
#     database_path=None
# )

# logstash_formatter = LogstashFormatter()
# logstash_handler.setFormatter(logstash_formatter)
# logger.addHandler(logstash_handler)



# ------------------------Database configuration-------------------------

# Databse configuration                                  Username:password@hostname/databasename
password = quote_plus('Rutuja@10')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{password}@localhost/SPE'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db=SQLAlchemy(app)
ma=Marshmallow(app)


class Users(db.Model):
    _tablename_ = "users"
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(100), nullable=False)

    def _init_(self,username,email, password):
        self.username=username
        self.email=email
        self.password=password


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','username','email', 'password')
 
user_schema = UserSchema()
users_schema = UserSchema(many=True)


def create_tables():
    db.create_all()


# ------------------------api definitions-------------------------

@app.route('/login',methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    user = Users.query.filter_by(username=username, password=password).first()
    if user:
        return jsonify({"message": "Login successful", "user": user_schema.dump(user)}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401


 
@app.route('/signup', methods=['POST'])
def signup():
    name = request.json['name']
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']

    users = Users(username, email, password)
    db.session.add(users)
    db.session.commit()

    return user_schema.jsonify(users)

@app.route('/',methods =['GET'])
def hello():
    logger.debug("Debug log level")
    logger.info("Program running correctly")
    logger.warning("Warning; low disk space!")
    logger.error("Error!")
    logger.critical("Program halt!")

    return jsonify("hello")

# @app.route("/video", methods=['POST'])
# def video():
#     if(request.method == "POST"):
#         bytesOfVideo = request.get_data()
#         upload_dir = 'SPE_flask_backend'
#         os.makedirs(upload_dir, exist_ok=True)
#         video_path = os.path.join(upload_dir, 'video.mp4')
#         video_path = 'video.mp4'
#         with open('video.mp4', 'wb') as out:
#             out.write(bytesOfVideo)
#         yolomodel(video_path)
#         return jsonify(vehicle_counts)


@app.route("/video", methods=['POST'])
def video():
    if request.method == "POST":
        bytes_of_video = request.get_data()
        video_path = 'video.mp4'
        with open(video_path, 'wb') as out:
            out.write(bytes_of_video)
        vehicle_counts = yolomodel(video_path)
        logger.info("vehicle_counts......................................: %s", vehicle_counts)

        return jsonify(vehicle_counts)

@app.route("/counts", methods=['GET'])
def get_counts():
    return jsonify(vehicle_counts)


if __name__=='__main__':
    with app.app_context():
        create_database()
        create_tables()
        app.run(debug=True)