import React, { useState, useReducer } from "react";
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"; 
import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import { handleTextTranslate, selectModel } from "../components/utils/functions/Text_&_Models_Functions";
import { startRecording, stopRecording } from "@/components/utils/functions/voiceRecordingFunctions";
import { langCodes } from "../components/utils/langcode";
import { voiceReducer, VoiceState } from "../components/utils/VoiceReducer";
import styles from "../components/utils/translateApp_Styles";

const initialState: VoiceState = {
  model: "small", // Default Whisper model (small).
  selectedModel: "small", // Default Whisper model selection screen to (small).
  isModelLoading: false, // Tracks model loading state.
  chosenLang: "detect", 
  targetLang: "en", // Default target language to english (en).
  originalText: "",
  translatedText: "",
  error: null,
  isProcessing: false, // Tracks loading state.
};

export default function TranslateScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [modelStatus, setModelStatus] = useState("");
  const [isRecording, setIsRecording] = useState(false); // Boolean flag to track recording
  const [state, dispatch] = useReducer(voiceReducer, initialState);

  // Converts language codes into names for dropdown options.
  const languageOptions = Object.entries(langCodes).map(([name, code]) => ({
    label: name,
    value: code,
  }));

  // Model Selection
  const confirmModelSelection = async () => {
    dispatch({ type: "SET_MODEL_LOADING", payload: true });
    dispatch({ type: "SET_MODEL", payload: state.selectedModel });

    try {
      await selectModel(state.selectedModel, setModelStatus);
    } catch (error) {
      window.alert("Failed to select model.");
      console.error(error);
    } finally {
      dispatch({ type: "SET_MODEL_LOADING", payload: false });
    }
  };


  // Text Translation
  const handleTextTranslateWrapper = async () => {
    await handleTextTranslate(text, state.chosenLang, state.targetLang, setTranslatedText);
  };
  

  // Toggle Voice Recording
  const handleToggleRecording = async () => {
    if (isRecording) {
      // Stop Recording
      try {
        dispatch({ type: "SET_PROCESSING", payload: true });
        await stopRecording(state.model, state.chosenLang, state.targetLang, setTranslatedText);
      } catch (error) {
        console.error("Error stopping recording:", error);
      } finally {
        setIsRecording(false);
        dispatch({ type: "SET_PROCESSING", payload: false });
      }
    } else {
      // Start Recording
      try {
        dispatch({ type: "SET_PROCESSING", payload: true });
        await startRecording();
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting recording:", error);
      } finally {
        dispatch({ type: "SET_PROCESSING", payload: false });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Audio and Text Translation App</Text>

      <Text style={styles.label}>Select Model:</Text>
      <RNPickerSelect
        onValueChange={(value) => dispatch({ type: "SET_SELECTED_MODEL", payload: value })}
        items={[
          { label: "Fastest (Lower Accuracy)", value: "base" },
          { label: "Balanced (Moderate Speed & Accuracy)", value: "small" },
          { label: "Accurate (Slower)", value: "medium" },
        ]}
        value={state.selectedModel}
      />

      <Button title="Confirm Model Selection" onPress={confirmModelSelection} />

      {state.isModelLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading model... Please wait.</Text>
        </View>
      )}

      {modelStatus ? <Text style={styles.statusText}>{modelStatus}</Text> : null}

      <TouchableOpacity style={styles.recordButton} onPress={handleToggleRecording}>
        <Text style={styles.recordButtonText}>
          {isRecording ? "Stop Recording & Translate" : "Start Recording"}
        </Text>
      </TouchableOpacity>

      {state.isProcessing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Processing audio... Please wait.</Text>
        </View>
      )}

      <Text style={styles.label}>Choose Source Language:</Text>
      <RNPickerSelect
        onValueChange={(value) =>
          dispatch({ type: "SET_LANG", payload: { chosenLang: value, targetLang: state.targetLang } })
        }
        items={[{ label: "Detect Language", value: "detect" }, ...languageOptions]}
        value={state.chosenLang}
      />

      <Button
        title="Swap Languages"
        onPress={() => {
          if (state.chosenLang === 'detect') {
            window.alert('Cannot swap when source language is set to Detect Language. Please choose a language ');
          } else {
            dispatch({
              type: 'SET_LANG',
              payload: { chosenLang: state.targetLang, targetLang: state.chosenLang },
            });
          }
        }}
        
      />

      <Text style={styles.label}>Choose Target Language:</Text>
      <RNPickerSelect
        onValueChange={(value) =>
          dispatch({ type: "SET_LANG", payload: { chosenLang: state.chosenLang, targetLang: value } })
        }
        items={languageOptions}
        value={state.targetLang}
      />

      <Text style={styles.label}>Enter Text to Translate:</Text>
      <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Type something..." />
      <Button title="Translate Text" onPress={handleTextTranslateWrapper} />

      <View style={styles.translationBox}>
        <Text style={styles.translationText}>{translatedText || "Translated Text will appear here..."}</Text>
      </View>
    </ScrollView>
  );
}
