import os

from flask import Flask, jsonify, render_template, request
from flask_cors import CORS, cross_origin

basedir = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../Client/')

app = Flask(__name__, static_url_path='')
CORS(app)

@app.route("/")
def index():
    return render_template("./index.html")
