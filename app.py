import os
import json
import numpy as np
from PIL import Image
from flask import Flask, render_template, request, jsonify
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)

# Paths
MODEL_PATH = 'crop_recommendation_model.keras'
CLASS_INDICES_PATH = 'class_indices.json'
UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Global variables for model and class labels
model = None
class_indices = {}

def load_ml_model():
    global model, class_indices
    if os.path.exists(MODEL_PATH) and os.path.exists(CLASS_INDICES_PATH):
        print("Loading MobileNetV2 crop prediction model...")
        model = tf.keras.models.load_model(MODEL_PATH)
        with open(CLASS_INDICES_PATH, 'r') as f:
            class_indices = json.load(f)
        print(f"Model loaded successfully! Total classes: {len(class_indices)}")
    else:
        print("Warning: Model or class_indices.json missing! Please run train_model.py first.")

# Load model when starting Flask
load_ml_model()

@app.route('/')
def index():
    return render_template('index.html', total_crops=len(class_indices))

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'success': False, 'error': 'Model not loaded. Please train model first.'}), 500

    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'No image file uploaded.'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No file selected.'}), 400

    try:
        # Save temporary uploaded file
        filename = file.filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Preprocess Image
        img = Image.open(filepath).convert('RGB')
        img_resized = img.resize((224, 224))
        img_arr = np.array(img_resized, dtype=np.float32)
        img_preprocessed = preprocess_input(img_arr)
        img_batch = np.expand_dims(img_preprocessed, axis=0)

        # Predict
        predictions = model.predict(img_batch, verbose=0)[0]
        predicted_idx = int(np.argmax(predictions))
        confidence = float(predictions[predicted_idx]) * 100
        predicted_crop = class_indices.get(str(predicted_idx), "Unknown")

        # Top 3 predictions
        top3_indices = np.argsort(predictions)[-3:][::-1]
        top3_results = []
        for idx in top3_indices:
            name = class_indices.get(str(idx), "Unknown")
            score = round(float(predictions[idx]) * 100, 2)
            top3_results.append({'crop': name, 'confidence': score})

        return jsonify({
            'success': True,
            'image_url': f'/static/uploads/{filename}',
            'predicted_crop': predicted_crop,
            'confidence': round(confidence, 2),
            'top3': top3_results
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask Crop Prediction Web Server on http://127.0.0.1:5000 ...")
    app.run(debug=True, host='127.0.0.1', port=5000)
