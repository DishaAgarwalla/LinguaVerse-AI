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

    const room = await createRoom(name);

    res.status(201).json({
      success: true,
      room,
    });

  } catch (error) {

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

    res.status(200).json({
      success: true,
      rooms,
    });

  } catch (error) {

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

    const roomId =
      req.params.roomId;

    const messages =
      await getMessages(roomId);

    res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch messages.",
    });

  }
};

export const createMessage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const userId = req.user!.id;

    const {
      roomId,
      message,
      sourceLang,
      targetLang,

      grammar = false,

      tone = "normal",
    } = req.body;

    const result =
      await sendMessage({
        roomId,

        senderId: userId,

        message,

        sourceLang,

        targetLang,

        grammar,

        tone: tone as ToneType,
      });

    res.status(201).json({
      success: true,
      message: result,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to send message.",
    });

  }
};