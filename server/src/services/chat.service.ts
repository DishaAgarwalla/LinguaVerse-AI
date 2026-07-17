import prisma from "../config/prisma";
import { translateText } from "./translate.service";
import { detectLanguage } from "./detectLanguage.service";
import { correctGrammar } from "./grammar.service";
import { adjustTone, ToneType } from "./tone.service";
import { getIO } from "../socket/socket";

interface SendMessageProps {
  roomId: string;
  senderId: string;
  message: string;
  sourceLang: string;
  targetLang: string;
  grammar?: boolean;
  tone?: ToneType;
}

export const createRoom = async (name: string) => {
  return prisma.chatRoom.create({
    data: { name },
  });
};

export const getRooms = async () => {
  return prisma.chatRoom.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMessages = async (roomId: string) => {
  return prisma.chatMessage.findMany({
    where: { roomId },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const sendMessage = async ({
  roomId,
  senderId,
  message,
  sourceLang,
  targetLang,
  grammar = false,
  tone = "normal",
}: SendMessageProps) => {
  try {
    console.log("========== CHAT ==========");
    console.log("Room:", roomId);
    console.log("Sender:", senderId);
    console.log("Original Message:", message);

    let processedMessage = message;

    // ==========================
    // Grammar
    // ==========================
    if (grammar) {
      processedMessage = await correctGrammar(processedMessage);
      console.log("Grammar:", processedMessage);
    }

    // ==========================
    // Tone
    // ==========================
    processedMessage = await adjustTone(
      processedMessage,
      tone
    );

    console.log("Tone:", processedMessage);

    // ==========================
    // Auto Language Detection
    // ==========================
    let detectedSourceLang = sourceLang;

    if (
      !sourceLang ||
      sourceLang.trim() === "" ||
      sourceLang.toLowerCase() === "auto"
    ) {
      console.log("Running Language Detection...");

      detectedSourceLang = (
        await detectLanguage(processedMessage)
      )
        .trim()
        .toLowerCase();

      console.log(
        "Detected Language:",
        detectedSourceLang
      );
    }

    // Safety fallback
    if (
      !detectedSourceLang ||
      detectedSourceLang === "auto"
    ) {
      detectedSourceLang = "en";
    }

    console.log("Final Source:", detectedSourceLang);
    console.log("Target:", targetLang);

    // ==========================
    // Translation
    // ==========================
    const translatedText = await translateText(
      processedMessage,
      detectedSourceLang,
      targetLang
    );

    console.log("Translated:", translatedText);

    const chatMessage =
      await prisma.chatMessage.create({
        data: {
          roomId,
          senderId,
          originalText: processedMessage,
          translatedText,
          sourceLang: detectedSourceLang,
          targetLang,
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    getIO()
      .to(roomId)
      .emit("receive-message", chatMessage);

    return chatMessage;
  } catch (error: any) {
  console.error("=================================");
  console.error("❌ CHAT SERVICE ERROR");
  console.error("=================================");
  console.error(error);
  console.error("Message:", error?.message);
  console.error("Code:", error?.code);
  console.error("Meta:", error?.meta);
  console.error("=================================");

  throw error;
}}