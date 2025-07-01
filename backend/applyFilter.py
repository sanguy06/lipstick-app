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

load_dotenv()
host = os.getenv("HOST")

user_id = sys.argv[1]
user_img = sys.argv[2]
product_img = sys.argv[3]
access_token = sys.argv[4]
print(product_img)
def openUserImage(): 
    try:     
        presignedURL = requests.get(f"{host}/users/create-get-url", 
            params= {"image_url": user_img},  
            headers= {"Authorization": f"{access_token}"}   
            )       
        res = requests.get(presignedURL.text) 
        print(res.status_code)  
        image_data = BytesIO(res.content)
        img = Image.open(image_data)
        img.show() 
    except exception as e:     
        print(f"Error: {e}")
    

def openProdImage(): 
    try:     
        presignedURL = requests.get(f"{host}/users/create-get-url", 
            params= {"image_url": product_img},  
            headers= {"Authorization": f"{access_token}"}   
            )       
        res = requests.get(presignedURL.text) 
        print(res.status_code)  
        image_data = BytesIO(res.content)
        img = Image.open(image_data)
        img.show() 
    except exception as e:     
        print(f"Error: {e}") 

# Open Images
openUserImage()
openProdImage()




