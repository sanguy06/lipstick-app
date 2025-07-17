import mediapipe as mp
import cv2 as cv2
import numpy as np
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from typing import Tuple, Union
import base64
import math

# Lip Edges Landmarks
lipsOuter = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
              308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 185,
              40, 39, 37, 0, 267, 269, 270, 409, 415, 310, 311, 312]
lipsInner =  [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308,
              291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61]

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_face_mesh = mp.solutions.face_mesh

# File Paths
model_path = 'assets/blaze_face_short_range.tflite'
image_path = 'testImages/face2.jpg'
image = mp.Image.create_from_file(image_path)
drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)



def applyLipstick(bgr_vals, img_cv2): 
  
  color = tuple(int(c) for c in bgr_vals)
  print("Color values in tuple ", color)
  with mp_face_mesh.FaceMesh(
      static_image_mode=True,
      max_num_faces=1,
      refine_landmarks=True,
      min_detection_confidence=0.5) as face_mesh:
      image = img_cv2

      # Convert the BGR image to RGB before processing.
      results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
      annotated_image = image.copy()
      if results.multi_face_landmarks:
        h, w, _ = annotated_image.shape
        for face_landmarks in results.multi_face_landmarks:
          outer = np.array([[int(face_landmarks.landmark[i].x * w),
                            int(face_landmarks.landmark[i].y * h)] for i in lipsOuter], np.int32)
          outer = outer.reshape((-1, 1, 2))
          inner = np.array([[int(face_landmarks.landmark[i].x * w),
                            int(face_landmarks.landmark[i].y * h)] for i in lipsInner], np.int32)
          inner = inner.reshape((-1, 1, 2))
          overlay = image.copy()
          cv2.fillPoly(overlay, [outer], color=color)  # BGR format     
          alpha = 0.3
          image = cv2.addWeighted(overlay, alpha, image, 1 - alpha, 0)

  # Display Image
  #resized_img = cv2.resize(image, (300,600))
  #cv2.imshow("Lips", resized_img)

  #cv2.waitKey(0)


 
  #return resized_img
  return image
