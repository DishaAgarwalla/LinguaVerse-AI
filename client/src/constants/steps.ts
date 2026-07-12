import {
  Upload,
  Bot,
  Languages,
  Download,
} from "lucide-react";

export const steps = [
  {
    id: 1,
    title: "Choose Your Input",
    description:
      "Enter text, upload a document, image, or speak using your microphone.",
    icon: Upload,
  },
  {
    id: 2,
    title: "AI Understands",
    description:
      "Our AI detects the language, context, and meaning automatically.",
    icon: Bot,
  },
  {
    id: 3,
    title: "Translate Instantly",
    description:
      "Receive accurate translations with grammar and tone improvements.",
    icon: Languages,
  },
  {
    id: 4,
    title: "Download & Share",
    description:
      "Copy, listen, download, or share your translated content instantly.",
    icon: Download,
  },
];