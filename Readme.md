# 🗣️Audio & Text Translation Web App
## 📖 Table of Contents

- [Overview](#-Overview)
- [Features](#️-Features)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [🐳 Docker Setup](#-docker-setup)
- [Backend API Endpoints](#-backend-api-endpoints)
  - [📝 Text Translation](#-text-translation)
  - [🎙️ Voice Transcription + Translation](#-voice-transcription--translation)
  - [Load Whisper Model](#-load-whisper-model)
- [🛠️ Tech Stack](#-tech-stack)
  - [Backend Technologies](#-backend-technologies)
  - [Frontend Technologies](#-frontend-technologies)
- [Folder Structure](#-folder-structure)
## Overview
This **Full-Stack Translation Web App** provides **text and voice translation** with **AI-powered transcription and language detection**.  
Users can choose a **translation model** based on **speed vs. accuracy**, ensuring **fast and seamless translations** without needing to specify the source language.  

### Flask Backend (Python):
- OpenAI Whisper for voice-to-text transcription.
- Google Translate API for text translation.
- Language detection.
- Whisper model caching for faster performance and to avoid reloading.
- Logs every API request, execution time, and errors into app.log.
### React Native Web Frontend:
- Text Translation input.
- Voice Recording & Translation.
- Whisper Model Selection.
## Features
- **Text Translation:** Detect or specify source language and translate to the target language.
- **Voice Translation:** Records audio, transcribe it, and translate the result.
- **CORS Enabled:** Backend allows requests from frontend (React Native Web).
- **Model Selection:**Choose Whisper model: base, small, medium for speed/accuracy balance.

## Install Dependencies
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
### Backend Setup:
1. Navigate to backend directory:
    ```bash
    cd ./backend
2. Install the required Python packages using one of the following methods:
   ```bash
    pip install -r requirements.txt
3. Run Flask App
    ```bash
    cd ./backend
    python app.py
App will run at http://127.0.0.1:5000.

## **ffmpeg is needed to use Whisper**
Follow the steps in this video:
[How to install ffmpeg on Windows](https://youtu.be/JR36oH35Fgg)
### Frontend Setup (React Native Web)
1. Navigate to frontend directory:
    ```bash
    cd ./frontend
2. Install Dependencies
      ```bash
      npm install
3. Run App in Web
    ```bash
    npm run web
App will run at http://localhost:8081.

## 🐳 Docker Setup (Optional)
1. Build and Run Docker:
    ```bash
    docker-compose up --build
-   Or:
    ```bash
    docker-compose build
    docker-compose up
  

## Backend API Endpoints
### Text Translation:
**Endpoint:** `/text_translate`  
**Method:** `POST`

**Request Example (JSON):**
```json
"chosen_lang": "english",
"target_lang": "spanish",
"text": "Hello World"
```

### Voice Transcription + Translation:
**Endpoint:** `/voice_translate`  
**Method:** `POST`

Form Data:

- `audio: (File, e.g., .m4a)`
- `model:` `base` | `small` | `medium (Default: small)`
- `chosen_lang: english (or detect)`
- `target_lang: spanish`

**Request Example (JSON):**
```json
"detected_language": "english",
"original_text": "Hello world",
"translated_text": "Hola mundo"
```

### Load Whisper Model:
**Endpoint:** `/prepare_model`  
**Method:** `POST`

**Form Data:**
- `model`: `base` | `small` | `medium`

  **Response Example:**
  ```json
  "message": "Model loaded successfully and ready for use."
  ```

### Backend Technologies
| **Component**       | **Technology Used**                                      |
|---------------------|----------------------------------------------------------|
| **Framework**      | Flask, Flask-CORS                                         |
| **Translation**    | `googletrans` (Google Translate API)           |
| **Transcription**  | OpenAI **Whisper** for speech-to-text                     |
| **Containerization** | Docker for seamless deployment                          |
| **Logging**        | Python **logging** module for request tracking & errors   |

### Frontend Technologies
| **Component**         | **Technology Used**                                      |
|----------------------|----------------------------------------------------------|
| **Framework**       | React Native Web, Expo Router                            |
| **State Management** | `useReducer` for app-wide state handling                 |
| **Audio Recording** | `navigator.mediaDevices.getUserMedia` API for voice input |
| **Dropdown Select** | `react-native-picker-select` for language selection      |

## Folder Structure
### Backend (Flask)
- `app.py` **Flask backend entry point**
- `functions.py` **Logging, Model Loading, Decorators**
- `translation_routes.py` **Flask Routes (Text/Voice Translation)**
- `lang_codes.py` **Language code mapping**
- `requirements.txt` **Backend dependencies**
- `Dockerfile` **Docker setup for containerized deployment**
- `app.log` **Logs (generated at runtime)**
---
### Frontend (React Native Web)
- `index.tsx` **Main React Native Web screen**
- `components/utils/` **Utility functions & state management**
  - `functions/`
    - `Text_&_Models_Functions.ts` **Handles text translation & model loading API calls**
    - `voiceRecordingFunctions.ts` **Audio recording logic**
  - `langcode.ts` **Language code mapping (mirrors backend)**
  - `VoiceReducer.ts` **Reducer for managing app state**
  - `translateApp_Styles.ts` **Styling for the translation screen**

