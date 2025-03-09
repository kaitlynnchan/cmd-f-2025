import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

# Sample training data
prompts = [
    "What is the capital of France?",
    "Explain the theory of relativity.",
    "How to bake a cake?",
    "Discuss the impact of climate change on polar bears.",
    "What is the date today?"
]
labels = ['SIMPLE', 'COMPLEX', 'SIMPLE', 'COMPLEX', 'SIMPLE']

# Create a pipeline with a TfidfVectorizer and a LogisticRegression classifier
model = make_pipeline(TfidfVectorizer(), LogisticRegression())

# Train the model
model.fit(prompts, labels)

# Save the model to a file
with open('classifier_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)