from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app) # Allows Node.js to communicate without errors
model = joblib.load('sensor_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Extract the 4 parameters from Node.js request
    inputs = np.array([[
        float(data['soilMoisture']), 
        float(data['soilTemp']), 
        float(data['humidity']), 
        float(data['airTemp'])
    ]])
    
    prediction = model.predict(inputs)[0]
    
    # Map numbers to the labels you want for the presentation
    results = {
        0: {"status": "Healthy", "advice": "Eligible for MSP (Minimum Support Price)", "color": "#22c55e"},
        1: {"status": "Fair", "advice": "Monitor closely. Check Kharif/Rabi cycle.", "color": "#eab308"},
        2: {"status": "Unhealthy", "advice": "High Risk! Claim PMFBY Insurance immediately.", "color": "#ef4444"}
    }
    
    return jsonify(results[prediction])

if __name__ == '__main__':
    app.run(port=5001) # Runs on a different port than Node.js