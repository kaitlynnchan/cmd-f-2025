import os
import pickle
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Load the pre-trained machine learning model
with open('classifier_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

def analyze_prompt_complexity(prompt_text):
    """
    Analyzes if a prompt is simple (better for Google) or complex (better for ChatGPT)
    Returns: dictionary with classification and confidence
    """
    # Predict the classification using the machine learning model
    classification = model.predict([prompt_text])[0]

    if classification == 'SIMPLE':
        # Scrape the web for resources
        google_search_url = f"https://www.google.com/search?q={prompt_text}"
        # search_url = f"https://www.google.com/search?q={prompt_text}"
        # response = requests.get(search_url)
        # soup = BeautifulSoup(response.text, 'html.parser')
        # print(soup)

        # Extract the first search result URL
        # first_result = soup.find('a')
        # if first_result and 'href' in first_result.attrs:
        #     print(first_result)
        #     google_search_url = first_result['href']
        # else:
        #     google_search_url = search_url

        return {
            'classification': 'SIMPLE',
            'google_search_url': google_search_url
        }
    else:
        return {
            'classification': 'COMPLEX'
        }