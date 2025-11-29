import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useEffect, useRef, type JSX } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function LettersReveal({
  children,
  ElementTag = "p",
  className = "",
}: {
  children: React.ReactNode;
  ElementTag?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconLeft = useRef<HTMLDivElement | null>(null);

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
      }
    );

    split.chars.forEach((el) => {
      const c = el as HTMLElement;
      gsap.set(c, { attr: { "data-content": c.innerHTML } });
    });

    ScrollTrigger.create({
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
        const bottomOffset = textRect.height;

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

        if (iconLeft.current) {
          if (containerTop + bottomOffset / 2 > containerHeight * 0.5) {
            gsap.to(iconLeft.current, {
              y: -50,
              opacity: 1,
              ease: "ease.inOut",
              overwrite: true,
            });
          } else {
            gsap.to(iconLeft.current, {
              y: 0,
              opacity: 0,
              ease: "ease.inOut",
              overwrite: true,
            });
          }
        }
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
            <div
              className="absolute top-45 left-45 w-20 h-20 opacity-0"
              ref={iconLeft}
            >
              <img src="/icons/cat-sushi.png" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
