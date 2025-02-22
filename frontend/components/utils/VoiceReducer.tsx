/* This file manages the state of language/model selection and translation */

/* VoiceState defines the structure of the app's voice translation state. */
export type VoiceState = {
  isProcessing: boolean; // Indicates if translation is in progress
  isModelLoading: boolean; // Indicates if a model is being loaded
  model: string; 
  selectedModel: string; // User-selected model (before confirmation)
  chosenLang: string; 
  targetLang: string; 
  originalText: string;
  translatedText: string; 
  error: string | null; 
};


/* VoiceAction defines all possible actions that can change the state.*/
export type VoiceAction =
  | { type: "SET_MODEL"; payload: string } // Sets the active Whisper model
  | { type: "SET_SELECTED_MODEL"; payload: string } // Updates selected model
  | { type: "SET_MODEL_LOADING"; payload: boolean } // Toggles model loading state
  | { type: "SET_LANG"; payload: { chosenLang: string; targetLang: string } } // Sets source and target languages
  | { type: "SET_TRANSLATION"; payload: { detectedLanguage: string; originalText: string; translatedText: string } } // Updates translation results
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PROCESSING"; payload: boolean }; // Toggles translation processing state


// A function that updates the state based on the action type.
export const voiceReducer = (state: VoiceState, action: VoiceAction): VoiceState => {
  switch (action.type) {
    case "SET_MODEL":
      return { ...state, model: action.payload }; // Updates active Whisper model

    case "SET_SELECTED_MODEL":
      return { ...state, selectedModel: action.payload }; // Updates model selection

    case "SET_MODEL_LOADING":
      return { ...state, isModelLoading: action.payload }; // Toggles loading state

    case "SET_LANG":
      return { 
        ...state, 
        chosenLang: action.payload.chosenLang, 
        targetLang: action.payload.targetLang 
      }; // Updates chosen and target languages

    case "SET_TRANSLATION":
      return {
        ...state,
        originalText: action.payload.originalText,
        translatedText: action.payload.translatedText,
      }; // Updates translation results

    case "SET_ERROR":
      return { ...state, error: action.payload }; 

    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload }; // Toggles translation processing state

    default:
      return state; // Returns current state if action type is unknown
  }
};
