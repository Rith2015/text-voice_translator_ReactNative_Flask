import axios from 'axios';

const SERVER = 'http://127.0.0.1:5000';

// Function to Sends text to the backend for translation
export const handleTextTranslate = async (
  text: string,
  chosenLang: string,
  targetLang: string,
  setTranslatedText: (text: string) => void
) => {
  if (!text.trim()) {
    window.alert("Please enter text to translate.");
    return;
  }

  try {
    const response = await axios.post(`${SERVER}/text_translate`, {
      text,
      chosen_lang: chosenLang,
      target_lang: targetLang,
    });

    setTranslatedText(response.data.translated_text);
  } catch (error: any) {
    window.alert(
    error.response?.data?.error || 'Failed to connect to the server.'
    );
  }
};

// Function to Sends a request to load the selected Whisper model.
export const selectModel = async (
  selectedModel: string,
  setModelStatus: (status: string) => void
) => {
  try {
    const formData = new FormData();
    formData.append('model', selectedModel);
    const response = await axios.post(`${SERVER}/prepare_model`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setModelStatus(response.data.message);
  } catch (error: any) {
    window.alert(
     error.response?.data?.error || 'Failed to load model.'
    );
    console.error(error);
  }
};
