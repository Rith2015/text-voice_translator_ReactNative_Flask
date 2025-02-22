import whisper
import logging
from functools import wraps
import time
# Configure logging to store logs in "app.log" with timestamps, log levels, and messages.
logging.basicConfig(filename="app.log", level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s") 
logger = logging.getLogger("app_logger") # Logger instance

# Decorator to log function calls and execution time.
def log_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        # Logs when a function is called and its arguments.
        logger.info(f"Function '{func.__name__}' called with args: {args}, kwargs: {kwargs}")
        try:
            result = func(*args, **kwargs)
            end_time = time.time()
            # Logs the execution time (end_time - start_time).
            logger.info(f"Function '{func.__name__}' executed in {end_time - start_time:.4f} seconds")
            return result
        except Exception as e:
            logger.error(f"Error in function '{func.__name__}': {e}", exc_info=True)
            raise e  
    return wrapper  # Returns the wrapped function, applying logging to any function that uses @log_decorator

# Cache for storing loaded Whisper models to avoid reloading on every request.
loaded_models = {}

# a function to load Whisper models and using @log_decorator to log function calls
@log_decorator
def load_model(model_name):
    if model_name not in loaded_models:
        print(f"Loading Whisper model '{model_name}'... ")
        loaded_models[model_name] = whisper.load_model(model_name)
        print(f"Model '{model_name}' loaded successfully.")
        logger.info(f"Model '{model_name}' loaded successfully.")
    return loaded_models[model_name] #  Returns the cached model (or the newly loaded one).