from flask import Flask, jsonify

from .utilities import *


app = Flask(__name__)

#**************************
#
# Helper Functions
#
#**************************

def returnResponse(res):
    response = jsonify(res)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


#**************************
#
# API Calls
#
#**************************

@app.route('/', methods=['GET'])
def index():
    res = { 'data': { 'test': 'works' } }
    return res, 200


@app.route('/coinbase/<c_id>', methods=['GET'])
def coinbase(c_id):
    return returnResponse(u_coinbase(c_id))


@app.route('/crypto/<c_id>', methods=['GET'])
def crypto(c_id):
    return returnResponse(u_crypto(c_id))


@app.route('/compare/<c_id>', methods=['GET'])
def compare_currencies(c_id):
    coinbase = u_coinbase(c_id)
    crypto = u_crypto(c_id)

    res = {
        'coinbase': coinbase,
        'crypto': crypto
    }

    res['buy'] = 'Coinbase' if coinbase['buy'] < crypto['buy'] else 'Crypto.com'
    res['sell'] = 'Coinbase' if coinbase['sell'] > crypto['sell'] else 'Crypto.com'

    return returnResponse(res)


if __name__ == '__main__':
    app.run(debug=True)