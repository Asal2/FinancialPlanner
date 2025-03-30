# Need to: pip install flask flask-cors

from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Endpoint to write data to a file
@app.route('/write_file', methods=['POST'])
def write_file():
    data = request.json
    text = data.get('text', '')
    
    try:
        with open('output.txt', 'w') as f:
            f.write(text)
        return jsonify({"success": True, "message": "File written successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

if __name__ == '__main__':
    app.run(port=5000)  # Runs on http://localhost:5000
