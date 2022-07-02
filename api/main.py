from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load model for prediction
MODEL = tf.keras.models.load_model("../Models/1")
class_names = ['Early Blight', 'Late Blight', 'Healthy']


@app.get("/ping")
async def ping():
    return "I'm alive"


def read_file_from_image(data):
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_from_image(await file.read())
    # print(image)
    img_batch = np.expand_dims(image, 0)
    prediction = MODEL.predict(img_batch)
    # print(prediction.shape)
    # print(prediction[0])
    index = np.argmax(prediction[0])
    confidence = np.max(prediction[0])
    # return f"Type is {class_names[index], confidante}"
    return {
        'class' : class_names[index],
        'confidence' : float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
