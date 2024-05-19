from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

sent_pipeline = pipeline("sentiment-analysis")
app = Flask(__name__)
CORS(app)

@app.route("/")
def Home():
     return "Welcome "

@app.route("/predict", methods =  ["GET", "POST"])
def predict():
    print("API has been hit")
    print(request)
    comment  = request.get_json()["comment"]
    analysis = sent_pipeline(comment)
    return jsonify(analysis)

if __name__ == "__main__":
    app.run(debug=True, port=8080)