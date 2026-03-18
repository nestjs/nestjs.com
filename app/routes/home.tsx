import { useEffect, useRef, useState } from "react";
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
import { ServiceCard } from "../components/service-card/service-card";
import { ShineText } from "../components/shine-text/shine-text";
import SpotlightCard from "../components/spotlight-card/spotlight-card";
import StackedCards from "../components/stacked-cards/stacked-cards";
import { StaticCodeEditor } from "../components/static-code-editor/static-code-editor";
import { TransparentButton } from "../components/transparent-button/transparent-button";
import { WordByWord } from "../components/word-by-word/word-by-word";
import { BrandsSection } from "../sections/brands-section";
import { CoursesSection } from "../sections/courses-section";
import { EnterpriseSection } from "../sections/enterprise-section";
import { SponsorsSection } from "../sections/sponsors-section";
import { TestimonialsSection } from "../sections/testimonials-section";
import { fetchNestStats, type NestStats } from "../services/nest-stats.service";
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
  const [auroraReady, setAuroraReady] = useState(false);
  const [stats, setStats] = useState<NestStats | null>(null);
  const onMenuItemMouseLeave = () => {
    setHoveringTargetId(null);
  };

  useEffect(() => {
    fetchNestStats().then(setStats);
  }, []);

  return (
    <>
      <div className="p-10">
        <header
          ref={headerRef}
          className={`flex justify-center overflow-hidden relative pb-16 rounded-[32px] 
          bg-gradient-to-r from-[#050303] xl:h-[91vh] min-h-[780px] xl:max-h-[920px]
          via-[#780f20] 
          to-[#050303]
          ${auroraReady ? "opacity-100" : "opacity-0"}`}
        >
          <LazyRender
            className="absolute inset-0 z-0 top-[0px] bottom-[0px] left-[0px] right-[0px] pointer-events-none"
            threshold={0}
            rootMargin="800px 0px 0px 0px"
          >
            <>
              <Aurora onReady={() => setAuroraReady(true)} />
              <NoiseOverlay />
            </>
          </LazyRender>
          <div
            className={`container relative z-10 transition-opacity duration-500`}
          >
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
            <div className="centered text-center pt-26 2xl:pt-32 pb-40 flex flex-col items-center">
              <h1 className="lg:text-[7rem] text-5xl md:text-7xl lg:leading-[0.95] leading-[1.1] font-medium max-w-4xl self-center px-4 sm:px-0">
                <WordByWord>More than just a Node framework</WordByWord>
              </h1>
              <BlurIn delay={0.7}>
                <p className="mt-4 sm:text-sm text-[0.8rem] font-light font-mono opacity-80 max-w-2xl sm:leading-[24px] leading-[22px] lg:p-0 px-8">
                  Nest - the world's fastest-growing Node framework for building
                  efficient, reliable and scalable server-side applications.
                </p>
              </BlurIn>
              <div className="mt-24 2xl:mt-20">
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
          <div className="absolute right-20 bottom-15 text-right sm:leading-10 leading-8 font-mono sm:text-sm text-xs">
            {stats && (
              <BlurIn distance={5} delay={0.25} threshold={0.05}>
                <>
                  <p>
                    <span className="opacity-70 mr-4">Github stars</span>
                    <CountUp
                      to={stats.githubStars}
                      from={0}
                      duration={2}
                      separator=","
                    />
                  </p>
                  <p>
                    <span className="opacity-70 mr-4">Latest release</span>{" "}
                    {stats.latestRelease.date} / {stats.latestRelease.version}
                  </p>
                  <p>
                    <span className="opacity-70 mr-4">Monthly downloads</span>{" "}
                    <CountUp
                      to={stats.monthlyDownloads}
                      from={0}
                      duration={0.5}
                      separator=","
                    />
                  </p>
                </>
              </BlurIn>
            )}
          </div>
        </header>
      </div>
      <div className="flex justify-center md:mt-20 mt-8 mb-0">
        <BrandsSection />
      </div>
      <div className="flex justify-center mt-30">
        <div className="container relative md:px-0 px-5">
          <div className="grid md:grid-cols-[60%_10%_30%] sm:grid-cols-[60%_5%_35%] grid-rows-[auto] gap-0">
            <div>
              <SectionSubheading>What is Nest</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium md:text-5xl sm:text-3xl text-4xl mb-4 md:leading-14 sm:leading-10 leading-12"
                enableBlur
              >
                Nest is a modern framework designed to build efficient, scalable
                web applications
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light sm:pt-10 pt-4"
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
      <div className="pt-50 pb-40 flex justify-center overflow-hidden">
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
            <h4 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-[4rem] sm:leading-[1.15] text-5xl leading-[1.15] font-medium text-center flex">
              When&nbsp;there's&nbsp;no&nbsp;yarn
            </h4>
          </BlurIn>
          <BlurIn
            distance={10}
            duration={2}
            delay={0.2}
            ease="elastic.out(1, 0.5)"
          >
            <h4 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-[4rem] sm:leading-[1.15] text-5xl leading-[1.15] font-medium text-center flex">
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
          <ServiceCard
            title="Deploy, mau!"
            description="Provision and manage your infrastracture on AWS without the hassle and extra DevOps work."
            screenshotUrl="/screenshots/mau.png"
            background="radial-gradient(circle at 50% 50%, rgba(90, 90, 90, 1), rgba(4, 4, 4, 1) 30%)"
            itemsBackground="radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)"
            cardItems={[
              {
                title: "Track key metrics",
                description:
                  "Provision and manage your infrastracture on AWS without the hassle and extra DevOps work.",
              },
              {
                title: "Stream your logs",
                description:
                  "Get real-time visibility into log data, detect anomalies immediately, and respond swiftly.",
              },
              {
                title: "One-click deployment",
                description:
                  "Deploy right from your terminal with our intuitive CLI, designed to seamlessly integrate into your workflow.",
              },
            ]}
          />,
          <ServiceCard
            title="Devtools"
            description="Provision and manage your infrastracture on AWS without the hassle and extra DevOps work."
            screenshotUrl="/screenshots/devtools.png"
            background="radial-gradient(circle, rgb(255, 77, 104), rgb(129 6 24) 30%)"
            lightsOpacity={0.2}
            itemsBackground="radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)"
            cardItems={[
              {
                title: "Intuitive CLI",
                description:
                  "Easily manage your Nest applications with a powerful and user-friendly command-line interface.",
              },
              {
                title: "Real-time monitoring",
                description:
                  "Gain insights into your application's performance and health with real-time monitoring and logging.",
              },
              {
                title: "Seamless integration",
                description:
                  "Integrate effortlessly with popular development tools and platforms to enhance your workflow.",
              },
            ]}
          />,
        ]}
      />
      <EnterpriseSection />
      <div className="flex justify-center my-30 overflow-hidden">
        <div className="container relative md:px-0 px-8">
          <div className="grid grid-rows-[auto] md:grid-cols-[40%_10%_50%] grid-cols-[100%_100%] md:gap-0 gap-16">
            <div>
              <SectionSubheading>Syntax</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium lg:text-5xl md:text-4xl sm:text-5xl text-[2.75rem] mb-8 lg:leading-14 sm:leading-12 leading-12"
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
            <AnimatedContent distance={250} delay={0.1} initialOpacity={0}>
              <StaticCodeEditor />
            </AnimatedContent>
          </div>
        </div>
      </div>
      <CoursesSection />
      <div className="p-10 mt-50">
        <div
          ref={headerRef}
          className="flex justify-center overflow-hidden relative lg:py-30 md:py-20 py-16 px-8 rounded-[32px] 
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
            <div className="grid lg:grid-cols-[60%_30%] grid-rows-[auto] md:gap-0 gap-8">
              <div className="centered text-left lg:pt-30 lg:pb-40 pt-8 pb-12 flex flex-col">
                <BlurIn delay={0.1}>
                  <h3 className="md:text-7xl text-6xl leading-[1.1] font-medium max-w-4xl">
                    Nine lives. <br />
                    Infinite impact.
                  </h3>
                </BlurIn>
              </div>
              <div className="relative flex flex-col">
                <BlurIn delay={0.2}>
                  <div className="flex flex-col">
                    <span className="xl:text-[160px] text-[100px] font-medium leading-[1.2]">
                      <CountUp
                        to={
                          stats
                            ? Math.round(stats.monthlyDownloads / 100000) / 10
                            : 0
                        }
                        from={0}
                        duration={1}
                        separator=","
                      />
                      m
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
                          to={
                            stats ? Math.round(stats.githubStars / 100) / 10 : 0
                          }
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
                        <CountUp
                          to={stats ? stats.releasesCount : 0}
                          from={0}
                          duration={1}
                          separator=","
                        />
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
      <TestimonialsSection />
      <SponsorsSection />
      <FlashlightText
        text="$ npm i -g @nestjs/cli
          <br />$ nest new project-name"
      />
      <div className="p-10 h-[1000px]"></div>
    </>
  );
}
