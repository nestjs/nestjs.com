// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
// @ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { type ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ScaleOnScrollProps = {
  children: ReactNode;
  start?: string; // optional ScrollTrigger start
  end?: string; // optional ScrollTrigger end
  scaleFrom?: number;
  scaleTo?: number;
  stagger?: number;
  className?: string;
};

export function ScaleOnScroll({
  children,
  start = "top bottom",
  end = "top top",
  scaleFrom = 0.95,
  scaleTo = 1,
  stagger = 0,
  className = "",
}: ScaleOnScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current!.children,
        { scale: scaleFrom },
        {
          scale: scaleTo,
          ease: "none",
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [start, end, scaleFrom, scaleTo, stagger]);

  return <div ref={containerRef}>{children}</div>;
}
