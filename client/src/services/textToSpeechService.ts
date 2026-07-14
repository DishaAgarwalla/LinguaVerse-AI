export const speakText = (
  text: string,
  language: string = "en"
) => {
  if (!text.trim()) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = language;

  utterance.rate = 1;

  utterance.pitch = 1;

  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};

export const pauseSpeaking = () => {
  window.speechSynthesis.pause();
};

export const resumeSpeaking = () => {
  window.speechSynthesis.resume();
};