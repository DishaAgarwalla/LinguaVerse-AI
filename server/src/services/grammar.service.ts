export const correctGrammar = async (
  text: string
): Promise<string> => {

  let corrected = text.trim();

  corrected =
    corrected.charAt(0).toUpperCase() +
    corrected.slice(1);

  if (
    corrected.length > 0 &&
    !/[.!?]$/.test(corrected)
  ) {
    corrected += ".";
  }

  return corrected;
};