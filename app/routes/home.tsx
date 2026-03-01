import { useRef, useState } from "react";
import { siDiscord, siGithub, siX } from "simple-icons";
import AnimatedContent from "../components/animated-content/animated-content";
import Aurora from "../components/aurora-header/aurora-header";
import { BlurIn } from "../components/blur-in/blur-in";
import BounceCards from "../components/bounce-cards/bounce-cards";
import CountUp from "../components/count-up/count-up";
import FlashlightText from "../components/flashlight-text/flashlight-text";
import LazyRender from "../components/lazy-render/lazy-render";
import { LettersReveal } from "../components/letters-reveal/letters-reveal";
import LightRays from "../components/light-rays/light-rays";
import NoiseOverlay from "../components/noise-overlay/noise-overlay";
import { PrimaryButton } from "../components/primary-button/primary-button";
import ScrollReveal from "../components/scroll-reveal/scroll-reveal";
import { SecondaryButton } from "../components/secondary-button/secondary-button";
import { SectionSubheading } from "../components/section-subheading/section-subheading";
import { ShineText } from "../components/shine-text/shine-text";
import SpotlightCard from "../components/spotlight-card/spotlight-card";
import StackedCards from "../components/stacked-cards/stacked-cards";
import { StaticCodeEditor } from "../components/static-code-editor/static-code-editor";
import { TransparentButton } from "../components/transparent-button/transparent-button";
import { WordByWord } from "../components/word-by-word/word-by-word";
import { BrandsSection } from "../sections/brands-section";
import { CoursesSection } from "../sections/courses-section";
import { EnterpriseSection } from "../sections/enterprise-section";
import type { Route } from "./+types/home";
import classes from "./home.module.scss";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NestJS - A progressive Node.js framework" },
    {
      name: "description",
      content:
        "NestJS is a framework for building efficient, scalable Node.js web applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).",
    },
  ];
}

const MENU_ITEMS = [
  { id: "docs", label: "Docs", href: "https://docs.nestjs.com" },
  {
    id: "courses",
    label: "Official courses",
    href: "https://courses.nestjs.com",
  },
  { id: "tools", label: "Tools", href: "#" },
  {
    id: "enterprise",
    label: "Enterprise",
    href: "https://enterprise.nestjs.com",
  },
  { id: "jobs", label: "Jobs", href: "https://jobs.nestjs.com" },
];

