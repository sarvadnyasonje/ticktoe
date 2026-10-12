import functions_framework
import random
from flask import jsonify


@functions_framework.http
def randomgen(request):
    random_num = random.randint(1, 100)
    output = {"random": random_num}
    return jsonify(output)
