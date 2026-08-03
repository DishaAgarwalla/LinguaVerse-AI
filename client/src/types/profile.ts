export interface ProfileStats {
  translations: number;
  speeches: number;
  ocrHistory: number;
  documents: number;
  explanations: number;
  grammar: number;
  tones: number;
  messages: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  isVerified: boolean;
  createdAt: string;
  _count: ProfileStats;
}

export interface ProfileResponse {
  success: boolean;
  profile: UserProfile;
}

export interface UpdateProfileRequest {
  name: string;
  avatar?: string;
}