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
from rembg import remove
import os
import time
load_dotenv()
host = os.getenv("HOST")

user_id = sys.argv[1]
user_img = sys.argv[2]
product_img = sys.argv[3]
access_token = sys.argv[4]

def openUserImage(): 
    try:     
        presignedURL = requests.get(f"{host}/users/create-get-url", 
            params= {"image_url": user_img},  
            headers= {"Authorization": f"{access_token}"}   
            )       
        res = requests.get(presignedURL.text) 
        print(res.status_code)  
        img_data = BytesIO(res.content)
        '''
        img_bytes = np.asarray(bytearray(img_data.read()), dtype=np.uint8)
        img_cv2 = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
        print(img_cv2.shape)
        '''
        img = Image.open(img_data)
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
        img_data = BytesIO(res.content)

        # Convert binary data to numpy array for cv2 to read
        img_bytes = np.asarray(bytearray(img_data.read()), dtype=np.uint8)
        print(f"np arr: {img_bytes}")
        print(f"max num: {img_bytes.max()}")

        # Decode to Open CV2 Img 
        img_cv2 = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
       
        # Input and Output with PIL and Remove Background of Lipstick Product
        img_pil = Image.open(img_data)   
        img_pil.thumbnail((512,512))
        start = time.time()
        output = remove(img_pil)
        output.show()
        end = time.time()
        print(f"Time: {end-start: .2f} seconds")

        # Use Output to Find Median Color



        '''
        # Display MPL Img with PIL image           
        fig, ax = plt.subplots(figsize=(10,10))     
        ax.imshow(img_pil)
        plt.show()

       # Display CV2 img with BGR2RGB conv
        img_cv2_rgb = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB)
        fig, ax = plt.subplots()
        ax.imshow(img_cv2_rgb)
        plt.show()
        
        # Display RGB Channels of our image
        fig, axs = plt.subplots(1, 3, figsize=(15,5))
        axs[0].imshow(img_pil[:,:,0], cmap="Reds")
        axs[1].imshow(img_pil[:,:,1], cmap="Greens")
        axs[0].imshow(img_pil[:,:,0], cmap="Reds")'''

    except exception as e:     
        print(f"Error: {e}") 

# Open Images
openUserImage()
openProdImage()




