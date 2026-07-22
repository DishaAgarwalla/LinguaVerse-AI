import { Request, Response } from "express";

import { detectSign } from "../services/signLanguage.service";

export const detectSignController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { image } = req.body;

    if (!image) {
      res.status(400).json({
        success: false,
        message: "Image is required.",
      });
      return;
    }

    const result = await detectSign(image);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to detect sign language.",
    });
  }
};