import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/30",

    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`rounded-xl px-5 py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}