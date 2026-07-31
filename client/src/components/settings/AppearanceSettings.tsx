import { Palette, Check } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface Props {
  settings: {
    theme: "light" | "dark" | "system";
  };
  save: (data: Partial<any>) => Promise<void>;
}

const themes = [
  {
    value: "light",
    title: "☀️ Light",
    description: "Bright appearance for daytime work.",
  },
  {
    value: "dark",
    title: "🌙 Dark",
    description: "Comfortable viewing in low light.",
  },
  {
    value: "system",
    title: "💻 System",
    description: "Automatically match your device theme.",
  },
];

export default function AppearanceSettings({
  save,
}: Props) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = async (
    value: "light" | "dark" | "system"
  ) => {
    // Change immediately
    setTheme(value);

    // Save to backend
    await save({
      theme: value,
    });
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
          <Palette className="h-7 w-7" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Appearance
          </h2>

          <p className="mt-1 text-gray-500 dark:text-slate-400">
            Personalize the look and feel of LinguaVerse AI.
          </p>
        </div>

      </div>

      {/* Theme Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        {themes.map((item) => {

          const active = theme === item.value;

          return (

            <button
              key={item.value}
              onClick={() =>
                handleThemeChange(
                  item.value as
                    | "light"
                    | "dark"
                    | "system"
                )
              }
              className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                p-6
                text-left
                transition-all
                duration-300

                ${
                  active
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-xl scale-[1.02]"
                    : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 hover:shadow-lg"
                }
              `}
            >

              {/* Active Badge */}

              {active && (

                <div className="absolute right-5 top-5">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">

                    <Check className="h-4 w-4" />

                  </div>

                </div>

              )}

              {/* Preview */}

              <div
                className={`
                  mb-6
                  h-24
                  rounded-2xl
                  border
                  overflow-hidden

                  ${
                    item.value === "light"
                      ? "bg-white border-gray-200"
                      : item.value === "dark"
                      ? "bg-slate-900 border-slate-700"
                      : "bg-gradient-to-r from-white to-slate-900 border-gray-300"
                  }
                `}
              >

                <div className="flex h-full">

                  <div
                    className={`
                      w-1/3

                      ${
                        item.value === "dark"
                          ? "bg-slate-800"
                          : "bg-gray-100"
                      }
                    `}
                  />

                  <div className="flex-1 p-3">

                    <div
                      className={`
                        h-3
                        rounded-full

                        ${
                          item.value === "dark"
                            ? "bg-slate-700"
                            : "bg-gray-300"
                        }
                      `}
                    />

                    <div
                      className={`
                        mt-3
                        h-3
                        w-3/4
                        rounded-full

                        ${
                          item.value === "dark"
                            ? "bg-slate-700"
                            : "bg-gray-300"
                        }
                      `}
                    />

                    <div
                      className={`
                        mt-3
                        h-3
                        w-1/2
                        rounded-full

                        ${
                          item.value === "dark"
                            ? "bg-slate-700"
                            : "bg-gray-300"
                        }
                      `}
                    />

                  </div>

                </div>

              </div>

              {/* Text */}

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-slate-400">
                {item.description}
              </p>

              {active && (
                <div className="mt-5 inline-flex rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white">
                  Active Theme
                </div>
              )}

            </button>

          );
        })}

      </div>

    </div>
  );
}