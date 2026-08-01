import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext =
  createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (
      (localStorage.getItem("theme") as Theme) ||
      "system"
    );
  });

  const applyTheme = (value: Theme) => {
    const root = document.documentElement;

    root.classList.remove("dark");

    if (value === "dark") {
      root.classList.add("dark");
    }

    if (value === "system") {
      const prefersDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      if (prefersDark) {
        root.classList.add("dark");
      }
    }
  };

  const setTheme = (value: Theme) => {
    localStorage.setItem("theme", value);
    setThemeState(value);
    applyTheme(value);
  };

  useEffect(() => {
  applyTheme(theme);
}, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error(
      "useTheme must be inside ThemeProvider"
    );

  return context;
}