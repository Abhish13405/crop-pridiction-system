#  AgriVision AI - Smart Crop Prediction System

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.18.0-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1.3-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Architecture](https://img.shields.io/badge/Model-MobileNetV2-10B981?style=for-the-badge)](https://keras.io/api/applications/mobilenet/)

AgriVision AI is an intelligent deep learning-based crop and plant identification system built with **MobileNetV2 Transfer Learning**, **TensorFlow**, and a modern **Flask Web Application**. It allows farmers, researchers, and agriculture enthusiasts to upload leaf/crop photos and instantly identify the crop species with high confidence scores and top-3 probability breakdowns.

---

##  Key Features

-  **30 Supported Crops & Fruits**: Classifies 30 different agricultural crops, fruits, grains, pulses, and spices.
-  **MobileNetV2 Transfer Learning**: Pre-trained ImageNet backbone fine-tuned for high feature extraction performance.
-  **Modern Glassmorphic Web UI**: Drag-and-drop image upload zone with real-time preview, smooth CSS animations, and dark emerald forest aesthetics.
-  **Top-3 Probability Breakdown**: Displays AI confidence scores with visual progress bars.
-  **Complete Pipeline Tools**:
  - `train_model.py`: Automated 2-phase training & fine-tuning script with stratified splits and data augmentation.
  - `predict.py`: Instant CLI tool for single-image prediction testing.
  - `app.py`: Flask REST API backend for web integration.

---

## Supported Crops (30 Classes)

| Fruits & Vegetables | Grains & Cereals | Pulses & Legumes | Spices & Plantation |
| :--- | :--- | :--- | :--- |
| Almond, Banana | Rice, Wheat | Gram (Chana) | Cardamom (Elaichi) |
| Cherry, Lemon | Maize (Makka) | Vigna Radiata (Moong) | Clove (Laung) |
| Papaya, Pineapple | Jowar | Soyabean | Chilli, Mustard Oil |
| Cucumber, Tomato | Pearl Millet (Bajra) | - | Fox Nut (Makhana), Coconut |
| Sunflower | - | - | Cotton, Sugarcane, Tea, Coffee, Tobacco, Olive, Jute |

---

##  Project Structure

```text
crop-pridiction-system/
├── Agricultural-crops/         # Dataset directory containing 30 crop subfolders
├── static/
│   ├── css/
│   │   └── style.css          # Glassmorphism UI Stylesheet
│   ├── js/
│   │   └── main.js           # AJAX & Interactive JS Logic
│   └── uploads/               # Temporary uploaded images for analysis
├── templates/
│   └── index.html             # Main Web Dashboard Template
├── ap.ipynb                    # Jupyter Notebook training pipeline
├── app.py                      # Flask Web Server & API backend
├── train_model.py              # Model training script
├── predict.py                  # CLI single image prediction tester
├── class_indices.json          # Crop label index mapping file
├── crop_recommendation_model.keras  # Trained MobileNetV2 model weights
├── requirements.txt            # Python dependencies for deployment
└── README.md                   # Project documentation
```

---

##  Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Abhish13405/crop-pridiction-system.git
cd crop-pridiction-system
```

### 2. Set Up Virtual Environment
```bash
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## Running the Application

### Option A: Start the Flask Web App
```bash
python app.py
```
Open your browser and visit: **`http://127.0.0.1:5000`**

### Option B: Test Prediction via Command Line
```bash
python predict.py "Agricultural-crops/banana/image (10).jpg"
```

### Option C: Train the Model from Scratch
```bash
python train_model.py
```

---

## 🔌 API Endpoint Documentation

### Predict Crop Endpoint
- **URL**: `/predict`
- **Method**: `POST`
- **Payload**: `multipart/form-data` with key `file` (image file)

#### Sample JSON Response:
```json
{
  "success": true,
  "predicted_crop": "banana",
  "confidence": 99.15,
  "top3": [
    { "crop": "banana", "confidence": 99.15 },
    { "crop": "maize", "confidence": 0.45 },
    { "crop": "jowar", "confidence": 0.25 }
  ],
  "image_url": "/static/uploads/sample.jpg"
}
```

---

## Model Training Specifications

- **Base Architecture**: MobileNetV2 (`include_top=False`, ImageNet weights)
- **Input Shape**: `(224, 224, 3)`
- **Preprocessing**: `tf.keras.applications.mobilenet_v2.preprocess_input` (scaling to `[-1, 1]`)
- **Phase 1 Training**: Frozen base model, Adam LR `1e-3` (20 Epochs)
- **Phase 2 Fine-Tuning**: Unfrozen top 30 layers, Adam LR `1e-5` (15 Epochs)
- **Callbacks**: `ModelCheckpoint`, `EarlyStopping`, `ReduceLROnPlateau`

---

##  Author & Credits

Developed with abhishek for Smart Agriculture applications.
- **GitHub**: [@Abhish13405](https://github.com/Abhish13405)
