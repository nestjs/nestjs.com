import gsap from "gsap";
import React, { useCallback, useEffect, useRef } from "react";

export interface BlobCursorProps {
  blobType?: "circle" | "square";
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
  innerText?: string;
  show?: boolean;
}

export default function BlobCursor({
  innerText = "Copy to clipboard",
  blobType = "circle",
  trailCount = 3,
  sizes = [120, 185, 135],
  innerSizes = [20, 35, 25],
  opacities = [0.6, 0.6, 0.6],
  show = true,
  shadowColor = "rgba(0,0,0,0.75)",
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = "blob",
  filterStdDeviation = 30,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = "power3.out",
  slowEase = "power1.out",
  zIndex = 100,
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerTextRef = useRef<HTMLDivElement>(null);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ) => {
      const { left, top } = updateOffset();
      const x = "clientX" in e ? e.clientX : e.touches[0].clientX;
      const y = "clientY" in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase,
        });
      });

      if (innerTextRef.current) {
        const textX = x - left;
        const textY = y - top;
        gsap.to(innerTextRef.current, {
          x: textX - innerTextRef.current.offsetWidth / 2,
          y: textY - innerTextRef.current.offsetHeight / 2,
          duration: fastDuration,
          ease: fastEase,
        });
      }
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase],
  );

  // Scale down on click and scale back up on release
  useEffect(() => {
    const handleMouseDown = () => {
      blobsRef.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, { scale: 0.9, duration: 0.1, ease: "power3.out" });
      });
    };
    const handleMouseUp = () => {
      blobsRef.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
      });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className={`absolute top-0 left-0 w-full h-full ${show ? "opacity-100" : "opacity-0"} transition-opacity duration-150`}
      style={{ zIndex }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation={filterStdDeviation}
            />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: useFilter ? `url(#${filterId})` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              blobsRef.current[i] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === "circle" ? "50%" : "0",
              backgroundColor: "#fff",
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`,
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: "#fff",
                borderRadius: blobType === "circle" ? "50%" : "0",
              }}
            />
          </div>
        ))}
      </div>
      {/** Inner text */}
      <div
        ref={innerTextRef}
        className={`absolute text-black font-semibold text-base pointer-events-none
          ${show ? "opacity-100" : "opacity-0"} transition-opacity duration-150 delay-150`}
      >
        <span className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {innerText}
        </span>
      </div>
    </div>
  );
}
