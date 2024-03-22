from flask import Flask, request, jsonify
from transformers import pipeline

sent_pipeline = pipeline("sentiment-analysis")
app = Flask(__name__)

@app.route("/")
def Home():
     return "Welcome "

@app.route("/predict", methods =  ["GET"])
def predict():
    comment  = request.get_json()["comment"]
    analysis = sent_pipeline(comment)
    return jsonify(analysis)

if __name__ == "__main__":
    app.run(debug=True)