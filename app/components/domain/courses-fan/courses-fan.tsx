// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
import { useEffect, useRef, useState } from "react";
import { CourseCard } from "../course-card/course-card";
// @ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const BASE_ROTATION = 10;
const BASE_TRANSLATE_X = 150;
const BASE_TRANSLATE_Y = 30;
const FIRST_CARD_OFFSET_Y = 200;
const SIDE_CARD_SPREAD = 80; // smaller horizontal spread for side cards
const SIDE_CARD_OPACITY = 0.4; // partially opaque

// Extra side cards
const sideCards = [
  { title: "Side Left", duration: "", lessonCount: 0, color: "100,100,100" },
  { title: "Side Right", duration: "", lessonCount: 0, color: "100,100,100" },
];

const courses = [
  {
    title: "Advanced Architecture",
    duration: "2,5 hours",
    lessonCount: 21,
    color: "192,13,39",
  },
  {
    title: "Authentication & Authorization",
    duration: "2 hours",
    lessonCount: 19,
    color: "166,13,116",
  },
  {
    title: "Microservices",
    duration: "2 hours",
    lessonCount: 20,
    color: "0,108,128",
  },
  {
    title: "Fundamentals",
    duration: "5 hours",
    lessonCount: 80,
    color: "121,32,205",
  },
];

export function CoursesFan({
  variant = "gradient",
  shadowOnHover = true,
  animationDelay = 0,
  animationStartTriggerValue = "top 50%",
  reverse = false,
}: {
  variant?: "gradient" | "mask";
  shadowOnHover?: boolean;
  animationStartTriggerValue?: string;
  animationDelay?: number;
  reverse?: boolean;
}) {
  const midIndex = (courses.length - 1) / 2;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [courseCardBorderOpaque, setCourseCardBorderOpaque] = useState(false);

  const allCards = reverse
    ? [...[...courses].reverse(), ...sideCards]
    : [...courses, ...sideCards];

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const midIndex = (courses.length - 1) / 2;

    const ctx = gsap.context(() => {
      // Initial states
      cardRefs.current.forEach((card, index) => {
        if (index === courses.length - 1) {
          gsap.set(card, {
            x: 0,
            y: FIRST_CARD_OFFSET_Y,
            rotate: 0,
            opacity: 0,
          });
        } else {
          gsap.set(card, { x: 0, y: 0, rotate: 0, opacity: 0 });
        }
      });

      const tl = gsap.timeline({
        delay: animationDelay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: animationStartTriggerValue,
          end: "top 30%",
          scrub: false,
        },
        onComplete: () => {
          setCourseCardBorderOpaque(true);
          cardRefs.current.forEach((card) => {
            card.style.pointerEvents = "auto";
          });
        },
      });

      // Step 1 — First card enters (centered)
      tl.to(cardRefs.current[courses.length - 1], {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        // filter: "grayscale(100%)",
      });

      // Step 2 - Other cards can fade in as they won't be visible anyway
      cardRefs.current.forEach((card, index) => {
        if (index !== courses.length - 1) {
          tl.to(
            card,
            {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            "fadeInOthers",
          );
        } else {
          tl.to(
            card,
            {
              // filter: "grayscale(0%)",
              duration: 0.3,
            },
            "fadeInOthers",
          );
        }
      });

      // Prepare final fan values
      const fanAnimations = cardRefs.current.map((card, index) => {
        // Calculate offset from center, different for side cards
        const offset =
          index === courses.length
            ? -midIndex - 1
            : index === courses.length + 1
              ? midIndex + 1
              : index - midIndex;

        return index >= courses.length
          ? {
              target: card,
              vars: {
                opacity: SIDE_CARD_OPACITY,
                x: BASE_TRANSLATE_X * 0.75 * offset,
                y: Math.abs(offset) * BASE_TRANSLATE_Y,
                rotate: BASE_ROTATION * offset,
              },
            }
          : {
              target: card,
              vars: {
                x: BASE_TRANSLATE_X * offset,
                y: Math.abs(offset) * BASE_TRANSLATE_Y,
                rotate: BASE_ROTATION * offset,
              },
            };
      });

      // Step 3 — All cards fan out at the SAME time
      tl.addLabel("fan");

      fanAnimations.forEach(({ target, vars }) => {
        tl.to(
          target,
          {
            ...vars,
            duration: 0.8,
            ease: "power2.out",
          },
          "fan", // <-- same position = simultaneous,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative min-h-[400px] w-full flex justify-center items-start "
      ref={containerRef}
      style={
        variant === "mask"
          ? {
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 50%, transparent 80%)",
              paddingTop: "24px",
            }
          : undefined
      }
    >
      <div className="relative" style={{ left: "-110px" }}>
        {allCards.map((course, index) => {
          const offset = index - midIndex;
          const translateX = BASE_TRANSLATE_X * offset;
          const translateY = Math.abs(offset) * BASE_TRANSLATE_Y;
          const rotate = BASE_ROTATION * offset;

          return (
            <div
              key={course.title}
              ref={(el) => {
                if (el) {
                  cardRefs.current[index] = el;
                }
              }}
              className={`absolute top-0 left-1/2 pointer-events-none ${index >= courses.length ? "z-1" : "z-10 hover:z-20 hover:mt-[-10px] hover:pb-[10px] transition-[margin] transition-[filter]"} `}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`,
                transformOrigin: "center top",
              }}
            >
              <CourseCard
                {...course}
                borderOpaque={courseCardBorderOpaque}
                shadowOnHover={shadowOnHover}
              />
            </div>
          );
        })}
      </div>
      {variant === "gradient" ? (
        <div
          className="absolute left-0 right-0 bottom-0 h-full pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, #050303, transparent 60%)",
          }}
        ></div>
      ) : null}
    </div>
  );
}
