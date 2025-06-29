# Import Dependencies
import sys
import os 
import httpx
from dotenv import load_dotenv

load_dotenv()

'''
image_uri = sys.argv[1]
brand_name = sys.argv[2]
product_name = sys.argv[3]
shade_name = sys.argv[4]
product_query = brand_name + " " + product_name + " " + shade_name
'''
product_query = "Revlon Lustrous 007"        
def google_search(api_key, search_engine_id, query, **params):
    base_url = 'https://www.googleapis.com/customsearch/v1'
    params = {
        'key': api_key, 
        'searchType': 'image',
        'cx': search_engine_id,
        'q': query + "site: sephora.com ", 
        'num': 5
    }
    
    res = httpx.get(base_url, params=params)
    res.raise_for_status()
    return res.json()

search_results = []

res = google_search(
    api_key=os.getenv('GOOGLE_API_KEY'), 
    search_engine_id=os.getenv('SEARCH_ENGINE_ID'), 
    query=product_query, 
    start=1)

image_urls = [item["link"] for item in res.get("items", [])]
print(image_urls)