import os

from flask import Flask, jsonify, render_template, request

basedir = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../Client/')

app = Flask(__name__, static_url_path='')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.route("/")
def index():
    return render_template("./index.html")
