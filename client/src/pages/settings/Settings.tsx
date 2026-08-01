import { useState } from "react";

import useSettings from "../../hooks/useSettings";

import SettingsSidebar from "../../components/settings/SettingsSidebar";

import AccountSettings from "../../components/settings/AccountSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import LanguageSettings from "../../components/settings/LanguageSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import PrivacySettings from "../../components/settings/PrivacySettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import DangerZone from "../../components/settings/DangerZone";

const Settings = () => {
  const {
    settings,
    loading,
    saving,
    saveSettings,
  } = useSettings();

  const [activeTab, setActiveTab] =
    useState("account");

  if (loading || !settings) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-6 shadow-xl">
          <p className="text-lg font-semibold text-gray-700 dark:text-slate-200">
            Loading Settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">

      {/* Sidebar */}

      <SettingsSidebar
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* Main Content */}

      <div
        className="
          flex-1
          rounded-3xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-8
          shadow-xl
        "
      >

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            Customize your LinguaVerse AI experience.
          </p>

        </div>

        {/* Account */}

        {activeTab === "account" && (
          <AccountSettings
            settings={settings}
            save={saveSettings}
          />
        )}

        {/* Appearance */}

        {activeTab === "appearance" && (
          <AppearanceSettings
            settings={settings}
            save={saveSettings}
          />
        )}

        {/* Language */}

        {activeTab === "language" && (
          <LanguageSettings
            settings={settings}
            save={saveSettings}
          />
        )}

        {/* Notifications */}

        {activeTab === "notifications" && (
          <NotificationSettings
            settings={settings}
            save={saveSettings}
          />
        )}

        {/* Privacy */}

        {activeTab === "privacy" && (
          <PrivacySettings
            settings={settings}
            save={saveSettings}
          />
        )}

        {/* Security */}

        {activeTab === "security" && (
          <SecuritySettings
            settings={settings}
            save={saveSettings}
          />
        )}

        {/* Danger Zone */}

        {activeTab === "danger" && (
          <DangerZone
            logout={() => {
              localStorage.clear();
              window.location.href =
                "/login";
            }}
            deleteAccount={() => {
              alert(
                "Delete Account feature will be connected to the backend soon."
              );
            }}
          />
        )}

        {/* Saving Banner */}

        {saving && (
          <div
            className="
              mt-8
              rounded-2xl
              border
              border-green-200
              dark:border-green-700
              bg-green-50
              dark:bg-green-900/20
              px-5
              py-4
              text-green-700
              dark:text-green-400
              font-medium
              animate-pulse
            "
          >
            ✅ Saving your changes...
          </div>
        )}

      </div>

    </div>
  );
};

export default Settings;