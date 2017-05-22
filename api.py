from flask import Flask, make_response
from flask_restful import Resource, Api
from pmc import *
from brat import convert

app = Flask(__name__)
api = Api(app)


class PMCText(Resource):
    def get(self, pmid):
        return get_text('text', pmid)

class PMCRaw(Resource):
    def get(self, pmid):
        data = get_result('raw', pmid)
        return convert(data[0])



class PMCCleaned(Resource):
    def get(self, pmid):
        return {'pmid': pmid, 'type': 'CLEANED'}

api.add_resource(PMCText, '/text/<string:pmid>')
api.add_resource(PMCRaw, '/raw/<string:pmid>')
api.add_resource(PMCCleaned, '/cleaned/<string:pmid>')

from flask import render_template

@app.route('/inspect/<string:pmcid>')
def index(pmcid):
    return render_template('brat.html', pmcid=pmcid)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=11000)
