export type ToneType =
  | "normal"
  | "formal"
  | "professional"
  | "friendly"
  | "casual";

export const adjustTone = async (
  text: string,
  tone: ToneType = "normal"
): Promise<string> => {

  switch (tone) {

    case "formal":
      return `Kindly note: ${text}`;

    case "professional":
      return `Please note that ${text}`;

    case "friendly":
      return `😊 ${text}`;

    case "casual":
      return text;

    default:
      return text;
  }

};