export default function Home() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [hoveringTargetId, setHoveringTargetId] = useState<string | null>(null);
  const onMenuItemMouseLeave = () => {
    setHoveringTargetId(null);
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setShowTooltip(true);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setShowTooltip(false);
  };

  return (
    <>
      <div className="p-10">
        <header
          ref={headerRef}
          className="flex justify-center overflow-hidden relative pb-16 rounded-[32px] 
          bg-gradient-to-r from-[#050303] 
          via-[#780f20] 
          to-[#050303]"
        >
          <LazyRender
            className="absolute inset-0 z-0 top-[0px] bottom-[0px] left-[0px] right-[0px] pointer-events-none"
            threshold={0}
            rootMargin="800px 0px 0px 0px"
          >
            <>
              <Aurora />
              <NoiseOverlay />
            </>
          </LazyRender>
          <div className="container relative z-10">
            <BlurIn delay={0.1}>
              <div className="rounded-[32px] mt-16 relative overflow-hidden">
                <SpotlightCard>
                  <div
                    className={`${classes.navPanel} flex items-center p-5 bg-black/60 rounded-[32px]`}
                  >
                    <div className="flex justify-start">
                      <a href="https://nestjs.com">
                        <img
                          src="logo.svg"
                          alt="NestJS Logo"
                          className="h-10"
                        />
                      </a>
                    </div>

                    <nav
                      className={`flex justify-center space-x-10 font-medium text-base flex-1`}
                    >
                      {MENU_ITEMS.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          className={
                            item.id === hoveringTargetId ||
                            hoveringTargetId === null
                              ? "text-white hover:opacity-100 duration-300"
                              : "opacity-50 duration-300 blur-[1px]"
                          }
                          onMouseEnter={() => setHoveringTargetId(item.id)}
                          onMouseLeave={onMenuItemMouseLeave}
                        >
                          {item.id === hoveringTargetId ? (
                            <ShineText>{item.label}</ShineText>
                          ) : (
                            item.label
                          )}
                        </a>
                      ))}
                    </nav>

                    <div className="flex justify-end space-x-5">
                      <a
                        href="https://github.com/nestjs/nest"
                        target="_blank"
                        className="icon m-l-30"
                      >
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-current color-text"
                        >
                          <path d={siGithub.path} />
                        </svg>
                      </a>
                      <a
                        href="https://twitter.com/nestframework"
                        target="_blank"
                        className="icon"
                      >
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 color-text fill-current"
                        >
                          <path d={siX.path} />
                        </svg>
                      </a>
                      <a
                        href="https://linkedin.com/company/19078346"
                        target="_blank"
                        className="icon"
                      >
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-current color-text"
                        >
                          <path d={siDiscord.path} />
                        </svg>
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </BlurIn>
            <div className="centered text-center pt-30 pb-40 flex flex-col items-center">
              <h1 className="text-[7rem] leading-[0.95] font-medium max-w-4xl self-center">
                <WordByWord>More than just a Node framework</WordByWord>
              </h1>
              <BlurIn delay={0.7}>
                <p className="mt-4 text-sm font-light font-mono opacity-80 max-w-2xl leading-[24px]">
                  Nest - the world's fastest-growing Node framework for building
                  efficient, reliable and scalable server-side applications.
                </p>
              </BlurIn>
              <div className="mt-24">
                <BlurIn delay={1} distance={10}>
                  <>
                    <PrimaryButton
                      href="https://docs.nestjs.com/"
                      className="mr-5"
                    >
                      Get started
                    </PrimaryButton>
                    <TransparentButton href="https://github.com/nestjs/nest">
                      Github
                    </TransparentButton>
                  </>
                </BlurIn>
              </div>
            </div>
          </div>
          <div className="absolute right-20 bottom-15 text-right leading-10 text-sm font-mono">
            <BlurIn distance={5} delay={0.25} threshold={0.05}>
              <>
                <p>
                  <span className="opacity-70 mr-4">Github stars</span>
                  <CountUp to={73840} from={0} duration={2} separator="," />
                </p>
                <p>
                  <span className="opacity-70 mr-4">Latest release</span> Aug 7
                  / 11.1.9
                </p>
                <p>
                  <span className="opacity-70 mr-4">Monthly downloads</span>{" "}
                  <CountUp
                    to={24200000}
                    from={0}
                    duration={0.5}
                    separator=","
                  />
                </p>
              </>
            </BlurIn>
          </div>
        </header>
      </div>
      <div className="flex justify-center mt-20 mb-0">
        <BrandsSection />
      </div>
      <div className="flex justify-center mt-30">
        <div className="container relative">
          <div className="grid grid-cols-[60%_10%_30%] gap-0">
            <div>
              <SectionSubheading>What is Nest</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium text-5xl mb-4 leading-14"
                enableBlur
              >
                Nest is a modern framework designed to build efficient, scalable
                web applications
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
              ElementTag="p"
              enableBlur
            >
              Built on TypeScript and Node.js, Nest blends best programming
              practices with a clean, modular architecture, keeping projects
              organized and easy to maintain.
            </ScrollReveal>
          </div>
        </div>
      </div>
      <div className="mt-50 mb-40 flex justify-center">
        <BounceCards
          className="custom-bounceCards"
          cards={[
            {
              icon: <img src="/features-icons/modules.png" />,
              title: "Modules",
              description:
                "Streamline upkeep by organizing applications into self-contained modules.",
            },
            {
              icon: <img src="/features-icons/dependency.png" />,
              title: "Dependency Injection",
              description:
                "Boost code maintainability and testability with built-in dependency injection.",
            },
            {
              icon: <img src="/features-icons/typesafety.png" />,
              title: "Type Safety",
              description:
                "Mitigate errors through the robust type safety features of TypeScript.",
            },
            {
              icon: <img src="/features-icons/enterprise-ready.png" />,
              title: "Enterprise Ready",
              description:
                "Trusted by thousands of leading companies and organizations worldwide.",
            },
            {
              icon: <img src="/features-icons/scalability.png" />,
              title: "Decorators",
              description:
                "Enhance code readability and structure with TypeScript decorators.",
            },
            {
              icon: <img src="/features-icons/microservices.png" />,
              title: "Microservices",
              description:
                "Build scalable and efficient microservice architectures with ease.",
            },
            {
              icon: <img src="/features-icons/webapps.png" />,
              title: "Web Apps",
              description:
                "Create dynamic and responsive web applications effortlessly.",
            },
          ]}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          enableHover
        />
      </div>
      <LettersReveal ElementTag="h4">
        <section className="px-20">
          <BlurIn distance={10} duration={2} ease="elastic.out(1, 0.5)">
            <h4 className="text-9xl font-medium text-center flex">
              When&nbsp;there's&nbsp;no&nbsp;yarn
            </h4>
          </BlurIn>
          <BlurIn
            distance={10}
            duration={2}
            delay={0.2}
            ease="elastic.out(1, 0.5)"
          >
            <h4 className="text-9xl font-medium text-center flex">
              we&nbsp;build&nbsp;our&nbsp;own&nbsp;toys
            </h4>
          </BlurIn>
        </section>
      </LettersReveal>
      <div className="relative centered text-center flex items-center flex-col">
        <ScrollReveal
          ElementTag="h4"
          className="text-sm font-mono opacity-80 max-w-2xl leading-8 font-light p-10"
          wordAnimationEnd="bottom 40%"
          enableBlur
        >
          Explore our tools built to supercharge your Nest workflow. Discover
          solutions we created to streamline development, automate tasks, and
          help you ship faster with greater confidence.
        </ScrollReveal>
      </div>
      <StackedCards
        cards={[
          <div className="relative flex flex-col items-center h-[98vh] rounded-[24px] overflow-hidden">
            <div className="relative flex flex-grow-1 w-full">
              <div
                className="text-center flex-grow-1 min-h-[250px] px-16 py-16 pb-0 relative z-10 overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(90, 90, 90, 1), rgba(4, 4, 4, 1) 30%)`,
                }}
              >
                <div className="relative z-10">
                  <BlurIn duration={0.5} ease="power2.out">
                    <h3 className="text-6xl font-medium mb-6">Deploy, mau!</h3>
                  </BlurIn>
                  <BlurIn delay={0.1} duration={0.5} ease="power2.out">
                    <h5 className="font-mono text-sm font-light max-w-xl mx-auto leading-6">
                      Provision and manage your infrastracture on AWS without
                      the hassle and extra DevOps work.
                    </h5>
                  </BlurIn>
                </div>
                <BlurIn
                  delay={0.2}
                  duration={0.5}
                  ease="power2.out"
                  className="relative z-2 max-h-[35vh]"
                >
                  <div
                    className="p-4 pb-0 max-w-[90%] relative mx-auto mt-10 z-2
                border border-1 border-[rgba(255,255,255,0.1)] rounded-tl-[20px] rounded-tr-[20px]
                after:absolute after:inset-0 after:border after:border-[rgba(255,255,255,0.1)] after:rounded-tl-[24px] after:rounded-tr-[24px] after:top-[-8px] after:left-[-8px] after:right-[-8px] after:bottom-[-8px] after:z-0
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/15 before:to-white/5 before:pointer-events-none before:top-[-8px] before:left-[-8px] before:right-[-8px] before:bottom-[-8px] before:rounded-tl-[24px] before:rounded-tr-[24px] before:z-0"
                  >
                    <div className="absolute inset-0 rounded-tl-[20px] rounded-tr-[20px] bg-gradient-to-t from-white/15 to-white/5 top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] z-0"></div>
                    <img
                      src="/screenshots/mau.png"
                      className="rounded-tl-[12px] rounded-tr-[12px] z-2 relative"
                    />
                  </div>
                </BlurIn>
                <div className="absolute inset-0 z-0 left-0 right-0 top-0 bottom-0 z-1">
                  <LightRays
                    raysOrigin="bottom-left"
                    raysColor="#fff"
                    raysSpeed={1}
                    lightSpread={50}
                    rayLength={25}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.25}
                    distortion={0.05}
                    opacity={0.4}
                  />
                </div>
                <div className="absolute inset-0 z-0 left-0 right-0 top-0 bottom-0 z-3">
                  <div
                    className="absolute w-[40%] h-[20%] rotate-300 bg-gradient-to-r from-[#fff] to-[rgba(255,255,255,0.1)] 
                  right-[-20%] bottom-[20%] scale-x-200 perspective-500 perspective-origin-top-left
                  rounded-[80px] filter blur-3xl opacity-75
                  animate-blob"
                  />
                </div>
                <div
                  className="absolute top-0 bottom-0 left-0 right-0 z-[101] cursor-none"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {}}
                ></div>
                <div
                  className={`absolute rounded-full bg-white text-black w-[192px] h-[192px] 
          z-100 flex items-center justify-center transform -translate-x-1/2
          ${showTooltip ? "scale-100" : "scale-0"} transition-transform duration-200 pointer-events-none`}
                  style={{ left: tooltipPos.x, top: tooltipPos.y }}
                >
                  <span
                    className={`font-semibold text-base ${
                      showTooltip ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300 delay-200
          `}
                  >
                    Check it out
                  </span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row p-14 w-full flex-grow-1"
              style={{
                background: `radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)`,
              }}
            >
              <div className="grid grid-cols-3 gap-10 flex-grow-1 flex min-h-[100px] relative">
                <div className="relative">
                  <h4 className="text-xl font-medium mb-4">
                    Track key metrics
                  </h4>
                  <p className="text-sm leading-6 font-light font-mono">
                    Provision and manage your infrastracture on AWS without the
                    hassle and extra DevOps work.
                  </p>
                  <div className="progress-bar mt-4 w-full bg-[rgba(255,255,255,0.1)] rounded-[4px] h-[2px] absolute bottom-0 left-0 right-0 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#222] to-[#fff] rounded-[4px] h-[2px] animate-progressBar"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <h4 className="text-xl font-medium mb-4 opacity-25">
                    Stream your logs
                  </h4>
                  <p className="text-sm leading-6 font-light font-mono opacity-25">
                    Get real-time visibility into log data, detect anomalies
                    immediately, and respond swiftly.
                  </p>
                  <div className="progress-bar mt-4 w-full bg-[rgba(255,255,255,0.1)] rounded-[4px] h-[2px] absolute bottom-0 left-0 right-0 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#222] to-[#fff] rounded-[4px] h-[2px] animate-progressBar" />
                  </div>
                </div>
                <div className="relative">
                  <h4 className="text-xl font-medium mb-4 opacity-25">
                    Traffic insights
                  </h4>
                  <p className="text-sm leading-6 font-light font-mono opacity-25">
                    Analyze traffic patterns, identify bottlenecks, and optimize
                    performance with ease.
                  </p>
                  <div className="progress-bar mt-4 w-full bg-[rgba(255,255,255,0.1)] rounded-[4px] h-[2px] absolute bottom-0 left-0 right-0 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#222] to-[#fff] rounded-[4px] h-[2px] animate-progressBar" />
                  </div>
                </div>
              </div>
            </div>
          </div>,
          <div className="relative flex flex-col items-center h-[98vh] rounded-[24px] overflow-hidden">
            <div className="relative flex flex-grow-1 w-full">
              <div
                className="text-center flex-grow-1 min-h-[250px] px-16 py-16 pb-0 relative z-10 overflow-hidden"
                style={{
                  background: `radial-gradient(circle, rgb(255 118 139), rgb(110 0 16) 30%)`,
                }}
              >
                <div className="relative z-10">
                  <BlurIn duration={0.5} ease="power2.out">
                    <h3 className="text-6xl font-medium mb-6">Devtools</h3>
                  </BlurIn>
                  <BlurIn delay={0.1} duration={0.5} ease="power2.out">
                    <h5 className="font-mono text-sm font-light max-w-xl mx-auto leading-6">
                      Provision and manage your infrastracture on AWS without
                      the hassle and extra DevOps work.
                    </h5>
                  </BlurIn>
                </div>
                <BlurIn
                  delay={0.2}
                  duration={0.5}
                  ease="power2.out"
                  className="relative z-2 max-h-[35vh]"
                >
                  <div
                    className="p-4 pb-0 max-w-[90%] relative mx-auto mt-10 z-2
                border border-1 border-[rgba(255,255,255,0.1)] rounded-tl-[20px] rounded-tr-[20px]
                after:absolute after:inset-0 after:border after:border-[rgba(255,255,255,0.1)] after:rounded-tl-[24px] after:rounded-tr-[24px] after:top-[-8px] after:left-[-8px] after:right-[-8px] after:bottom-[-8px] after:z-0
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/15 before:to-white/5 before:pointer-events-none before:top-[-8px] before:left-[-8px] before:right-[-8px] before:bottom-[-8px] before:rounded-tl-[24px] before:rounded-tr-[24px] before:z-0"
                  >
                    <div className="absolute inset-0 rounded-tl-[20px] rounded-tr-[20px] bg-gradient-to-t from-white/15 to-white/5 top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] z-0"></div>
                    <img
                      src="/screenshots/devtools.png"
                      className="rounded-tl-[12px] rounded-tr-[12px] z-2 relative"
                    />
                  </div>
                </BlurIn>
                <div className="absolute inset-0 z-0 left-0 right-0 top-0 bottom-0 z-1">
                  <LightRays
                    raysOrigin="bottom-left"
                    raysColor="#fff"
                    raysSpeed={1}
                    lightSpread={50}
                    rayLength={25}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.25}
                    distortion={0.05}
                    opacity={0.3}
                  />
                </div>
                <div className="absolute inset-0 z-0 left-0 right-0 top-0 bottom-0 z-3">
                  <div
                    className="absolute w-[40%] h-[20%] rotate-300 bg-gradient-to-r from-[#fff] to-[rgba(255,255,255,0.1)] 
                  right-[-20%] bottom-[20%] scale-x-200 perspective-500 perspective-origin-top-left
                  rounded-[80px] filter blur-3xl opacity-75
                  animate-blob"
                  />
                </div>
                {/* <div
                  className="absolute top-0 bottom-0 left-0 right-0 z-[101] cursor-none"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {}}
                ></div> */}
                {/* <div
                  className={`absolute rounded-full bg-white text-black w-[192px] h-[192px] 
          z-100 flex items-center justify-center transform -translate-x-1/2
          ${showTooltip ? "scale-100" : "scale-0"} transition-transform duration-200 pointer-events-none`}
                  style={{ left: tooltipPos.x, top: tooltipPos.y }}
                >
                  <span
                    className={`font-semibold text-base ${
                      showTooltip ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300 delay-200
          `}
                  >
                    Check it out
                  </span>
                </div> */}
              </div>
            </div>
            <div
              className="flex flex-row p-14 w-full flex-grow-1"
              style={{
                background: `radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)`,
              }}
            >
              <div className="grid grid-cols-3 gap-10 flex-grow-1 flex min-h-[100px] relative">
                <div className="relative">
                  <h4 className="text-xl font-medium mb-4">
                    Track key metrics
                  </h4>
                  <p className="text-sm leading-6 font-light font-mono">
                    Provision and manage your infrastracture on AWS without the
                    hassle and extra DevOps work.
                  </p>
                  <div className="progress-bar mt-4 w-full bg-[rgba(255,255,255,0.1)] rounded-[4px] h-[2px] absolute bottom-0 left-0 right-0 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#222] to-[#fff] rounded-[4px] h-[2px] animate-progressBar"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <h4 className="text-xl font-medium mb-4 opacity-25">
                    Stream your logs
                  </h4>
                  <p className="text-sm leading-6 font-light font-mono opacity-25">
                    Get real-time visibility into log data, detect anomalies
                    immediately, and respond swiftly.
                  </p>
                  <div className="progress-bar mt-4 w-full bg-[rgba(255,255,255,0.1)] rounded-[4px] h-[2px] absolute bottom-0 left-0 right-0 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#222] to-[#fff] rounded-[4px] h-[2px] animate-progressBar" />
                  </div>
                </div>
                <div className="relative">
                  <h4 className="text-xl font-medium mb-4 opacity-25">
                    Traffic insights
                  </h4>
                  <p className="text-sm leading-6 font-light font-mono opacity-25">
                    Analyze traffic patterns, identify bottlenecks, and optimize
                    performance with ease.
                  </p>
                  <div className="progress-bar mt-4 w-full bg-[rgba(255,255,255,0.1)] rounded-[4px] h-[2px] absolute bottom-0 left-0 right-0 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#222] to-[#fff] rounded-[4px] h-[2px] animate-progressBar" />
                  </div>
                </div>
              </div>
            </div>
          </div>,
        ]}
      />
      <div className="width-full h-[50vh] relative"></div>
      <EnterpriseSection />
      <div className="flex justify-center mt-30 mb-30">
        <div className="container relative">
          <div className="grid grid-cols-[40%_10%_50%] gap-0">
            <div>
              <SectionSubheading>Syntax</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium text-5xl mb-8 leading-14"
                enableBlur
              >
                Build your app with most elegant and intuitive syntax.
              </ScrollReveal>
              <BlurIn>
                <SecondaryButton
                  href="https://docs.nestjs.com/"
                  className="mt-10"
                >
                  Official documentation
                </SecondaryButton>
              </BlurIn>
            </div>
            <span></span>
            <AnimatedContent distance={50} initialOpacity={0}>
              <StaticCodeEditor />
            </AnimatedContent>
          </div>
        </div>
      </div>
      <CoursesSection />
      <div className="p-10 mt-50">
        <div
          ref={headerRef}
          className="flex justify-center overflow-hidden relative py-30 px-8 rounded-[32px] 
          bg-gradient-to-r from-[#050303] 
          via-[#780f20] 
          to-[#050303]"
        >
          <LazyRender
            className="absolute inset-0 z-0 top-[0px] bottom-[0px] left-[0px] right-[0px] pointer-events-none"
            threshold={0}
            rootMargin="800px 0px 0px 0px"
          >
            <>
              <Aurora />
              <NoiseOverlay />
            </>
          </LazyRender>
          <div className="container relative z-10">
            <div className="grid grid-cols-[60%_30%] gap-0">
              <div className="centered text-left pt-30 pb-40 flex flex-col">
                <BlurIn delay={0.1}>
                  <h3 className="text-7xl leading-[1.1] font-medium max-w-4xl">
                    Nine lives. <br />
                    Infinite impact.
                  </h3>
                </BlurIn>
              </div>
              <div className="relative flex flex-col">
                <BlurIn delay={0.2}>
                  <div className="flex flex-col">
                    <span className="text-[160px] font-medium leading-[1.2]">
                      <CountUp to={13.3} from={0} duration={1} separator="," />m
                    </span>
                    <span className="font-mono text-xs font-light">
                      Monthly downloads
                    </span>
                  </div>
                </BlurIn>
                <div className="flex flex-row mt-20">
                  <BlurIn delay={0.1}>
                    <div className="flex flex-col text-left flex-grow-1">
                      <span className="text-5xl font-medium">
                        <CountUp
                          to={73.1}
                          from={0}
                          duration={1}
                          separator=","
                        />
                        k
                      </span>
                      <span className="font-mono text-xs leading-6 font-light mt-2">
                        Github Stars
                      </span>
                    </div>
                  </BlurIn>
                  <BlurIn delay={0.2}>
                    <div className="flex flex-col ml-20 text-left flex-grow-1">
                      <span className="text-5xl font-medium">
                        <CountUp to={138} from={0} duration={1} separator="," />
                      </span>
                      <span className="font-mono text-xs leading-6 font-light mt-2">
                        Releases
                      </span>
                    </div>
                  </BlurIn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    textStroke: "2px #1A1A1A",
                    "-webkitTextStroke": "2px #1A1A1A",
                  } as React.CSSProperties
                }
              >
                “
              </span>
              <div className="flex mb-10">
                <div className="w-20 h-20 bg-[#141414] rounded-full border border-white/10 z-0" />
                <div className="-ml-6 w-20 h-20 bg-[#141414] rounded-full border border-white/10 z-0" />
                <div className="-ml-6 w-20 h-20 bg-[#141414] rounded-full border border-white/10 z-0" />
                <div className="-ml-6 w-20 h-20 bg-[#141414] rounded-full border border-white/10 z-0" />
              </div>
              <p className="text-xl leading-8 text-left">
                NestJS has been a game-changer for our development process. The
                modular architecture and built-in features have allowed us to
                build scalable and maintainable applications with ease. NestJS
                has been a game-changer for our development process. The modular
                architecture and built-in features have allowed us to build
                scalable and maintainable applications with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-50 mb-50">
        <div className="container relative flex">
          <div className="max-w-[800px]">
            <SectionSubheading>Support</SectionSubheading>
            <ScrollReveal
              ElementTag="h2"
              className="font-medium text-8xl leading-25"
              enableBlur
            >
              Let's build Nest together
            </ScrollReveal>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
              ElementTag="p"
              enableBlur
            >
              Support the ongoing development of Nest and help keep the
              framework your product relies on actively maintained, evolving,
              and giving back to the entire community.
            </ScrollReveal>
          </div>
          <div className="w-[300px] justify-end flex flex-col items-center ml-auto">
            <BlurIn>
              <PrimaryButton href="https://docs.nestjs.com/" className="mt-10">
                Become a sponsor
              </PrimaryButton>
            </BlurIn>
          </div>
          <span></span>
        </div>
      </div>
      <div className="flex justify-center mt-50 mb-50">
        <div
          className="container relative cursor-pointer text-center"
          onClick={() => {
            navigator.clipboard.writeText(
              `$ npm i -g @nestjs/cli\n$ nest new project-name`,
            );
          }}
        >
          <FlashlightText
            text="$ npm i -g @nestjs/cli
              <br />$ nest new project-name"
          />
          <div className="mt-15 opacity-75">
            <SectionSubheading>Click. Copy. Build</SectionSubheading>
          </div>
        </div>
      </div>
      <div className="p-10 h-[1000px]"></div>
    </>
  );
}
