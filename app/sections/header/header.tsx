import { useRef, useState } from "react";
import { siDiscord, siGithub, siX } from "simple-icons";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import CountUp from "../../components/animations/count-up/count-up";
import { WordByWord } from "../../components/animations/word-by-word/word-by-word";
import Aurora from "../../components/backgrounds/aurora-background/aurora-background";
import NoiseOverlay from "../../components/backgrounds/noise-overlay/noise-overlay";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";
import { TransparentButton } from "../../components/buttons/transparent-button/transparent-button";
import { ShineText } from "../../components/effects/shine-text/shine-text";
import SpotlightCard from "../../components/effects/spotlight-card/spotlight-card";
import LazyRender from "../../components/misc/lazy-render/lazy-render";
import { type NestStats } from "../../services/nest-stats.service";
import classes from "./header.module.scss";

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

export function Header({ stats }: { stats: NestStats | null }) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [hoveringTargetId, setHoveringTargetId] = useState<string | null>(null);
  const [auroraReady, setAuroraReady] = useState(false);
  const onMenuItemMouseLeave = () => {
    setHoveringTargetId(null);
  };

  return (
    <header className="sm:p-10 p-4">
      <div
        ref={headerRef}
        className={`flex justify-center overflow-hidden relative pb-16 sm:rounded-[32px] rounded-[16px] 
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
          className={`container relative z-10 transition-opacity duration-500 2xl:px-0 md:px-8 px-6`}
        >
          <BlurIn delay={0.1}>
            <div className="sm:rounded-[32px] rounded-[16px] xl:mt-16 lg:mt-10 mt-7 relative overflow-hidden">
              <SpotlightCard>
                <div
                  className={`${classes.navPanel} flex items-center p-5 bg-black/60 sm:rounded-[32px] rounded-[16px] justify-between lg:justify-start`}
                >
                  <div className="flex justify-start">
                    <a href="https://nestjs.com">
                      <img src="logo.svg" alt="NestJS Logo" className="h-10" />
                    </a>
                  </div>

                  <nav
                    className={`lg:flex hidden justify-center space-x-10 font-medium text-base flex-1`}
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

                  <div className="lg:flex hidden justify-end space-x-5">
                    <a
                      href="https://github.com/nestjs/nest"
                      target="_blank"
                      className="icon m-l-30 hover:opacity-60 transition-opacity"
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
                      className="icon hover:opacity-60 transition-opacity"
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
                      className="icon hover:opacity-60 transition-opacity"
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

                  <div className="lg:hidden flex justify-end">
                    <div
                      className={`${classes.mobileMenu} relative w-6 h-5 cursor-pointer`}
                      onClick={() => {
                        // Todo
                      }}
                      onMouseEnter={() => setHoveringTargetId("menu")}
                      onMouseLeave={onMenuItemMouseLeave}
                    >
                      <div
                        className={`${classes.mobileMenuLine} absolute top-1/2 left-0 right-0 w-full h-[2px] bg-white rounded transition-transform duration-300`}
                      >
                        <div
                          className={`${classes.mobileMenuLineBefore} absolute top-[-8px] left-0 right-0 w-full h-[2px] bg-white rounded transition-transform duration-300`}
                        ></div>
                        <div
                          className={`${classes.mobileMenuLineAfter} absolute top-[8px] left-0 right-0 w-full h-[2px] bg-white rounded transition-transform duration-300`}
                        ></div>
                      </div>
                    </div>
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
        <div className="absolute right-20 bottom-15 sm:leading-10 leading-8 font-mono sm:text-sm text-xs sm:text-right text-center">
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
      </div>
    </header>
  );
}
