// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
// @ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const cardImages = [
  "https://assets.codepen.io/16327/portrait-pattern-1.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-4.jpg",
];

export default function StackedCards() {
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
        rotationY = 0,
        opacity = 1;

      if (i !== cards.length - 1) {
        scale = 0.15;
        rotationX = 30;
        rotationY = i % 2 === 0 ? -10 : 10;
        opacity = 0.3;
      }

      gsap.to(card, {
        scale,
        rotationX,
        rotationY,
        opacity,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: `top 25`,
          end: "bottom 550",
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
        {cardImages.map((img, i) => (
          <div
            key={i}
            ref={(el) => setWrapperRef(el, i)}
            className="card-wrapper perspective-500"
          >
            <div
              ref={(el) => setCardRef(el, i)}
              className="card rounded-xl bg-cover bg-center h-[95vh]"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
