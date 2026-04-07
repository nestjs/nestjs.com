// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
// @ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type StackedCardsProps = {
  cards: React.ReactNode[];
};

export default function StackedCards({ cards }: StackedCardsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardWrappersRef = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const wrappers = cardWrappersRef.current;
    const cards = cardsRef.current;

    const ctx = gsap.context(() => {
      wrappers.forEach((wrapper, i) => {
        const card = cards[i];
        let scale = 1,
          rotationX = 0,
          rotationY = 0;

        if (i !== cards.length - 1) {
          scale = 0;
          rotationX = 30;
          rotationY = i % 2 === 0 ? -10 : 10;
        }

        gsap.to(card, {
          scale,
          rotationX,
          rotationY,
          transformOrigin: "top center",
          ease: "power1.in",
          scrollTrigger: {
            trigger: card,
            start: window.innerWidth <= 992 ? "top 20" : "top 40",
            end: "bottom 1000",
            endTrigger: wrapperRef.current,
            scrub: true,
            pin: wrapper,
            pinSpacing: false,
            id: i + 1,
            invalidateOnRefresh: true,
            onUpdate: (self: gsap.core.Tween) => {
              const progressOffset = 0.5;
              let adjustedProgress =
                (self.progress - progressOffset) / (1 - progressOffset);
              adjustedProgress = gsap.utils.clamp(0, 1, adjustedProgress);
              const adjustedOpacity = gsap.utils.clamp(
                0,
                1,
                (0.85 - self.progress) / (0.85 - 0.75),
              );

              gsap.set(card, {
                scale: 1 + (scale - 1) * adjustedProgress,
                rotationX: rotationX * adjustedProgress,
                rotationY: rotationY * adjustedProgress,
                opacity: i === cards.length - 1 ? 1 : adjustedOpacity,
              });

              const nextCard = cards[i + 1];
              if (nextCard) {
                const normalizedProgress = gsap.utils.clamp(
                  0,
                  1,
                  self.progress * cards.length,
                );
                const nextTranslateY = Math.max(
                  0,
                  window.innerHeight * (1 - normalizedProgress),
                );
                gsap.set(nextCard, { translateY: nextTranslateY });
              }
            },
          },
        });
      });

      ScrollTrigger.refresh();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const setWrapperRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardWrappersRef.current[index] = el;
  };
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div ref={wrapperRef} className="wrapper py-24 w-full min-h-screen">
      <div className="cards mx-auto w-full px-4 sm:px-5 md:px-8 lg:px-10 flex flex-col gap-12">
        {cards!.map((node, i) => (
          <div
            key={i}
            ref={(el) => setWrapperRef(el, i)}
            className="card-wrapper perspective-500"
          >
            <div
              ref={(el) => setCardRef(el, i)}
              className="card rounded-[24px] bg-cover bg-center h-[98vh] mb-[50vh]"
            >
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
