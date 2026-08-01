import { useEffect, useState } from "react";

import type { Settings } from "../types/settings";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";

export default function useSettings() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [settings, setSettings] =
    useState<Settings | null>(null);

  const loadSettings = async () => {
    try {
      setLoading(true);

      const data =
        await getSettings();

      setSettings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (
  updatedData: Partial<Settings>
) => {
  if (!settings) return;

  try {
    setSaving(true);

    // Merge existing settings with the updated fields
    const payload: Settings = {
      ...settings,
      ...updatedData,
    };

    const updated = await updateSettings(payload);

    setSettings(updated);
  } catch (error) {
    console.error(error);
  } finally {
    setSaving(false);
  }
};

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    saving,
    saveSettings,
    reloadSettings:
      loadSettings,
  };
}