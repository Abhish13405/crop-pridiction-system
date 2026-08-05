import sys
import os
import json
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

def predict_crop(image_path):
    if not os.path.exists(image_path):
        print(f"Error: Image path '{image_path}' not found.")
        return

    model_path = 'crop_recommendation_model.keras'
    indices_path = 'class_indices.json'

    if not os.path.exists(model_path) or not os.path.exists(indices_path):
        print("Error: Model or class_indices.json file missing. Please train the model first.")
        return

    # Load class mapping
    with open(indices_path, 'r') as f:
        class_indices = json.load(f)

    # Load model
    model = tf.keras.models.load_model(model_path)

    # Load & Preprocess image
    img = Image.open(image_path).convert('RGB')
    img_resized = img.resize((224, 224))
    img_arr = np.array(img_resized, dtype=np.float32)
    img_preprocessed = preprocess_input(img_arr)
    img_batch = np.expand_dims(img_preprocessed, axis=0)

    # Predict
    predictions = model.predict(img_batch, verbose=0)
    predicted_index = str(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0])) * 100
    predicted_crop = class_indices.get(predicted_index, "Unknown")

    print("\n--- Crop Prediction Result ---")
    print(f"Image:            {image_path}")
    print(f"Predicted Crop:   {predicted_crop}")
    print(f"Confidence Score: {confidence:.2f}%\n")

    # Top 3 predictions
    top3_indices = np.argsort(predictions[0])[-3:][::-1]
    print("Top 3 Likely Crops:")
    for idx in top3_indices:
        crop_name = class_indices.get(str(idx), "Unknown")
        prob = predictions[0][idx] * 100
        print(f" - {crop_name}: {prob:.2f}%")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        img_p = sys.argv[1]
    else:
        # Default test image if none provided
        img_p = r"Agricultural-crops\banana\image (10).jpg"
    
    predict_crop(img_p)
