import { useEffect, useRef, useState } from "react";
import ClipboardLogo from "../../assets/testimonials/clipboard/logo.png";
import MunichReLogo from "../../assets/testimonials/munichre/logo.png";
import O2Logo from "../../assets/testimonials/o2/logo.svg";
import PlotlyLogo from "../../assets/testimonials/plotly/logo.png";
import AnimatedArrow from "../../components/animations/animated-arrow/animated-arrow";
import AnimatedContent from "../../components/animations/animated-content/animated-content";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";
import Orb from "../../components/effects/orb/orb";

const CARD_CHANGE_INTERVAL = 15000;

const TESTIMONIALS = [
  {
    logo: O2Logo,
    text: "We use NestJS as the backbone of our internal applications at O2 Czech Republic. It enables us to build scalable backend services quickly while maintaining consistent architecture and standards across teams. With seamless integration across multiple databases and a strong focus on clean architecture, NestJS has significantly improved both our development speed and code quality.",
    author: "Pavla Ďuranová",
    title: "Team Leader, O2",
  },
  {
    logo: ClipboardLogo,
    text: "We use NestJS as the backbone of our healthcare and education staffing marketplace, powering over 30 microservices across a 3.5-million-line TypeScript codebase. NestJS's opinionated module system and structured conventions help maintain consistency as we scale agent workflows. NestJS gave us an architecture that scales for humans and AI.",
    author: "Rocky Warren",
    title: "Senior Staff Engineer, Clipboard Health",
  },
  {
    logo: MunichReLogo,
    text: "When developing modern software solutions for mobile and web, it is crucial to put them on top of loosely coupled, testable and easy maintainable backend systems. To achieve this goal we use since recently the NestJS framework that provides us with an out of the box backend application architecture. Inspired by Angular and written in TypeScript, NestJS fits ideally in our development tool stack. Modularity, dependency injection and custom providers are only some of many useful features we benefit from when using NestJS.",
    author: "Josef Schiestl",
    title: "Global Mobile Solutions, Munich Re",
  },
  {
    logo: PlotlyLogo,
    text: "Plotly chose NestJS as one of the technologies for a major new product initiative. In fact, the move to Node for some of our backend services was a new shift for the engineering team. Trilon was invaluable training the team, establishing best practices early and helping navigate the many dependencies we assembled to deliver a quality build and product.",
    author: "Ben Postlethwaite",
    title: "VP Engineering, Plotly",
  },
];

export function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(
    null,
  );
  const itemUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
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
    <div className="width-full relative flex items-center justify-center text-left sm:my-80 my-40">
      <AnimatedContent
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
        ease="elastic.out"
        duration={10}
      >
        <div className="absolute top-[-30%] right-0 bottom-0 z-0 w-[1000px] h-[1000px]">
          <Orb />
          <div
            className="absolute left-0 right-0 bottom-0 h-full pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top right, #050303 40%, transparent 55%, transparent)",
            }}
          ></div>
        </div>
      </AnimatedContent>
      <div className="container md:px-0 sm:px-8 px-5">
        <SectionSubheading>Testimonials</SectionSubheading>
        <BlurIn duration={0.8} delay={0.15} distance={20} ease="power2.out">
          <h3 className="font-medium md:text-8xl sm:text-7xl text-[3rem] text-left leading-[1.1] max-w-5xl">
            Built for teams that can't afford mistakes
          </h3>
        </BlurIn>
        <div className="flex flex-col mb-10 md:mt-40 mt-30 relative w-full">
          <BlurIn duration={0.8} delay={0.3} distance={20} ease="power2.out">
            <span className="text-[130px] leading-[20px] block ml-[-5px]">
              “
            </span>
          </BlurIn>
          <div className="relative h-[250px]">
            {TESTIMONIALS.map((_, idx) => (
              <div
                className="absolute top-0 left-0 right-0 transition duration-1000"
                key={idx}
                style={{
                  opacity: idx === activeTestimonial ? 1 : 0,
                  transform:
                    idx === activeTestimonial
                      ? "translate(0, 0)"
                      : "translate(20px, 0)",
                  filter: idx === activeTestimonial ? "blur(0px)" : "blur(4px)",
                  zIndex: idx === activeTestimonial ? 10 : 0,
                }}
              >
                <BlurIn
                  duration={0.4}
                  delay={0.5}
                  distance={20}
                  ease="power2.out"
                >
                  <p className="md:text-xl text-[1.1rem] leading-8 text-left max-w-5xl md:min-h-[205px] min-h-[280px]">
                    {TESTIMONIALS[idx].text}
                  </p>
                </BlurIn>
                <div className="flex items-center gap-4 mt-4 justify-between max-w-5xl md:flex-row flex-col">
                  <BlurIn
                    duration={0.4}
                    delay={0.75}
                    distance={20}
                    ease="power2.out"
                  >
                    <div className="relative rounded-[60px] bg-gradient-to-br from-[#959595] to-[#1d1b1b]">
                      <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] bg-[var(--color-bg)] rounded-[60px]" />
                      <div className="relative z-10 py-5 pr-8 pl-30">
                        <div className="absolute p-6 w-[88px] top-0 bottom-0 left-0 aspect-square rounded-full border border-solid border-[rgba(255,255,255,0.2)]">
                          <img
                            src={TESTIMONIALS[idx].logo}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-lg leading-[1.6]">
                            {TESTIMONIALS[idx].author}
                          </span>
                          <span className="text-sm text-[rgba(255,255,255,0.5)] font-mono font-light">
                            {TESTIMONIALS[idx].title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </BlurIn>
                  <div className="text-sm text-[rgba(255,255,255,0.75)] font-mono font-light tracking-[0.5em] flex items-center gap-2 flex-row relative z-15 md:mt-0 mt-4">
                    <span
                      onClick={() => {
                        setActiveTestimonial((prev) =>
                          prev === null
                            ? 0
                            : (prev - 1 + TESTIMONIALS.length) %
                              TESTIMONIALS.length,
                        );
                      }}
                      className="p-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer mr-2"
                    >
                      <AnimatedArrow
                        width={40}
                        reverse
                        onClick={() => {
                          setActiveTestimonial((prev) =>
                            prev === null
                              ? 0
                              : (prev - 1 + TESTIMONIALS.length) %
                                TESTIMONIALS.length,
                          );
                        }}
                      />
                    </span>
                    <BlurIn
                      duration={0.8}
                      delay={1}
                      distance={20}
                      ease="power2.out"
                    >
                      <span>
                        {idx + 1} / {TESTIMONIALS.length}
                      </span>
                    </BlurIn>
                    <span
                      onClick={() => {
                        setActiveTestimonial((prev) =>
                          prev === null ? 0 : (prev + 1) % TESTIMONIALS.length,
                        );
                      }}
                      className="p-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <AnimatedArrow width={40} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <BlurIn duration={0.8} distance={20} ease="power2.out">
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
        </BlurIn> */}
      </div>
    </div>
  );
}
