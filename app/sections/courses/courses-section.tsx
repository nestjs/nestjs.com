import { useEffect, useRef, useState } from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";
import { TransparentButton } from "../../components/buttons/transparent-button/transparent-button";
import { CourseCard } from "../../components/domain/course-card/course-card";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";
// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
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

export function CoursesSection({ className }: { className?: string }) {
  const midIndex = (courses.length - 1) / 2;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [courseCardBorderOpaque, setCourseCardBorderOpaque] = useState(false);

  const allCards = [...courses, ...sideCards];
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const midIndex = (courses.length - 1) / 2;

    // Initial states
    cardRefs.current.forEach((card, index) => {
      if (index === courses.length - 1) {
        gsap.set(card, { x: 0, y: FIRST_CARD_OFFSET_Y, rotate: 0, opacity: 0 });
      } else {
        gsap.set(card, { x: 0, y: 0, rotate: 0, opacity: 0 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
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
  }, []);

  return (
    <div className="flex justify-center overflow-hidden pt-35">
      <div className="container relative centered justify-center items-center flex flex-col">
        <div
          className="relative min-h-[400px] w-full flex justify-center items-start"
          ref={containerRef}
        >
          <div className="relative" style={{ left: "-80px" }}>
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
                  className={`absolute top-0 left-1/2 pointer-events-none ${index >= courses.length ? "z-1" : "z-10 hover:z-20 hover:mt-[-10px] transition-[margin] transition-[filter]"} `}
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`,
                    transformOrigin: "center top",
                  }}
                >
                  <CourseCard
                    {...course}
                    borderOpaque={courseCardBorderOpaque}
                  />
                </div>
              );
            })}
          </div>
          <div
            className="absolute left-0 right-0 bottom-0 h-full pointer-events-none z-10"
            style={{
              background: "linear-gradient(to top, #050303, transparent 60%)",
            }}
          ></div>
        </div>
        <SectionSubheading>Courses</SectionSubheading>
        <ScrollReveal
          ElementTag="h2"
          className="font-medium xl:text-9xl lg:text-8xl sm:text-7xl text-[2.75rem] text-center leading-[1.1] md:px-0 px-4"
          enableBlur
        >
          Become Nest Certified Expert
        </ScrollReveal>
        <ScrollReveal
          className="font-mono text-sm opacity-70 leading-6 font-light pt-10 max-w-xl text-center md:px-0 px-4"
          ElementTag="p"
          enableBlur
        >
          Over 200 lessons. Learn everything you need to master NestJS and
          tackle modern backend applications at any scale.
        </ScrollReveal>
        <BlurIn
          className="mt-20 flex sm:space-x-5 justify-center sm:flex-row flex-col items-center space-y-4 sm:space-y-0"
          duration={0.5}
        >
          <PrimaryButton href="https://courses.nestjs.com/">
            Get certified today
          </PrimaryButton>
          <TransparentButton href="https://courses.nestjs.com/#featured">
            <img src="/icons/play.svg" className="w-4 h-4 mr-2" />
            <span>Watch free lesson</span>
          </TransparentButton>
        </BlurIn>
      </div>
    </div>
  );
}
