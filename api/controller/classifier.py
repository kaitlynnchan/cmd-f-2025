import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Retrieve the Gemini API key from environment variables
api_key = os.getenv('GEMINI_API_KEY')

# Configure the API with the loaded API key
genai.configure(api_key=api_key)

# Use the Gemini 2.0 Flash model
model = genai.GenerativeModel('models/gemini-2.0-flash')  

def analyze_prompt_complexity(prompt_text):
    """
    Analyzes if a prompt is simple (better for Google) or complex (better for ChatGPT)
    Returns: dictionary with classification and confidence
    """
    system_prompt = """
    You are a prompt complexity analyzer. Determine if the provided query is:
    1. SIMPLE: Better suited for a Google search (factual, direct questions, simple lookups)
    2. COMPLEX: Better suited for ChatGPT (requires reasoning, creativity, opinions, multi-step thinking)

    Respond with a JSON object with:
    - "classification": either "SIMPLE" or "COMPLEX"
    If the classification is "SIMPLE", also include the following field:
    - "google_search_url": a URL for performing a Google search for the query (e.g., "https://www.google.com/search?q=query_text")
    """
    
    # Generate content with the system prompt and the user's query
    response = model.generate_content(
        f"{system_prompt}\n\nAnalyze this query: '{prompt_text}'",
        generation_config={"temperature": 0.1}
    )
    
    # Return the generated response text
    return response.text
