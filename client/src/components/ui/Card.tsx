import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Card({
  children,
  title,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm p-6 ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}