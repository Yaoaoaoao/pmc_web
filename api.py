from flask import Flask, make_response
from flask_restful import Resource, Api
from flask import render_template
from rest import *

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # TODO: TEMP
app.config['RESTFUL_JSON'] = {
    'ensure_ascii': False
}
api = Api(app)


@app.route('/inspect/<db>/<collection>/<key>/<value>/')
def index(db, collection, key, value):
    return render_template('index.html',
                           db=db, collection=collection, key=key, value=value)


@app.route('/sec/<db>/<collection>/<pmcid>/')
def seclist(db, collection, pmcid):
    return render_template('seclist.html',
                           db=db, collection=collection, key='docId', value=pmcid,
                           data=get_sections(db, collection, pmcid))


api.add_resource(MongoJson, '/<db>/<collection>/<key>/<value>/', 
                            '/<db>/<collection>/<key>/<value>/<format>/')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=11000)
