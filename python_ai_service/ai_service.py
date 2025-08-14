# pip install fastapi uvicorn python-multipart numpy
from fastapi import FastAPI, UploadFile, File
import face_recognition
import numpy as np
import os
import io

app = FastAPI()

# --- (The same face encoding logic from before) ---
KNOWN_FACES_DIR = 'known_faces'
known_faces_encodings = []
known_faces_names = []

def load_known_faces():
    print("Loading known faces...")
    for name in os.listdir(KNOWN_FACES_DIR):
        person_dir = os.path.join(KNOWN_FACES_DIR, name)
        if not os.path.isdir(person_dir): continue
        for filename in os.listdir(person_dir):
            image_path = os.path.join(person_dir, filename)
            image = face_recognition.load_image_file(image_path)
            encodings = face_recognition.face_encodings(image)
            if encodings:
                known_faces_encodings.append(encodings[0])
                known_faces_names.append(name)
    print(f"Loaded {len(known_faces_names)} known faces.")

# Load faces when the server starts
load_known_faces()

@app.post("/recognize")
async def recognize_face(file: UploadFile = File(...)):
    """
    Receives an image file, and returns the name of the person recognized.
    """
    # Read image content from the upload
    image_stream = await file.read()
    image = face_recognition.load_image_file(io.BytesIO(image_stream))

    # Find face locations and encodings
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    recognized_names = []
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_faces_encodings, face_encoding)
        name = "Unknown"

        face_distances = face_recognition.face_distance(known_faces_encodings, face_encoding)
        if len(face_distances) > 0:
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_faces_names[best_match_index]
        
        recognized_names.append(name)

    return {"recognized_names": recognized_names}

# To run this: uvicorn ai_service:app --reload