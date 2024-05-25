from flask import Flask, jsonify, request
import datetime
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from urllib.parse import quote_plus
import pickle
import logging

# from flask_sqlalchemy import SQLAlchemy #pip install Flask-SQLAlchemy
# from flask_marshmallow import Marshmallow #ModuleNotFoundError: No module named 'flask_marshmallow' = pip install flask-marshmallow https://pypi.org/project/flask-marshmallow/
from urllib.parse import quote_plus

# from create_db import create_database
from yolomodel import yolomodel
from sqlalchemy import Integer

# from logstash_async.handler import AsynchronousLogstashHandler
# from logstash_async.formatter import LogstashFormatter

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
logstash_handler = AsynchronousLogstashHandler(
    host='logstash',  # Use the service name defined in docker-compose
    port=6000,
    database_path=None
)

logstash_formatter = LogstashFormatter()
logstash_handler.setFormatter(logstash_formatter)
logger.addHandler(logstash_handler)



# ------------------------api definitions-------------------------

# @app.route('/login', methods=['POST'])
# def login():
#     username = request.json['username']
#     password = request.json['password']

#     user = Users.query.filter_by(username=username, password=password).first()
#     if user:
#         # If user is found, return success response
#         return jsonify({"message": "Login successful", "user": user_schema.dump(user)}), 200
#     else:
#         # If user is not found, return error response
#         return jsonify({"message": "Invalid username or password"}), 401


# @app.route('/addData', methods=['POST'])
# def addData():
#     username = request.json['username']
#     in_bus = request.json['in_bus']
#     in_car = request.json['in_car']
#     in_motorcycle = request.json['in_motorcycle']
#     in_truck = request.json['in_truck']
#     out_bus =request.json['out_bus']
#     out_car = request.json['out_car']
#     out_motorcycle = request.json['out_motorcycle']
#     out_truck = request.json['out_truck']
#     in_total = request.json['in_total']
#     out_total = request.json['out_total']

#     vehicleData = VehicleData(username, in_bus , in_car,in_motorcycle,in_truck,out_bus,out_car,out_motorcycle,out_truck,in_total,out_total)
#     db.session.add(vehicleData)
#     db.session.commit()

#     return jsonify({"message": "Login successful"})
 
# @app.route('/signup', methods=['POST'])
# def signup():
#     name = request.json['name']
#     email = request.json['email']
#     username = request.json['username']
#     password = request.json['password']

#     users = Users(username, email, password)
#     db.session.add(users)
#     db.session.commit()

#     return user_schema.jsonify("sign")

@app.route('/',methods =['GET'])
def hello():
    logger.debug("Debug log level")
    logger.info("Program running correctly")
    logger.warning("Warning!")
    logger.error("Error!")
    # logger.critical("Program halt!")

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
        app.run(debug=True)
