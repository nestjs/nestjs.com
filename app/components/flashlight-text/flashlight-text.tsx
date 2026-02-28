import React, { useRef, useState } from "react";

type Props = {
  text: string;
  radius?: number;
};

const FlashlightText: React.FC<Props> = ({ text, radius = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPos({ x: -9999, y: -9999 });
  };

  const radialGradient = `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, white 0%, transparent 90%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center justify-center overflow-hidden text-center"
    >
      <span
        className="text-8xl text-white/5 select-none leading-[1.3]"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <span
        className="absolute text-8xl text-white select-none leading-[1.3] text-center"
        style={{
          WebkitMaskImage: radialGradient,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "0 0",
          WebkitMaskSize: "cover",
          maskImage: radialGradient,
          maskRepeat: "no-repeat",
          maskPosition: "0 0",
          maskSize: "cover",
          opacity: isHovering ? 1 : 0,
          transition:
            "mask-position 0.05s linear, -webkit-mask-position 0.05s linear, opacity 0.5s ease",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></span>
    </div>
  );
};

export default FlashlightText;
