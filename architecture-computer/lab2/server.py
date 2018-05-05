from flask import Flask
from flask import jsonify
from db import get

app = Flask(__name__)

@app.route("/api")
def api():
  result = []
  for comment in get():
    result.append({'author': comment['author'], 'text': comment['text']})

  return jsonify(result)
