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
      <StackedCards />
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
        <header
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
                <h3 className="text-7xl leading-[1.1] font-medium max-w-4xl">
                  Nine lives. <br />
                  Infinite impact.
                </h3>
              </div>
              <div className="relative flex flex-col">
                <div className="flex flex-col">
                  <span className="text-[160px] font-medium leading-[1.2]">
                    <CountUp to={13.3} from={0} duration={1} separator="," />m
                  </span>
                  <span className="font-mono text-xs font-light">
                    Monthly downloads
                  </span>
                </div>
                <div className="flex flex-row mt-20">
                  <div className="flex flex-col text-left flex-grow-1">
                    <span className="text-5xl font-medium">
                      <CountUp to={73.1} from={0} duration={1} separator="," />k
                    </span>
                    <span className="font-mono text-xs leading-6 font-light mt-2">
                      Github Stars
                    </span>
                  </div>
                  <div className="flex flex-col ml-20 text-left flex-grow-1">
                    <span className="text-5xl font-medium">
                      <CountUp to={138} from={0} duration={1} separator="," />
                    </span>
                    <span className="font-mono text-xs leading-6 font-light mt-2">
                      Releases
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
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
