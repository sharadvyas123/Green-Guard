
# 🌿 GreenGuard

GreenGuard is an AI-powered environmental monitoring platform that utilizes satellite imagery and machine learning to detect urban tree loss, encourage reforestation efforts, and promote environmental awareness. Built with a modern tech stack combining React (Vite) on the frontend and Python (Django REST) on the backend, this app provides visual heatmaps and actionable insights based on real-time satellite data.

---

## 📁 Project Structure

```
GreenGuard/
│
├── frontend/       # React + Vite frontend
└── backend/        # Python backend (Django REST)
```

---

## 🚀 Frontend Setup (React + Vite)

### ⚙️ Technologies Used

- React
- Vite
- Axios
- Framer Motion
- Tailwind CSS

### 📦 Installation Steps

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The app should now be running at:  
   [http://localhost:5173](http://localhost:5173)

---

## 🧠 Backend Setup (Django + ML Model)

### ⚙️ Python Version

> ⚠️ **Python 3.9.13 is required**. Make sure you're using this version.

### 📦 Libraries Used

- Django
- Django REST Framework
- django-cors-headers
- djangorestframework-simplejwt
- Pillow
- NumPy
- TensorFlow
- Sentinelhub
- Requests (if fetching external data)
- Other ML or image-processing related libraries

### 🐍 Setting Up Virtual Environment

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   **(Linux/macOS)**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
   **(Windows)**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Upgrade pip:
   ```bash
   pip install --upgrade pip
   ```

4. Install all required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the backend server:
   ```bash
   python manage.py runserver
   ```

6. The backend will be available at:  
   [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📡 API Overview

- `POST /api/predict/get-satellite/` – Fetches satellite image from Sentinel Hub
- `POST /api/predict/predict-image/` – Returns prediction heatmap from uploaded image

---

## 📂 Environment Variables

Make sure to set the necessary environment variables (e.g., Sentinel Hub credentials, secret key, allowed hosts, etc.) in a `.env` file or in Django settings.

---

## 📸 ML Model Integration

The model (`.h5` file) is integrated into the backend and used during the `/predict-image` endpoint to generate heatmaps from satellite images.
