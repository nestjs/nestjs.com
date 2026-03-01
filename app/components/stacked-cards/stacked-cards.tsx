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
          trigger: wrapper,
          start: i === cards.length - 1 ? "top 25" : "top 20",
          end: i === cards.length - 1 ? "bottom 550" : "bottom 0",
          endTrigger: wrapperRef.current,
          scrub: true,
          pin: wrapper,
          pinSpacing: false,
        },
      });
    });

    ScrollTrigger.refresh();
  }, []);

  const setWrapperRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardWrappersRef.current[index] = el;
  };
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div ref={wrapperRef} className="wrapper py-24 w-full min-h-screen">
      <div className="cards mx-auto w-full px-5 md:px-8 lg:px-12 flex flex-col gap-12">
        {cards!.map((node, i) => (
          <div
            key={i}
            ref={(el) => setWrapperRef(el, i)}
            className="card-wrapper perspective-500"
          >
            <div
              ref={(el) => setCardRef(el, i)}
              className="card rounded-[24px] bg-cover bg-center h-[98vh]"
            >
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
