import requests

coinbase_id = {
    'btc': 'BTC-USD',
    'eth': 'ETH-USD'
}

crypto_id = {
    'btc': 'BTC_USDT',
    'eth': 'ETH_USDT'
}

def u_coinbase(c_id):
    buy = requests.get('https://api.coinbase.com/v2/prices/{id}/buy'.format(id = coinbase_id[c_id]))
    sell = requests.get('https://api.coinbase.com/v2/prices/{id}/sell'.format(id = coinbase_id[c_id]))
    coinbase_curr = {
        'buy': float(buy.json()['data']['amount']),
        'sell': float(sell.json()['data']['amount']),
        'id': buy.json()['data']['base']
    }
    return coinbase_curr

def u_crypto(c_id):
    r = requests.get('https://api.crypto.com/v2/public/get-ticker?instrument_name={id}'.format(id = crypto_id[c_id]))
    crypto_curr = {
        'buy': float(r.json()['result']['data']['b']),
        'sell': float(r.json()['result']['data']['k']),
        'id': r.json()['result']['data']['i']
    }
    return crypto_curr