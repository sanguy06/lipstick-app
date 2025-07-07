from PIL import Image
import cv2 as cv2
from matplotlib import pyplot as plt
import numpy as np

# Open with Pillow
#img_path = 'testImages/testImage3.jpg'
#img_pil = Image.open(img_path)

# With Pillow Image Conv to NP arr
#img_arr = np.array(img_pil)

# Open with CV2
#img_cv2 = cv2.imread(img_path)
#img_rgb = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB)
#cv2.imshow("Image Display", img_cv2)

#------------------Color-Segmentation-with-HSV-Color-Space---------------#
def colorSegmentation(img_cv2): 
    # Using CV2 Img Conv BGR -> HSV
    img_hsv = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2HSV)
    plt.figure()
    plt.imshow(img_cv2)
    plt.show()
    lowerBound1 = np.array([0, 80, 70])
    upperBound1 = np.array([10,255,255])
    lowerBound2 = np.array([150, 80, 70])
    upperBound2 = np.array([180,255,255])
    mask1 = cv2.inRange(img_hsv, lowerBound1, upperBound1)
    mask2 = cv2.inRange(img_hsv, lowerBound2, upperBound2)
    mask = cv2.bitwise_or(mask1,mask2)

    cv2.imshow('mask', mask)
    cv2.waitKey(0)
    
    # Finding Contours 
    contours,_  = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    # Outlines contours on CV2 Img with Green 
    filled_mask = np.zeros_like(mask)
    cv2.drawContours(filled_mask, contours, -1, 255, 3)
      
    # keeps parts of the og image where the mask(binary image) is white
    masked_bgr = cv2.bitwise_and(img_cv2, img_cv2, mask=mask)
    cv2.imshow('masked_bgr', masked_bgr)
    cv2.waitKey(0)
    
    # Get pixels in BGR where the mask is white
    pixels = img_cv2[mask == 255]

    # Conv to RGB and find Median
    pixels_rgb = pixels[:, ::-1]
    avg_rgb = np.mean(pixels_rgb, axis=0).astype(int)
    avg_bgr = np.mean(pixels, axis=0).astype(int)
    print("Average RGB:", avg_rgb)
    print("Average BGR: ", avg_bgr)
    return avg_bgr

# Run 
colorSegmentation()



