import { z } from "zod";

export const SettingsSchema = z.object({
  name: z.string().optional(),

  email: z.string().email().optional(),

  theme: z.enum([
    "light",
    "dark",
    "system",
  ]).optional(),

  language: z.string().min(2).max(50).optional(),

  emailNotifications: z.boolean().optional(),

  pushNotifications: z.boolean().optional(),

  publicProfile: z.boolean().optional(),

  twoFactorAuth: z.boolean().optional(),
});

export type UpdateSettingsInput =
  z.infer<typeof SettingsSchema>;