import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useEffect, useRef, type JSX } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function LettersReveal({
  children,
  ElementTag = "p",
  subComponent,
}: {
  children: React.ReactNode;
  ElementTag?: keyof JSX.IntrinsicElements;
  subComponent?: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }
    const container = containerRef.current!;
    const split = SplitText.create(
      rootRef.current.querySelectorAll(ElementTag),
      {
        type: "chars",
        charsClass: "inline-block will-change-transform opacity-20",
        reduceWhiteSpace: false,
      },
    );

    split.chars.forEach((el) => {
      const c = el as HTMLElement;
      gsap.set(c, { attr: { "data-content": c.innerHTML } });
    });

    // Find index of a 2nd word from the end
    const chars = split.chars as HTMLElement[];
    let lastTwoWordsStartIndex = chars.length - 1;
    let spaceCount = 0;
    for (let i = chars.length - 1; i >= 0; i--) {
      if (chars[i].textContent.trim() === "") {
        lastTwoWordsStartIndex = i + 1;
        spaceCount++;
        if (spaceCount === 2) {
          break;
        }
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `bottom top`,
      scrub: true,
      onLeaveBack: () => {
        split.chars.forEach((el) => {
          const c = el as HTMLElement;
          gsap.to(c, {
            opacity: 0.2,
            ease: "ease.inOut",
            overwrite: true,
          });
        });
      },
      onUpdate: () => {
        const containerRect = container.getBoundingClientRect();
        const textRect = rootRef.current!.getBoundingClientRect();
        const bottomOffset = textRect.height + 200;

        const containerTop = Math.abs(containerRect.top);
        const containerHeight = containerRect.height;

        const chartsCount = split.chars.length;
        const offsetPerChar = (containerHeight - bottomOffset) / chartsCount;

        split.chars.forEach((el, index) => {
          const c = el as HTMLElement;
          const charOffsetStart = index * offsetPerChar;
          const opacity = containerTop > charOffsetStart ? 1 : 0.2;
          gsap.to(c, {
            opacity,
            ease: "ease.inOut",
            overwrite: true,
          });
        });

        const isRevealComplete = containerTop > containerHeight - bottomOffset;
        if (isRevealComplete) {
          // Just higlight 2 last words when we are below the text
          split.chars.forEach((el, index) => {
            const c = el as HTMLElement;
            const isLastTwoChars = index >= lastTwoWordsStartIndex;
            gsap.to(c, {
              opacity: isLastTwoChars ? 1 : 0.2,
              ease: "ease.inOut",
              overwrite: true,
            });
          });
        }
      },
    });
    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="will-change-transform h-[300vh] relative"
    >
      <div className="w-full h-[100vh] sticky top-[0] overflow-hidden">
        <div className="w-full h-full relative overflow-hidden">
          <div
            ref={rootRef}
            className="relative flex flex-col items-center justify-center h-full w-full"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
