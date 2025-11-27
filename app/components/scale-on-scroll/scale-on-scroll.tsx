import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MIN_SCALE = 1;
const MAX_SCALE = 50;

export function ScaleOnScroll({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // use gsap to scale the component on scroll
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

        const startOffset = 0;
        const endOffset = containerHeight * 0.8;
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
        height: "150vh",
        position: "relative",
        overflow: "hidden",
        marginTop: "-20vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
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
  );
}
