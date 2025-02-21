import axios from "axios";
const SERVER = "http://127.0.0.1:5000"; 

let recorder: { stop: () => Promise<Blob> } | null = null;

// Start recording with Web API (browser)
export const startWebRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks: Blob[] = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.start();

  return {
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

// Start recording
export const startRecording = async () => {
  recorder = await startWebRecording();
  console.log("Recording started...");
};

// Stop recording and upload
export const stopRecording = async (
  model: string,
  chosenLang: string,
  targetLang: string,
  setTranslatedText: (text: string) => void
) => {
  if (!recorder) return;
  const audioBlob = await recorder.stop();
  console.log("Recording stopped...");

  const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });

  const formData = new FormData();
  formData.append("audio", audioFile);
  formData.append("model", model);
  formData.append("chosen_lang", chosenLang);
  formData.append("target_lang", targetLang);

  try {
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
    recorder = null;
  }
};
