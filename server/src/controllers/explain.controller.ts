import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";
import { explainText } from "../services/explain.service";

export const explain = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    console.log("=================================");
    console.log("AI EXPLAIN REQUEST");
    console.log("=================================");

    const { text, language } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required.",
      });
    }

    console.log("Text :", text);
    console.log("Language :", language);
    console.log("User :", req.user?.id);

    const result = await explainText(
      text,
      language || "en",
      req.user!.id
    );

    console.log("=================================");
    console.log("AI EXPLAIN SUCCESS");
    console.log("=================================");

    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error: any) {

    console.error("=================================");
    console.error("AI EXPLAIN ERROR");
    console.error("=================================");
    console.error(error);
    console.error(error?.message);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message:
        error.message ??
        "AI explanation failed.",
    });
  }
};