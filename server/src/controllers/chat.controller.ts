import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createRoom,
  getRooms,
  getMessages,
  sendMessage,
} from "../services/chat.service";

import { ToneType } from "../services/tone.service";

interface RoomParams {
  roomId: string;
}

export const createChatRoom = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    console.log("========== CREATE ROOM ==========");
    console.log("Room Name:", name);

    const room = await createRoom(name);

    console.log("Room Created:", room);

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error: any) {
    console.error("CREATE ROOM ERROR");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create room.",
    });
  }
};

export const fetchRooms = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const rooms = await getRooms();

    console.log("========== FETCH ROOMS ==========");
    console.log("Total Rooms:", rooms.length);

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error: any) {
    console.error("FETCH ROOMS ERROR");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch rooms.",
    });
  }
};

export const fetchMessages = async (
  req: AuthRequest & {
    params: RoomParams;
  },
  res: Response
): Promise<void> => {
  try {
    const roomId = req.params.roomId;

    console.log("========== FETCH MESSAGES ==========");
    console.log("Room ID:", roomId);

    const messages = await getMessages(roomId);

    console.log("Messages Found:", messages.length);

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error: any) {
    console.error("FETCH MESSAGE ERROR");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch messages.",
    });
  }
};

export const createMessage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    console.log("========================================");
    console.log("NEW MESSAGE REQUEST");
    console.log("========================================");

    console.log("Authenticated User:");
    console.log(req.user);

    if (!req.user) {
      return void res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const userId = req.user.id;

    console.log("Sender ID:", userId);

    const {
      roomId,
      message,
      sourceLang,
      targetLang,
      grammar = false,
      tone = "normal",
    } = req.body;

    console.log("Room ID:", roomId);
    console.log("Message:", message);
    console.log("Source:", sourceLang);
    console.log("Target:", targetLang);
    console.log("Grammar:", grammar);
    console.log("Tone:", tone);

    const result = await sendMessage({
      roomId,
      senderId: userId,
      message,
      sourceLang,
      targetLang,
      grammar,
      tone: tone as ToneType,
    });

    console.log("========================================");
    console.log("MESSAGE SAVED SUCCESSFULLY");
    console.log(result);
    console.log("========================================");

    res.status(201).json({
      success: true,
      message: result,
    });
  } catch (error: any) {
    console.error("========================================");
    console.error("CREATE MESSAGE ERROR");
    console.error(error);
    console.error("Message:", error?.message);
    console.error("Code:", error?.code);
    console.error("Meta:", error?.meta);
    console.error("========================================");

    res.status(500).json({
      success: false,
      message: "Unable to send message.",
      error: error?.message,
    });
  }
};