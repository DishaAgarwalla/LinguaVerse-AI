import { z } from "zod";

export const documentSchema = z.object({
  targetLang: z.string().min(1),
});