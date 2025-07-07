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
        applyLipstick(bgr_vals, img_cv2)

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
        
    except exception as e:     
        print(f"Error: {e}") 

# Open Images
print("reached file")
openProdImage()
#openUserImage()




