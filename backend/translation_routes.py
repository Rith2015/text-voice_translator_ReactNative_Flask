from flask import request, jsonify
from lang_codes import reverse_lang_codes
from googletrans import Translator
import tempfile
from functions import load_model
from functions import log_decorator, logger
translator = Translator()

def text_and_voice_translation_routes(app):
    # A route for text translation
    @app.route('/text_translate', methods=['POST'])
    @log_decorator
    def text_translate():
        target_lang = request.json.get("target_lang", "en") # default: English
        chosen_lang = request.json.get("chosen_lang", "detect") # default: detect
        original_text = request.json.get("text")
        if not original_text:
            logger.warning("No text provided")
            return jsonify({"error": "No text provided"}), 400
        try:
            # Detects the language of the input text 
            detected_lang_code = translator.detect(original_text).lang  

            # Fixes Google Translate’s old Hebrew code ('iw' → 'he')
            if detected_lang_code == "iw":
                detected_lang_code = "he"
                
            # Ensures the input text detected language matches the user-selected source language
            if chosen_lang != "detect" and detected_lang_code != chosen_lang:
                logger.error(f"Text language mismatch: Detected '{detected_lang_code}', Expected '{chosen_lang}'")
                return jsonify({"error": f"The text language does not match the chosen language."}), 400
            language_name = reverse_lang_codes[detected_lang_code].capitalize()

            translated_text = translator.translate(original_text, src=detected_lang_code, dest=target_lang).text

            return jsonify({
                "Language": language_name,
                "original_text": original_text,
                "translated_text": translated_text
            })
        except Exception as e:
            logger.error(f"Text translation failed: {e}", exc_info=True)
            return jsonify({"error": str(e)}), 500

    # A route for voice-to-text translation        
    @app.route('/voice_translate', methods=['POST'])
    @log_decorator
    def voice_translate():
        model_name = request.form.get('model', 'small') # default: small
        target_lang = request.form.get("target_lang", "en") # default: English
        chosen_lang = request.form.get("chosen_lang", "detect") # default: detect

        if 'audio' not in request.files:
            logger.warning("No audio file provided.")
            return jsonify({"error": "No audio file provided"}), 400  
        # Retrieves the uploaded audio file and logs its filename.
        audio_file = request.files['audio']
        logger.info(f"Received audio file: {audio_file.filename}")  
        try:
            whisper_model = load_model(model_name)
            # Save uploaded audio to a temp file
            with tempfile.NamedTemporaryFile(delete=False, suffix=".m4a") as temp_audio:
                audio_file.save(temp_audio)
                temp_audio_path = temp_audio.name

            # Transcribe audio from the temp file
            result = whisper_model.transcribe(temp_audio_path, fp16=False)
            text = result['text'].strip()
            detected_lang_code = result.get('language', 'en')

            if not text:
                logger.warning("No text captured from audio.")
                return jsonify({"error": "No text captured from audio."}), 400
            
            # Fixes Whisper’s outdated Hebrew language code
            if detected_lang_code == 'iw':
                detected_lang_code = 'he'
        
            # Ensures the detected spoken language matches the user-selected language.
            if chosen_lang != "detect" and detected_lang_code != chosen_lang:
                logger.error(f"Detected language '{detected_lang_code}' does not match chosen '{chosen_lang}'.")  
                return jsonify({"error": f"Detected language '{detected_lang_code}' does not match chosen '{chosen_lang}'."}), 400

            translated_text = translator.translate(text, src=detected_lang_code, dest=target_lang).text

            return jsonify({
                "detected_language": detected_lang_code,
                "original_text": text,
                "translated_text": translated_text
            })

        except Exception as e:
            logger.error(f"Voice translation failed: {e}", exc_info=True)
            return jsonify({"error": str(e)}), 500

        
