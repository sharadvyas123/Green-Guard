import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import os

# ✅ Load model once globally
MODEL_PATH = os.path.join('models', 'model.h5')
model = load_model(MODEL_PATH, compile=False)

# ✅ Correct input size
IMG_SIZE = (256, 256)  # Make sure this matches your model
NUM_CLASSES = 5        # Adjust if your model has a different number

# 🎨 Define colormap for classes
COLORMAP = {
    0: (0, 0, 0),         # Black
    1: (255, 0, 0),       # Red
    2: (0, 255, 0),       # Green
    3: (0, 0, 255),       # Blue
    4: (255, 255, 0),     # Yellow
}

def predict_heatmap(pil_image: Image.Image) -> Image.Image:
    # ✅ Resize and normalize
    img = pil_image.resize(IMG_SIZE).convert("RGB")
    arr = np.array(img) / 255.0
    arr = np.expand_dims(arr, axis=0)  # Shape: (1, 256, 256, 3)

    # 🔮 Predict
    pred = model.predict(arr)[0]  # Shape: (256, 256, num_classes)

    # 🎯 Argmax to get class map
    class_map = np.argmax(pred, axis=-1)  # Shape: (256, 256)

    # 🎨 Create RGB heatmap
    heatmap = np.zeros((*class_map.shape, 3), dtype=np.uint8)
    for cls, color in COLORMAP.items():
        heatmap[class_map == cls] = color

    return Image.fromarray(heatmap)
