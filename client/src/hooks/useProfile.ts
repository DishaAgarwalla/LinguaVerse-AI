import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import type {
  UserProfile,
  UpdateProfileRequest,
} from "../types/profile";

export default function useProfile() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const user = await getProfile();

      setProfile(user);

      // keep localStorage in sync
      localStorage.setItem(
        "name",
        user.name
      );

      localStorage.setItem(
        "email",
        user.email
      );

      localStorage.setItem(
        "userId",
        user.id
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (
    data: UpdateProfileRequest
  ) => {
    try {
      setSaving(true);

      const updated =
        await updateProfile(data);

      setProfile(updated);

      localStorage.setItem(
        "name",
        updated.name
      );

      localStorage.setItem(
        "email",
        updated.email
      );

      return updated;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    saving,
    reload: loadProfile,
    saveProfile,
  };
}