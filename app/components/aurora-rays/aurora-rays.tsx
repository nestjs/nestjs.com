import React from "react";

type AuroraRaysProps = {
  className?: string;
  rayCount?: number;
  color?: string; // RGB string: "255,255,255"
  intensity?: number; // 0–1
  speed?: number; // seconds
};

const AuroraRays: React.FC<AuroraRaysProps> = ({
  className = "",
  rayCount = 6,
  color = "255,255,255",
  intensity = 0.15,
  speed = 12,
}) => {
  const rays = Array.from({ length: rayCount });

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <style>
        {`
          @keyframes aurora-rays-rotate {
            from { transform: rotate(0deg) scale(1); }
            to { transform: rotate(360deg) scale(1.05); }
          }
        `}
      </style>

      {rays.map((_, i) => {
        const delay = (i * speed) / rayCount;
        const width = 80 + Math.random() * 40;
        const left = Math.random() * 100;

        return (
          <div
            key={i}
            className="absolute top-[-20%] h-[140%] blur-2xl"
            style={{
              left: `${left}%`,
              width: `${width}px`,
              opacity: intensity,
              background: `linear-gradient(to bottom, rgba(${color},0.4), rgba(${color},0))`,
              transformOrigin: "bottom left",
              animation: `aurora-rays-rotate ${speed}s linear infinite`,
              animationDelay: `-${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AuroraRays;
