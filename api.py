from flask import Flask, make_response
from flask_restful import Resource, Api
from flask import render_template
from rest import *

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 #TODO: TEMP
app.config['RESTFUL_JSON'] = {
    'ensure_ascii': False
}
api = Api(app)


@app.route('/inspect/<string:pmcid_id>')
def index(pmcid_id):
    return render_template('index.html', pmcid_id=pmcid_id)

api.add_resource(PMCTextJson, '/text/json/<string:pmcid>')
api.add_resource(PMCRawJson, '/raw/json/<string:pmcid_id>')
api.add_resource(PMCCleanedJson, '/cleaned/json/<string:pmcid>')
api.add_resource(PMCRawBrat, '/raw/brat/<string:pmcid>')
api.add_resource(PMCRawCyto, '/raw/cyto/<string:pmcid_id>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=11000)
