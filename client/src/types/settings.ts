export interface Settings {
  // ==========================
  // Account
  // ==========================
  name: string;
  email: string;

  // ==========================
  // Appearance
  // ==========================
  theme: "light" | "dark" | "system";

  // ==========================
  // Language
  // ==========================
  language: string;

  // ==========================
  // Notifications
  // ==========================
  emailNotifications: boolean;
  pushNotifications: boolean;

  // ==========================
  // Privacy
  // ==========================
  publicProfile: boolean;

  // ==========================
  // Security
  // ==========================
  twoFactorAuth: boolean;
}