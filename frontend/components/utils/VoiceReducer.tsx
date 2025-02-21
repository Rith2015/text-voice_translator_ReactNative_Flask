{/* This file manages the state of language/model selection and translation */}

/* VoiceState defines the structure of the app's voice translation state.*/
export type VoiceState = {
  isProcessing: boolean;
  isModelLoading: boolean; 
  model: string;
  selectedModel: string;
  chosenLang: string;
  targetLang: string;
  detectedLanguage: string;
  originalText: string;
  translatedText: string;
  error: string | null;
};

/* VoiceAction defines all possible actions that can change the state.*/
export type VoiceAction =
  | { type: "SET_MODEL"; payload: string }
  | { type: "SET_SELECTED_MODEL"; payload: string }
  | { type: "SET_MODEL_LOADING"; payload: boolean }
  | { type: "SET_LANG"; payload: { chosenLang: string; targetLang: string } }
  | { type: "SET_TRANSLATION"; payload: { detectedLanguage: string; originalText: string; translatedText: string } }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PROCESSING"; payload: boolean }; 


export const voiceReducer = (state: VoiceState, action: VoiceAction): VoiceState => {
  switch (action.type) {
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_SELECTED_MODEL":
      return { ...state, selectedModel: action.payload };
    case "SET_MODEL_LOADING":
        return { ...state, isModelLoading: action.payload };
    case "SET_LANG":
      return { ...state, chosenLang: action.payload.chosenLang, targetLang: action.payload.targetLang };
    case "SET_TRANSLATION":
      return {
        ...state,
        detectedLanguage: action.payload.detectedLanguage,
        originalText: action.payload.originalText,
        translatedText: action.payload.translatedText,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload }; 
    default:
      return state;
  }
};
