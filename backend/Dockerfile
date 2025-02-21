# Start from a slim Python 3.11 base
FROM python:3.11-slim

# Install FFmpeg (for audio processing) and any other system deps
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all your app code into the container
COPY . .

# Expose the port that Flask will run on
EXPOSE 5000

# Set the default command to run your Flask app
CMD ["python", "app.py"]
