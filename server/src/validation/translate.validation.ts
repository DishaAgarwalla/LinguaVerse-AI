import { z } from "zod";

export const translateSchema = z.object({
  sourceText: z.string().min(1),
  sourceLang: z.string(),
  targetLang: z.string(),
});