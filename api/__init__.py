from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Sample route
    @app.route('/')
    def hello():
        return {'message': 'API is running'}

    @app.route('/analyze', methods=['GET'])
    def analyze(prompt: str):
        return {'message': 'Analyze'}

    return app

# Create the application instance
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)