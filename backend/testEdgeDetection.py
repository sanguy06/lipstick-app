from PIL import Image
import cv2 as cv2
from matplotlib import pyplot as plt
import numpy as np

# Open with Pillow
img_path = 'testImage.webp'
img_pil = Image.open(img_path)
img_pil.show()

# With Pillow Image Conv to NP arr
img_arr = np.array(img_pil)

# Open with CV2
img_cv2 = cv2.imread(img_path)

# Using CV2 Img Conv BGR -> HSV
img_hsv = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2HSV)
#print(f"hsv is {img_hsv}")
lower_bound1 = [0,255,255]
upper_bound2= [10,255,255]



'''
#---------------------Canny-Edge-Detection----------------------#
img = cv2.imread('testImage.webp', cv2.IMREAD_GRAYSCALE)
edges = cv2.Canny(img,100,200)

plt.subplot(121),plt.imshow(img,cmap = 'gray')
plt.title('Original Image'), plt.xticks([]), plt.yticks([])
plt.subplot(122),plt.imshow(edges,cmap = 'gray')
plt.title('Edge Image'), plt.xticks([]), plt.yticks([])

plt.show()'''



