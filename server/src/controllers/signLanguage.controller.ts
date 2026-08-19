import { Request, Response } from "express";

import { detectSign } from "../services/signLanguage.service";

export const detectSignController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { image, frames } = req.body;

    const receivedFrames = frames ?? image;

    if (!Array.isArray(receivedFrames)) {
      res.status(400).json({
        success: false,
        message: "30 camera frames are required.",
      });
      return;
    }

    if (receivedFrames.length !== 30) {
      res.status(400).json({
        success: false,
        message: `Exactly 30 frames are required. Received ${receivedFrames.length}.`,
      });
      return;
    }

    console.log(
      `🤟 Received ${receivedFrames.length} frames for sign detection.`
    );

    const result = await detectSign(
      receivedFrames
    );

    res.status(200).json(result);

  } catch (error) {

    console.error(
      "❌ Sign language detection error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to detect sign language.",
    });
  }
};