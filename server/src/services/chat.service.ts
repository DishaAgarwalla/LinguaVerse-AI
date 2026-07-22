import prisma from "../config/prisma";

import { translateText } from "./translate.service";
import { detectLanguage } from "./detectLanguage.service";
import { correctGrammar } from "./grammar.service";
import {
  adjustTone,
  ToneType,
} from "./tone.service";

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

export const createRoom = async (
  name: string
) => {
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

export const getMessages = async (
  roomId: string
) => {
  return prisma.chatMessage.findMany({
    where: {
      roomId,
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
    let processedMessage = message;

    /* ==========================
       Grammar
    ========================== */

    if (grammar) {
      processedMessage =
        await correctGrammar(
          processedMessage
        );
    }

    /* ==========================
       Tone
    ========================== */

    processedMessage =
      await adjustTone(
        processedMessage,
        tone
      );

    /* ==========================
       Detect Language
    ========================== */

    let detectedLanguage =
      sourceLang;

    if (
      !sourceLang ||
      sourceLang === "" ||
      sourceLang === "auto"
    ) {
      detectedLanguage =
        await detectLanguage(
          processedMessage
        );
    }

    if (
      !detectedLanguage ||
      detectedLanguage === "auto"
    ) {
      detectedLanguage = "en";
    }

    /* ==========================
       Translate
    ========================== */

    const translatedText =
      await translateText(
        processedMessage,
        detectedLanguage,
        targetLang
      );

    /* ==========================
       Save
    ========================== */

    const savedMessage =
      await prisma.chatMessage.create({
        data: {
          roomId,
          senderId,

          originalText:
            processedMessage,

          translatedText,

          sourceLang:
            detectedLanguage,

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

    /* ==========================
       Live Socket Broadcast
    ========================== */

    getIO()
      .to(roomId)
      .emit(
        "receive-message",
        savedMessage
      );

    return savedMessage;
  } catch (error) {
    console.error(
      "Chat Service Error:",
      error
    );

    throw error;
  }
};