import type { JSX } from "react";

export function ShineText({
  className = "",
  style = {},
  children,
  ElementTag = "p",
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  ElementTag?: keyof JSX.IntrinsicElements;
}) {
  return (
    <ElementTag
      className={`bg-clip-text text-[#b5b5b5a4] animate-shine ${className}`}
      style={{
        ...style,
        backgroundImage:
          "linear-gradient(120deg, #fff 30%, rgba(255, 255, 255, 0), #fff 70%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
      }}
    >
      {children}
    </ElementTag>
  );
}
