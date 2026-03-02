import { useCallback, useEffect, useRef, useState } from "react";
import { BlurIn } from "../components/blur-in/blur-in";
import ScrollReveal from "../components/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../components/section-subheading/section-subheading";

const CARD_CHANGE_INTERVAL = 15000;

const TESTIMONIALS = [
  {
    logo: "/logos/mercedes.png",
    text: "NestJS has truly revolutionized our development workflow. The framework’s modular architecture and extensive built-in features have made it possible for us to build highly scalable and easily maintainable applications without compromising speed or quality.",
    author: "Adam Nash",
    title: "CTO, Valor Software",
  },
  {
    logo: "/logos/bmw.png",
    text: "Using NestJS has had a transformative impact on our development process. Its modular design and powerful built-in tools enable us to create scalable, maintainable applications efficiently, streamlining our workflow and improving overall productivity.",
    author: "John Doe",
    title: "CTO, BMW",
  },
  {
    logo: "/logos/ibm.png",
    text: "NestJS has been instrumental in enhancing how we develop applications. With its modular structure and robust built-in features, we are able to build scalable and maintainable software solutions with much greater ease and consistency.",
    author: "Jane Smith",
    title: "CTO, IBM",
  },
  {
    logo: "/logos/roche.png",
    text: "Adopting NestJS has completely changed the way we approach development. The framework’s modular architecture, paired with its comprehensive built-in features, allows us to build scalable, maintainable applications smoothly while reducing complexity and overhead.",
    author: "Emily Johnson",
    title: "CTO, Roche",
  },
];

export function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(
    null,
  );
  const itemUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const handleItemClick = useCallback(
    (idx: number) => {
      setActiveTestimonial(idx);
      if (itemUpdateIntervalRef.current) {
        clearInterval(itemUpdateIntervalRef.current);
      }
      itemUpdateIntervalRef.current = setInterval(() => {
        setActiveTestimonial((prev) =>
          prev === null ? 0 : (prev + 1) % TESTIMONIALS.length,
        );
      }, CARD_CHANGE_INTERVAL);
    },
    [TESTIMONIALS.length],
  );

  useEffect(() => {
    // Initial setup to start cycling through testimonials
    setActiveTestimonial(0);

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === null ? 0 : (prev + 1) % TESTIMONIALS.length,
      );
    }, CARD_CHANGE_INTERVAL);

    itemUpdateIntervalRef.current = interval;
    return () => {
      if (itemUpdateIntervalRef.current) {
        clearInterval(itemUpdateIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="width-full relative flex items-center justify-center text-center my-40">
      <div className="container ">
        <SectionSubheading>Testimonials</SectionSubheading>
        <ScrollReveal
          ElementTag="h3"
          className="font-medium text-8xl text-center leading-[1.1]"
          enableBlur
        >
          Built for teams that can't afford mistakes
        </ScrollReveal>
        <BlurIn duration={0.8} distance={20} ease="power2.out">
          <div className="border border-solid border-[rgba(255,255,255,0.1)] rounded-[24px] mt-20 p-3 relative max-w-[1100px] mx-auto">
            <div
              className="rounded-[20px] border border-[rgba(255,255,255,0.1)] p-20 relative z-10 overflow-hidden"
              style={{
                background: `radial-gradient(circle at top center, rgba(255, 255, 255, 0.15), rgba(9, 9, 9, 1) 40%)`,
              }}
            >
              <div className="noise" />
              <span
                className="quote-mark text-[1000px] leading-[650px] absolute right-0 top-0 bottom-0 font-medium text-transparent"
                style={
                  {
                    textStroke: "2px #1f1f1f",
                    "-webkitTextStroke": "2px #1f1f1f",
                  } as React.CSSProperties
                }
              >
                “
              </span>
              <div className="flex mb-10">
                {TESTIMONIALS.map((testimonial, idx) => (
                  <BlurIn
                    key={idx}
                    delay={0.1 + idx * 0.1}
                    duration={0.8}
                    className={`w-24 h-24 p-6 rounded-full ${
                      idx !== 0 ? "-ml-6" : ""
                    } cursor-pointer relative
                  `}
                    onClick={() => handleItemClick(idx)}
                    style={
                      activeTestimonial === idx
                        ? {
                            background: "#333",
                            border: "none",
                            zIndex: 20,
                          }
                        : {
                            background: "#141414",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            zIndex: 10,
                          }
                    }
                  >
                    <svg className="absolute inset-0 w-full h-full rotate-[-90deg] z-10">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="48%"
                        strokeWidth="2"
                        fill="transparent"
                        stroke="transparent"
                        strokeDasharray={3 * Math.PI * 42} // circumference
                        strokeDashoffset={3 * Math.PI * 42} // start at 0%
                        style={
                          activeTestimonial === idx
                            ? {
                                strokeDashoffset: 0,
                                transition: `stroke-dashoffset ${CARD_CHANGE_INTERVAL + 2000}ms linear`,
                                stroke: "#ea2845",
                              }
                            : {}
                        }
                      />
                    </svg>
                    <img
                      src={testimonial.logo}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </BlurIn>
                ))}
              </div>
              <BlurIn
                duration={0.8}
                distance={10}
                delay={0.1}
                ease="power2.out"
              >
                <p className="text-lg leading-8 text-left">
                  {TESTIMONIALS[activeTestimonial ?? 0].text}
                </p>
              </BlurIn>
              <div className="flex items-center gap-4 mt-10 justify-between">
                <div className="flex flex-col text-left">
                  <span className="text-lg leading-[1.6]">
                    <BlurIn
                      duration={0.8}
                      distance={10}
                      delay={0.1}
                      ease="power2.out"
                    >
                      {TESTIMONIALS[activeTestimonial ?? 0].author}
                    </BlurIn>
                  </span>
                  <span className="text-sm text-[rgba(255,255,255,0.75)] font-mono font-light">
                    <BlurIn
                      duration={0.9}
                      distance={10}
                      delay={0.2}
                      ease="power2.out"
                    >
                      {TESTIMONIALS[activeTestimonial ?? 0].title}
                    </BlurIn>
                  </span>
                </div>
                {activeTestimonial !== null && (
                  <div className="text-sm text-[rgba(255,255,255,0.75)] font-mono font-light">
                    <span>
                      {activeTestimonial + 1} / {TESTIMONIALS.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </BlurIn>
      </div>
    </div>
  );
}
