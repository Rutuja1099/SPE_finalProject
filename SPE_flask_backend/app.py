from flask import Flask, jsonify, request
import datetime
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from urllib.parse import quote_plus
import pickle

from yolomodel import yolo_model

app = Flask(__name__)
CORS(app)
 

 
@app.route('/',methods =['GET'])
def hello():
    return jsonify("hello")


@app.route("/video", methods=['POST'])
def video():
    if(request.method == "POST"):
        bytesOfVideo = request.get_data()
        video_path = 'video.mp4'
        with open('video.mp4', 'wb') as out:
            out.write(bytesOfVideo)
        yolo_model(video_path)
        return "Video read"

if __name__=='__main__':
    with app.app_context():
        app.run(debug=True)

        
