import gsap from "gsap";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  /** Size of the single circle rendered on Safari as a fallback */
  safariFallbackSize?: number;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
  innerText?: string;
  show?: boolean;
}

/**
 * Build the gooey SVG filter as a data: URI.
 */
function buildGooeyFilterUrl(
  stdDeviation: number,
  colorMatrixValues: string,
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="goo"><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="${stdDeviation}"/><feColorMatrix in="blur" type="matrix" values="${colorMatrixValues}"/></filter></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}#goo")`;
}

function getIsSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Opera/.test(ua);
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
  filterStdDeviation = 30,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
  useFilter = true,
  safariFallbackSize = 192,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = "power3.out",
  slowEase = "power1.out",
  zIndex = 100,
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerTextRef = useRef<HTMLDivElement>(null);
  const [innerTextXPadding, setInnerTextXPadding] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(getIsSafari());
  }, []);

  const filterValue = useMemo(
    () =>
      useFilter && !isSafari
        ? buildGooeyFilterUrl(filterStdDeviation, filterColorMatrixValues)
        : undefined,
    [useFilter, isSafari, filterStdDeviation, filterColorMatrixValues],
  );

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

      if (isSafari) {
        // Only one blob on Safari
        const el = blobsRef.current[0];
        if (el) {
          gsap.to(el, {
            x: x - left,
            y: y - top,
            duration: fastDuration,
            ease: fastEase,
          });
        }
      } else {
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
      }

      if (innerTextRef.current) {
        const textX = x - left;
        const textY = y - top;
        gsap.to(innerTextRef.current, {
          x: textX - innerTextRef.current.offsetWidth / 2,
          y: textY - innerTextRef.current.offsetHeight / 2,
          duration: fastDuration,
          ease: fastEase,
        });

        const minPadding = 50;
        if (textX < minPadding) {
          setInnerTextXPadding(minPadding - textX + 15);
        } else {
          setInnerTextXPadding(0);
        }
      }
    },
    [updateOffset, isSafari, fastDuration, slowDuration, fastEase, slowEase],
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
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: filterValue }}
      >
        {isSafari ? (
          /* Safari fallback: single large circle, no SVG filter */
          <div
            ref={(el) => {
              blobsRef.current[0] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: safariFallbackSize,
              height: safariFallbackSize,
              borderRadius: "50%",
              backgroundColor: "#fff",
            }}
          />
        ) : (
          Array.from({ length: trailCount }).map((_, i) => (
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
                boxShadow:
                  shadowColor !== "none"
                    ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
                    : undefined,
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
          ))
        )}
      </div>
      {/** Inner text */}
      <div
        ref={innerTextRef}
        className={`absolute text-black font-semibold text-base pointer-events-none
          ${show ? "opacity-100" : "opacity-0"} transition-opacity duration-150 delay-150`}
      >
        <span
          className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-padding duration-150"
          style={{ paddingLeft: innerTextXPadding }}
        >
          {innerText}
        </span>
      </div>
    </div>
  );
}
