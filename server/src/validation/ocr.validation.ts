import { z } from "zod";

export const ocrSchema = z.object({
  targetLang: z.string().min(1),
});