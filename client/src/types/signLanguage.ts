export interface TranslationResult {
  language: string;
  text: string;
}

export interface Recognition {
  label: string;
  confidence: number;
}

export interface DetectionResponse {
  recognition: Recognition;
  translations: TranslationResult[];
}

export interface LearningGesture {
  gesture: string;
  meaning: string;
  difficulty: string;
  progress: number;
}

export interface RecognitionHistoryItem {
  gesture: string;
  translation: string;
  confidence: number;
  time: string;
}