import { z } from "zod";

export const updateSettingsSchema = z.object({
  language: z.string().min(2).max(50),

  theme: z.enum([
    "light",
    "dark",
    "system",
  ]),

  emailNotifications: z.boolean(),

  pushNotifications: z.boolean(),

  profileVisibility: z.enum([
    "public",
    "private",
  ]),
});

export type UpdateSettingsInput =
  z.infer<typeof updateSettingsSchema>;