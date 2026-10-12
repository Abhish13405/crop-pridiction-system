# 🌱 FasalMitra (AgriVision AI) — Smart Crop Prediction & Agronomic Intelligence System

An end-to-end Computer Vision & Agronomic Decision Support System engineered for farmers and agricultural researchers. Built with **MobileNetV2 Transfer Learning** (trained on 4,145+ Big Data samples) and **Scikit-Learn Random Forest ML** (99.55% Accuracy on Kaggle benchmark data), served through **Django REST Framework** and a modern **React (Vite) Dashboard**.

---

## 👥 Project Team & Contributors
1. **Abhishek Kushwaha** — *Team Lead & Machine Learning Architect*
   - MobileNetV2 Deep CNN Architecture, Transfer Learning & Optimization
2. **Jaya Maurya** — *Data Scientist & Dataset Engineering*
   - 30-Class Agricultural Dataset Cleansing, Augmentation & Stratified Validation
3. **Aman Gupta** — *Full Stack & Backend Systems*
   - Django REST Framework APIs, Model Serving, Session Authentication & Data Pipeline
4. **Mriganka Singh** — *Frontend UI/UX & System Design*
   - Glassmorphic UI Dashboard, Interactive 5-Stage AI Roadmap & Agronomic Calculators

---

## 🚀 Core Farmer Features

| # | Feature Module | Technology | Farmer Benefit |
| :---: | :--- | :--- | :--- |
| **1** | **Crop Image AI Classifier** | Deep CNN (`MobileNetV2`) | Upload crop/leaf photo to get instant variety identification & confidence breakdown |
| **2** | **Soil & Climate Recommender** | Random Forest ML (`99.55% Acc`) | Input N-P-K, pH, Rainfall to get best crops + exact Urea, DAP & Potash bag calculation |
| **3** | **Live Mandi Bhav (बाज़ार दरें)** | Real Market Engine | State, District & Mandi-wise live commodity rates (₹/Qtl) + Kisan Revenue Estimator |
| **4** | **Pest Defense & Fertilizer Guide** | Agronomic Knowledge Base | Critical threat pests, biological/organic cures (Neem oil, Trichoderma), & NPK schedule |
| **5** | **Soil Health Card & History** | Django ORM + SQLite | Complete history of soil tests, farm profiles & agronomic recommendations |

---

## 📊 Models & Performance Metrics

### 1. Deep Learning CNN Vision Model (`MobileNetV2`)
- **Model File**: `crop_model_large_v2.keras`
- **Class Mapping**: `class_indices_large.json` (30 Agricultural Classes)
- **Top-3 Categorical Accuracy**: **92.07%**

### 2. Soil-to-Crop Machine Learning Model (`Random Forest`)
- **Model File**: `soil_crop_rf_model.pkl`
- **Dataset**: `Crop_recommendation.csv` (2,200 Benchmark Kaggle Samples)
- **Test Accuracy**: **99.55%**
- **Parameters**: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, Soil pH, Rainfall

---

## 🛠️ How to Run Locally

### 1. Backend (Django REST API)
```powershell
# Activate Virtual Environment
.\venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt

# Run Django Backend Server (Port 8000)
cd backend
python manage.py migrate
python manage.py runserver 8000
```
Backend will run at: 👉 **`http://127.0.0.1:8000`**

### 2. Frontend (React + Vite)
```powershell
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Vite Development Server (Port 5173)
npm run dev
```
Frontend will run at: 👉 **`http://localhost:5173`**

---

## 📂 Project Directory Structure

```text
crop-pridiction-system/
├── backend/                        # Django REST API Backend
│   ├── api/                        # Views, Models, Serializers, URLs
│   │   ├── views.py                # ML Model Serving & Mandi Bhav Views
│   │   ├── models.py               # Farm & CropRecommendationRecord ORM
│   │   └── urls.py                 # RESTful Endpoints
│   ├── fasalmitra/                 # Django Settings & WSGI/ASGI
│   └── manage.py                   # Django CLI
├── frontend/                       # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── pages/                  # MandiBhavPage, CropRecommendationPage, etc.
│   │   ├── components/             # Sidebar, Navbar, DashboardLayout
│   │   └── context/                # AuthContext (Hindi / English support)
│   ├── package.json
│   └── vite.config.js              # Proxy to Django on Port 8000
├── crop_model_large_v2.keras       # Trained MobileNetV2 CNN Vision Model
├── soil_crop_rf_model.pkl          # Trained Random Forest Soil Recommender
├── class_indices_large.json        # 30 Crop Class Labels Map
├── crop_knowledge.py               # Agronomic Knowledge Base & Fertilizers
├── Crop_recommendation.csv         # Soil Benchmark Dataset
├── requirements.txt                # Python Dependencies
└── README.md
```
