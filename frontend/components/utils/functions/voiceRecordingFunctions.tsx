import axios from "axios";
const SERVER = "http://127.0.0.1:5000"; 

// Defines a recorder variable to store the recording instance.
let recorder: { stop: () => Promise<Blob> } | null = null;

// Start recording with Web API (browser)
export const startWebRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Requests microphone access from the user.
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks: Blob[] = [];

  mediaRecorder.ondataavailable = (event) => {
    // Stores audio data
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.start(); // Starts recording

  return {
    // Stops recording and returns the audio blob
    stop: () =>
      new Promise<Blob>((resolve) => {
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          resolve(audioBlob);
        };
        mediaRecorder.stop();
      }),
  };
};

// Starts recording and stores the recorder instance in recorder
export const startRecording = async () => {
  recorder = await startWebRecording();
  console.log("Recording started...");
};

// Stops recording and uploads the audio file backend
export const stopRecording = async (
  model: string,
  chosenLang: string,
  targetLang: string,
  setTranslatedText: (text: string) => void
) => {
  if (!recorder) return; // Exit if no active recording
  const audioBlob = await recorder.stop();  // Stop recording
  console.log("Recording stopped...");

  // Convert recorded audio into a file
  const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });

  // Prepare form data for upload
  const formData = new FormData();
  formData.append("audio", audioFile);
  formData.append("model", model);
  formData.append("chosen_lang", chosenLang);
  formData.append("target_lang", targetLang);

  try {
    // Upload the recorded audio to the backend
    const response = await axios.post(`${SERVER}/voice_translate`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = response.data;
    console.log("Upload success:", data);

    if (data.error) {
      alert(`Error: ${data.error}`);
    } else {
      setTranslatedText(data.translated_text);
    }
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed.");
  } finally {
    recorder = null; // Reset the recorder instance
  }
};
