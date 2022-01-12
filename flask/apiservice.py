# Activate Virtual Env --> venv\Scripts\activate
# set FLASK_APP=apiservice
# set FLASK_ENV=development

from flask import Flask, request
from RandomMutation import RandomMutation, Cost_Factory

import requests

app = Flask(__name__)

@app.route('/evolutive', methods=['POST'])
def solveWithMutation():
    request_data = request.get_json()
    
    values = request_data['values']

    if 'cost' in request_data:
        cost = request_data['cost']
    else:
        cost = 'greedy'
    
    if 'target' in request_data:
        target = request_data['target']
    else:
        target = None

    if 'epochs' in request_data:
        epochs = request_data['epochs']
    else:
        epochs = 100

    if 'pop' in request_data:
        pop = request_data['pop']
    else:
        pop = 10
    
    solution = RandomMutation().fit(values,Cost_Factory().createCost(cost, values=values, target=target), epochs=epochs, pop=pop)

    return {'solution': solution, 'cost':cost, 'target':target, 'epochs':epochs, 'pop':pop}

# @app.route('/example2')
# def another():
#     r = requests.post('http://localhost:5000', json={"values":[5,6]})
#     result = r.content.decode('utf-8')
#     return f'Hello {result}'