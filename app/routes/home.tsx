import { useRef, useState } from "react";
import { siDiscord, siGithub, siX } from "simple-icons";
import Aurora from "../components/aurora-header/aurora-header";
import { BlurIn } from "../components/blur-in/blur-in";
import BounceCards from "../components/bounce-cards/bounce-cards";
import CometParticleField from "../components/comet-particle-field/comet-particle-field";
import NoiseOverlay from "../components/noise-overlay/noise-overlay";
import { ScaleOnScroll } from "../components/scale-on-scroll/scale-on-scroll";
import ScrollReveal from "../components/scroll-reveal/scroll-reveal";
import { ShineText } from "../components/shine-text/shine-text";
import SpotlightCard from "../components/spotlight-card/spotlight-card";
import { WordByWord } from "../components/word-by-word/word-by-word";
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

const techLogoStyles = {
  filter: "grayscale(1) brightness(0.8) contrast(1)",
  transition: "filter 0.3s ease-in-out",
  opacity: 0.7,
  maxWidth: "100px",
  maxHeight: "70px",
};

const techLogos = [
  {
    node: (
      <img src="/logos/ibm.svg" alt="IBM" style={techLogoStyles} height={40} />
    ),
    title: "IBM",
    href: "https://www.ibm.com",
  },
  {
    node: (
      <img
        src="/logos/adidas.svg"
        alt="Adidas"
        style={techLogoStyles}
        width={90}
      />
    ),
    title: "Adidas",
    href: "https://www.adidas.com",
  },
  {
    node: (
      <img
        src="/logos/autodesk.png"
        alt="Autodesk"
        style={techLogoStyles}
        height={70}
      />
    ),
    title: "Autodesk",
    href: "https://www.autodesk.com",
  },
  {
    node: (
      <img src="/logos/mercedes.png" alt="Mercedes" style={techLogoStyles} />
    ),
    title: "Mercedes-Benz",
    href: "https://www.mercedes-benz.com",
  },
  {
    node: (
      <img src="/logos/bmw.svg" alt="BMW" style={techLogoStyles} height={70} />
    ),
    title: "BMW",
    href: "https://www.bmw.com",
  },
  {
    node: (
      <img src="/logos/capgemini.svg" alt="Capgemini" style={techLogoStyles} />
    ),
    title: "Capgemini",
    href: "https://www.capgemini.com",
  },
  {
    node: <img src="/logos/gitlab.png" alt="GitLab" style={techLogoStyles} />,
    title: "GitLab",
    href: "https://www.gitlab.com",
  },
  {
    node: (
      <img src="/logos/decathlon.png" alt="Decathlon" style={techLogoStyles} />
    ),
    title: "Decathlon",
    href: "https://www.decathlon.com",
  },
  {
    node: (
      <img
        src="/logos/jetbrains.svg"
        alt="JetBrains"
        style={techLogoStyles}
        width={135}
      />
    ),
    title: "JetBrains",
    href: "https://www.jetbrains.com",
  },
  {
    node: <img src="/logos/red-hat.svg" alt="Red Hat" style={techLogoStyles} />,
    title: "Red Hat",
    href: "https://www.redhat.com",
  },
  {
    node: <img src="/logos/rewe.svg" alt="REWE" style={techLogoStyles} />,
    title: "REWE",
    href: "https://www.rewe-group.com",
  },
  {
    node: (
      <img
        src="/logos/roche-logo.png"
        alt="Roche"
        style={techLogoStyles}
        height={55}
      />
    ),
    title: "Roche",
    href: "https://www.roche.com",
  },
  {
    node: <img src="/logos/sanofi.png" alt="Sanofi" style={techLogoStyles} />,
    title: "Sanofi",
    href: "https://www.sanofi.com",
  },
  {
    node: (
      <img
        src="/logos/societe-generale-logo.png"
        alt="Société Générale"
        style={techLogoStyles}
      />
    ),
    title: "Société Générale",
    href: "https://www.societegenerale.com",
  },
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
          className="flex justify-center overflow-hidden relative rounded-[32px] 
          bg-gradient-to-r from-[#050303] 
          via-[#780f20] 
          to-[#050303]"
        >
          <Aurora />
          <NoiseOverlay />
          {/* <AnimatedLine left="10%" top="50%" />
        <AnimatedLine left="90%" top="40%" delay={1} /> */}
          <div className="container relative z-10">
            <BlurIn delay={0.1}>
              <div className="rounded-[32px] mt-8 relative overflow-hidden">
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
                              ? "text-white hover:opacity-100 duration-200"
                              : "opacity-30 duration-200"
                          }
                          onMouseEnter={() => setHoveringTargetId(item.id)}
                          onMouseLeave={onMenuItemMouseLeave}
                        >
                          {item.label}
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
              <h1 className="text-8xl font-medium max-w-4xl self-center">
                <WordByWord>More than just a Node framework</WordByWord>
              </h1>
              <BlurIn delay={0.7}>
                <p className="mt-4 text-sm font-light font-mono opacity-80 max-w-2xl leading-[24px]">
                  Nest - the world's fastest-growing Node framework for building
                  efficient, reliable and scalable server-side applications.
                </p>
              </BlurIn>
              <div className="mt-30">
                <BlurIn delay={1} distance={10}>
                  <>
                    <a
                      href="https://docs.nestjs.com/"
                      className="btn bg-white rounded text-black font-bold pt-5 pb-5 pl-7 pr-7 rounded-[20px]"
                    >
                      Get started
                    </a>
                    <a
                      href="https://github.com/nestjs/nest"
                      className="btn bg-secondary text-white font-bold pt-5 pb-5 pl-7 pr-7 rounded-[20px]"
                    >
                      Github
                    </a>
                  </>
                </BlurIn>
              </div>
            </div>
          </div>
          <div className="absolute right-15 bottom-15 text-right leading-11 text-sm font-mono">
            <BlurIn distance={5} delay={0.5}>
              <>
                <p>
                  <span className="opacity-70 mr-4 font-sans">
                    Github stars
                  </span>{" "}
                  73,840
                </p>
                <p>
                  <span className="opacity-70 mr-4 font-sans">
                    Latest release
                  </span>{" "}
                  Aug 7 / 11.1.9
                </p>
                <p>
                  <span className="opacity-70 mr-4 font-sans">
                    Monthly downloads
                  </span>{" "}
                  24,200,000
                </p>
              </>
            </BlurIn>
          </div>
        </header>
      </div>
      {/* <div className="height-[200px] relative overflow-hidden mt-20 mb-20">
        <LogoLoop
          logos={techLogos}
          speed={30}
          direction="left"
          logoHeight={24}
          gap={60}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#050303"
          ariaLabel="Technology partners"
        />
      </div> */}
      <div className="flex justify-center mt-30">
        <div className="container relative">
          <div className="grid grid-cols-[60%_10%_30%] gap-0">
            <ScrollReveal
              ElementTag="h2"
              className="font-medium text-5xl mb-4 leading-14"
              enableBlur
            >
              Nest is a modern framework designed to build efficient, scalable
              web applications
            </ScrollReveal>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light"
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
              icon: <img src="/icons/modules.png" />,
              title: "Modules",
              description:
                "Streamline upkeep by organizing applications into self-contained modules.",
            },
            {
              icon: <img src="/icons/enterprise-ready.png" />,
              title: "Dependency Injection",
              description:
                "Boost code maintainability and testability with built-in dependency injection.",
            },
            {
              icon: <img src="/icons/modules.png" />,
              title: "Type Safety",
              description:
                "Mitigate errors through the robust type safety features of TypeScript.",
            },
            {
              icon: <img src="/icons/enterprise-ready.png" />,
              title: "Enterprise Ready",
              description:
                "Trusted by thousands of leading companies and organizations worldwide.",
            },
            {
              icon: <img src="/icons/modules.png" />,
              title: "Decorators",
              description:
                "Enhance code readability and structure with TypeScript decorators.",
            },
            {
              icon: <img src="/icons/enterprise-ready.png" />,
              title: "Microservices",
              description:
                "Build scalable and efficient microservice architectures with ease.",
            },
            {
              icon: <img src="/icons/modules.png" />,
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
      <ScaleOnScroll
        background={
          <div
            style={{
              width: "100%",
              height: "100vh",
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              pointerEvents: "none",
            }}
          >
            <CometParticleField />
          </div>
        }
      >
        <BlurIn distance={10} duration={2} ease="elastic.out(1, 0.5)">
          <ShineText
            ElementTag="h4"
            className="text-9xl font-medium text-center flex"
          >
            Work faster.
          </ShineText>
        </BlurIn>
        <BlurIn
          distance={10}
          duration={2}
          delay={0.2}
          ease="elastic.out(1, 0.5)"
        >
          <ShineText
            ElementTag="h4"
            className="text-9xl font-medium text-center flex"
          >
            Build smarter.
          </ShineText>
        </BlurIn>
      </ScaleOnScroll>
      <div className="p-10 h-[1000px]"></div>
    </>
  );
}
