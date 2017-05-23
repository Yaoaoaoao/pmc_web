from flask import Flask, make_response
from flask_restful import Resource, Api
from flask import render_template
from rest import *

app = Flask(__name__)
api = Api(app)


@app.route('/inspect/<string:pmcid>')
def index(pmcid):
    return render_template('index.html', pmcid=pmcid)

api.add_resource(PMCTextJson, '/text/json/<string:pmcid>')
api.add_resource(PMCRawJson, '/raw/json/<string:pmcid>')
api.add_resource(PMCCleanedJson, '/cleaned/json/<string:pmcid>')
api.add_resource(PMCRawBrat, '/raw/brat/<string:pmcid>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=11000)
