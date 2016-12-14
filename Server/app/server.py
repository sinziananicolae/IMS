import os

from flask import Flask, jsonify, render_template, request
from wiki import *
from sortedcontainers import SortedSet

basedir = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../Client/')

app = Flask(__name__, static_url_path='')
#app.config['SERVER_NAME'] = 'google-ngrams-events-extraction.dev:5000'
#app.logger.debug("here")

#app.config.from_object('app.config')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.route("/")
def index():
    return render_template("./index.html")



@app.route('/getpeaks/<word>', methods=['GET'])
def get_tasks(word):
    result = peaks_for_word(word)
    peaks = list(result['peaks'])
    graph_values = dict(result['graph_values'])
    #app.logger.debug(a)
    return jsonify({
        'peaks': peaks,
        'word': word,
        'graph_values': graph_values
        })

@app.route('/getEventsInfo/<word>/<year>', methods=['GET'])
def get_events_info(word, year):
    #app.logger.debug(word)
    result = get_events(word, year)
    #app.logger.debug(result)
    return jsonify({
        'Content': result
        })

@app.route('/getWordsRanking', methods=['POST'])
def get_words_ranking():
    app.logger.debug(request.json)
    request_body = request.json
    result = get_ranking(request_body['keyword'], request_body['year'], request_body['link'])
    # #app.logger.debug(result)
    return jsonify({
         'Content': result
     })
