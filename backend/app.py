from flask_cors import CORS
from flask import Flask,request, jsonify
from translation_routes import text_and_voice_translation_routes
from functions import load_model, log_decorator, logger
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Audio and Text Translation Api!"

@app.route('/prepare_model', methods=['POST'])
@log_decorator
def prepare_whisper_model():
    data = request.form
    model_name = data.get('model', 'small')
    try:
        load_model(model_name)
        logger.info(f"Model '{model_name}' loaded successfully and ready for use.")
        return jsonify({"message": f"Model loaded successfully and ready for use."}), 200
    except Exception as e:
        logger.error(f"Failed to load model '{model_name}': {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500
    
text_and_voice_translation_routes(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)