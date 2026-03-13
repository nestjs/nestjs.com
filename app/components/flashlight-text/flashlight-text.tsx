import React, { useCallback, useRef } from "react";
import { SectionSubheading } from "../section-subheading/section-subheading";

type Props = {
  text: string;
  radius?: number;
};

const FlashlightText: React.FC<Props> = ({ text, radius = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLSpanElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || !maskRef.current) return;

      const x =
        e.clientX > rect.right
          ? rect.width
          : e.clientX < rect.left
            ? 0
            : e.clientX - rect.left;

      const y =
        e.clientY > rect.bottom
          ? rect.height
          : e.clientY < rect.top
            ? 0
            : e.clientY - rect.top;

      const gradient = `radial-gradient(circle ${radius}px at ${x}px ${y}px, white 0%, transparent 90%)`;
      maskRef.current.style.webkitMaskImage = gradient;
      maskRef.current.style.maskImage = gradient;
      maskRef.current.style.opacity = "1";
    },
    [radius],
  );

  // const handleMouseLeave = useCallback(() => {
  //   if (maskRef.current) {
  // maskRef.current.style.opacity = "0";
  //   }
  // }, []);

  return (
    <div
      className="flex justify-center pt-50 pb-50"
      onMouseMove={handleMouseMove}
      ref={outerRef}
    >
      <div
        className="container relative cursor-pointer text-center"
        onClick={() => {
          navigator.clipboard.writeText(
            `$ npm i -g @nestjs/cli\n$ nest new project-name`,
          );
        }}
      >
        <div
          ref={containerRef}
          // onMouseLeave={handleMouseLeave}
          className="relative w-full flex items-center justify-center overflow-hidden text-center"
        >
          <span
            className="text-8xl text-white/5 select-none leading-[1.2]"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <span
            ref={maskRef}
            className="absolute text-8xl text-white select-none leading-[1.2] text-center"
            style={{
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "0 0",
              WebkitMaskSize: "cover",
              maskRepeat: "no-repeat",
              maskPosition: "0 0",
              maskImage: `radial-gradient(circle ${radius}px at 50% 50%, white 0%, transparent 90%)`,
              WebkitMaskImage: `radial-gradient(circle ${radius}px at 50% 50%, white 0%, transparent 90%)`,
              maskSize: "cover",
              opacity: 1,
              transition:
                "mask-position 0.05s linear, -webkit-mask-position 0.05s linear",
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          ></span>
        </div>
        <div className="mt-15 opacity-75">
          <SectionSubheading>Click. Copy. Build</SectionSubheading>
        </div>
      </div>
    </div>
  );
};

export default FlashlightText;
