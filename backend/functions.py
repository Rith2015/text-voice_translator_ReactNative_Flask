import whisper
import logging
from functools import wraps
import time
logging.basicConfig(filename="app.log", level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s") # Configure logging
logger = logging.getLogger("app_logger") # Logger instance

# Decorator to log function calls and execution time.
def log_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        logger.info(f"Function '{func.__name__}' called with args: {args}, kwargs: {kwargs}")
        try:
            result = func(*args, **kwargs)
            end_time = time.time()
            logger.info(f"Function '{func.__name__}' executed in {end_time - start_time:.4f} seconds")
            return result
        except Exception as e:
            logger.error(f"Error in function '{func.__name__}': {e}", exc_info=True)
            raise e  
    return wrapper

# Cache loaded models to avoid reloading every request and save time in voice translation
loaded_models = {}
@log_decorator
def load_model(model_name):
    if model_name not in loaded_models:
        print(f"Loading Whisper model '{model_name}'... ")
        loaded_models[model_name] = whisper.load_model(model_name)
        print(f"Model '{model_name}' loaded successfully.")
        logger.info(f"Model '{model_name}' loaded successfully.")
    return loaded_models[model_name]