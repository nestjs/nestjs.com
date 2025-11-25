// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
// @ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function WordByWord({ children }: { children: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = children.split(" ");

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const wordSpans = containerRef.current.querySelectorAll(".word");

    // Animate each word
    gsap.from(wordSpans, {
      opacity: 0,
      y: 0,
      stagger: 0.15, // delay between words
      duration: 0.75,
      filter: "blur(25px)",
      scale: 1.05,
      ease: "power3.out",
    });
  }, []);

  return (
    <span ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          className="word"
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
