import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const MIN_OPACITY = 0;
const MAX_OPACITY = 1;

export function ScaleOnScroll({
  children,
  background,
}: {
  children: React.ReactNode;
  background?: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [showBackground, setShowBackground] = useState(false);
  const backgroundTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show background only on scroll
  useEffect(() => {
    const onScroll = () => {
      if (backgroundTimeoutRef.current) {
        clearTimeout(backgroundTimeoutRef.current);
      }
      setShowBackground(true);

      const hideBackgroundTimeout = setTimeout(() => {
        setShowBackground(false);
      }, 500);
      backgroundTimeoutRef.current = hideBackgroundTimeout;

      return () => clearTimeout(hideBackgroundTimeout);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    if (!rootRef.current) return;

    const text = rootRef.current;
    const container = document.querySelector(".scale-on-scroll")!;

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: true,
      // markers: true,
      onUpdate: () => {
        const containerRect = container.getBoundingClientRect();

        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;

        const startOffset = 500;
        const endOffset = containerHeight * 0.9;
        const clampedTop = Math.min(Math.abs(containerTop), endOffset);

        const scale = Math.min(
          MAX_SCALE,
          Math.max(
            MIN_SCALE,
            MIN_SCALE +
              ((MAX_SCALE - MIN_SCALE) * (clampedTop - startOffset)) /
                (endOffset - startOffset)
          )
        );
        const opacity =
          1 -
          Math.min(
            MAX_OPACITY,
            Math.max(
              MIN_OPACITY,
              MIN_OPACITY +
                ((MAX_OPACITY - MIN_OPACITY) * (clampedTop - startOffset)) /
                  (endOffset - startOffset)
            )
          );

        text.style.opacity = `${opacity}`;

        text.style.transform = `scale(${scale})`;
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div
      className="scale-on-scroll will-change-transform"
      style={{
        height: "400vh",
        position: "relative",
        // marginTop: "-20vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "sticky",
          overflow: "hidden",
          top: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              opacity: showBackground ? 1 : 0,
              transition: "opacity 0.35s ease-in-out",
            }}
          >
            {background}
          </div>
          <div
            ref={rootRef}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transform: `scale(${MIN_SCALE})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
