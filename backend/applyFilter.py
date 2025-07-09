import sys 
import requests
import exception
from io import BytesIO
from PIL import Image
import cv2 as cv2
import pandas as pd
import numpy as np 
import matplotlib.pylab as plt
from dotenv import load_dotenv
import os
import uuid
from extractBGR import colorSegmentation
from lipDetection import applyLipstick

load_dotenv()
host = os.getenv("HOST")

# Grabbing variables from axios request handling in server file
user_id = sys.argv[1]
user_img = sys.argv[2]
product_img = sys.argv[3]
access_token = sys.argv[4]
bgr_vals = []
#finished_img = None
img_mimetype = ".jpg"

def openUserImage(bgr_vals): 
    try:     
        presignedURL = requests.get(f"{host}/users/create-get-url", 
            params= {"image_url": user_img},  
            headers= {"Authorization": f"{access_token}"}   
            )       
        res = requests.get(presignedURL.text) 
        print(res.status_code)  
        # convert to bytes data 
        img_data = BytesIO(res.content)

        # convert to np array
        img_bytes = np.asarray(bytearray(img_data.read()), dtype=np.uint8)

        # decode with cv2 now usable by cv2 library
        img_cv2 = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)   
        # CV2 Img is in NP array format --> needs to be converted as a uri to send back to s3
        finished_img = applyLipstick(bgr_vals, img_cv2)
        sendImage(finished_img)

    except exception as e:     
        print(f"Error: {e}")

def openProdImage(): 
    try:     
        print("reached python")
        presignedURL = requests.get(f"{host}/users/create-get-url", 
            params= {"image_url": product_img},  
            headers= {"Authorization": f"{access_token}"}   
            )       
        res = requests.get(presignedURL.text) 
        print(res.status_code)  
        img_data = BytesIO(res.content)

        # Convert binary data to numpy array for cv2 to read
        img_bytes = np.asarray(bytearray(img_data.read()), dtype=np.uint8)

        # Decode to Open CV2 Img 
        img_cv2 = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
        bgr_vals = colorSegmentation(img_cv2)
        openUserImage(bgr_vals)
        
    except exception as e:     
        print(f"Error: {e}") 

# Send image to S3 and Frontend
def sendImage(finished_img):
    image_id = str(uuid.uuid4())
    try:   

        # Convert CV2 Img (NP Array) --> Byte Data  
        success, encoded_img  = cv2.imencode('.jpg', finished_img)
        if not success:
            raise ValueError("Failed to encode image")
        img_bytes = BytesIO(encoded_img.tobytes())

        # Generate Put URL 
        presignedURL = requests.get(f"{host}/users/upload-processed-image", 
            params = {"image_id" : image_id, "mimetype": img_mimetype }, 
            headers = {"Authorization": f"{access_token}"}
        ) 

        # Upload to S3 
        requests.put(presignedURL.text, 
            data=img_bytes, 
            headers={'Content-Type': f"image/{img_mimetype}"}
        )
        print("image id at applyfilter ",  image_id)
        # Add Image ID to Postgres DB
        response = requests.post(f"{host}/users/add-processed-image", 
                     json = {"image_id": image_id}, 
                     headers = {"Authorization": f"{access_token}"}
                     )
        print("Adding image to database", response.status_code)
        print(response.text)
    except exception as e:     
        print(f"Error: {e}")    


# Open Images
#print("reached file")
openProdImage()
#openUserImage()




