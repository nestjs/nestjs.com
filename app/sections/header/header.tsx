import { ChevronDown } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { siDiscord, siGithub, siX } from "simple-icons";
import LinkedinIcon from "../../assets/icons/linkedin.svg";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import CountUp from "../../components/animations/count-up/count-up";
import { WordByWord } from "../../components/animations/word-by-word/word-by-word";
import Aurora from "../../components/backgrounds/aurora-background/aurora-background";
import NoiseOverlay from "../../components/backgrounds/noise-overlay/noise-overlay";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";
import { TransparentButton } from "../../components/buttons/transparent-button/transparent-button";
import { MobileMenu } from "../../components/domain/mobile-menu/mobile-menu";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";
import { ShineText } from "../../components/effects/shine-text/shine-text";
import SpotlightCard from "../../components/effects/spotlight-card/spotlight-card";
import LazyRender from "../../components/misc/lazy-render/lazy-render";
import { type NestStats } from "../../services/nest-stats.service";
import classes from "./header.module.scss";

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  children?: {
    id: string;
    label: string;
    href: string;
    description: string;
    thumbnail: string;
  }[];
};

const HIDE_SUBMENU_DELAY = 2000; // ms
const INITIAL_SUBMENU_STATE = {
  state: "hidden",
  coords: { x: 0, y: 0 },
  items: null,
} as const;

export function Header({
  stats,
  menuItems,
  shrink = true,
  heading = "More than just a Node framework",
  subheading = "Nest - the world's fastest-growing Node framework for building efficient, reliable and scalable server-side applications.",
  breadcrumb,
  actions = (
    <>
      <PrimaryButton
        href="https://docs.nestjs.com/"
        className="mr-5"
        target="_blank"
      >
        Get started
      </PrimaryButton>
      <TransparentButton href="https://github.com/nestjs" target="_blank">
        Github
      </TransparentButton>
    </>
  ),
}: {
  stats: NestStats | null;
  heading?: string;
  subheading?: string;
  breadcrumb?: string;
  actions?: React.ReactNode;
  shrink?: boolean;
  menuItems: Array<MenuItem>;
}) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [hoveringTarget, setHoveringTarget] = useState<MenuItem | null>(null);
  const [submenu, setSubmenu] = useState<{
    state: "hidden" | "visible";
    coords: { x: number; y: number };
    items: MenuItem["children"] | null;
  }>(INITIAL_SUBMENU_STATE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hideSubmenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [auroraReady, setAuroraReady] = useState(false);

  const onMenuItemMouseEnter = useCallback(
    (item: MenuItem, e: React.MouseEvent<HTMLDivElement>) => {
      setHoveringTarget(item);

      if (item.children) {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetY = 0;
        const scrollTop = window.scrollY || window.pageYOffset;

        setSubmenu({
          state: "visible",
          items: item.children,
          coords: {
            x: rect.left,
            y: rect.bottom + offsetY + scrollTop,
          },
        });
      }
    },
    [],
  );

  const scheduleHideSubmenu = useCallback((item: MenuItem) => {
    if (hideSubmenuTimeoutRef.current) {
      clearTimeout(hideSubmenuTimeoutRef.current);
    }
    setSubmenu((prev) => ({ ...prev, state: "hidden" }));

    hideSubmenuTimeoutRef.current = setTimeout(() => {
      setSubmenu(INITIAL_SUBMENU_STATE);
      setHoveringTarget(null);
    }, HIDE_SUBMENU_DELAY);
  }, []);

  const onMenuItemMouseLeave = useCallback(
    (item: MenuItem, e: React.MouseEvent<HTMLDivElement>) => {
      const relatedTarget = e.relatedTarget as HTMLElement;

      if (relatedTarget) {
        // When mouse enters a adjacent menu item or submenu, don't hide submenu immediately to prevent flickering
        if (relatedTarget.classList.contains("menu-item")) {
          scheduleHideSubmenu(item);
          return;
        }
        if (relatedTarget.classList.contains("submenu")) {
          return;
        }
      }

      if (!item.children) {
        // When leaving a menu item without children, just clear hovering state without showing submenu
        setHoveringTarget(null);
      } else {
        // When leaving a menu item with children, start hiding submenu with a delay to allow moving into submenu
        scheduleHideSubmenu(item);
      }
    },
    [],
  );

  return (
    <header className="sm:p-10 p-4">
      <div
        ref={headerRef}
        className={`flex justify-center overflow-hidden relative pb-16 sm:rounded-[32px] rounded-[16px] 
          ${auroraReady ? "opacity-100" : "opacity-0"}
          ${shrink ? "xl:h-[91vh] min-h-[780px] xl:max-h-[920px]" : "xl:h-[85vh] min-h-[680px] xl:max-h-[920px]"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050303] via-[#780f20] to-[#050303]"></div>
        {/* <div
          className="absolute inset-0 bg-gradient-to-r from-[#050303] via-[#780f20] to-[#050303]
              animate-fade-out"
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050303] via-[#7b0c57] to-[#050303]
              opacity-0 animate-fade-in"
        ></div> */}
        <LazyRender
          className="absolute inset-0 z-0 top-[0px] bottom-[0px] left-[0px] right-[0px] pointer-events-none"
          threshold={0}
          rootMargin="800px 0px 0px 0px"
        >
          <>
            <Aurora
              onReady={() => setAuroraReady(true)}
              // transitionColorStops={{
              //   desktop: ["#630b47", "#050303", "#2e0420"],
              //   mobile: ["#7b0c57", "#7b0c57", "#7f0d59"],
              // }}
              // glowColor="#7b0c57"
            />
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
                    className={`lg:flex hidden justify-center font-medium text-base flex-1`}
                  >
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        onMouseEnter={(e) => onMenuItemMouseEnter(item, e)}
                        onMouseLeave={(e) => onMenuItemMouseLeave(item, e)}
                        className={`px-5 menu-item ${item.children ? "menu-item--children" : ""}`}
                      >
                        <a
                          href={item.href}
                          className={
                            item === hoveringTarget || hoveringTarget === null
                              ? "text-white hover:opacity-100 duration-300"
                              : "opacity-50 duration-300 blur-[1px]"
                          }
                        >
                          {item === hoveringTarget ? (
                            <ShineText className="inline">
                              {item.label}
                            </ShineText>
                          ) : (
                            item.label
                          )}
                        </a>
                        {item.children && (
                          <span
                            className={`pl-2 ${item === hoveringTarget ? "opacity-60 cursor-pointer" : hoveringTarget === null ? "opacity-100" : "opacity-30 blur-[1px]"} transition-opacity duration-300`}
                          >
                            <ChevronDown
                              className={`inline-block w-4 h-4 transition-opacity duration-300`}
                            />
                          </span>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="lg:flex hidden justify-end space-x-5 items-center">
                    <a
                      href="https://github.com/nestjs"
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
                      href="https://discord.com/invite/G7Qnnhy"
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
                    <a
                      href="https://linkedin.com/company/19078346"
                      target="_blank"
                      className="icon hover:opacity-60 transition-opacity"
                    >
                      <img
                        src={LinkedinIcon}
                        alt="Linkedin"
                        className="w-4 h-4 fill-current color-text"
                      />
                    </a>
                  </div>

                  <div className="lg:hidden flex justify-end">
                    <div
                      className={`${classes.mobileMenu} relative w-6 h-5 cursor-pointer`}
                      onClick={() => {
                        setMobileMenuOpen((prev) => !prev);
                      }}
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
            {breadcrumb && (
              <BlurIn>
                <SectionSubheading>{breadcrumb}</SectionSubheading>
              </BlurIn>
            )}
            <h1
              className={`
              ${
                shrink
                  ? "lg:text-[7rem] lg:leading-[0.95] text-5xl md:text-7xl leading-[1.1]"
                  : "lg:text-[4rem] lg:leading-[1.15] text-4xl md:text-5xl leading-[1]"
              } font-medium max-w-4xl self-center px-4 sm:px-0
            `}
            >
              <WordByWord>{heading}</WordByWord>
            </h1>
            <BlurIn delay={0.35}>
              <p className="mt-4 sm:text-sm text-[0.8rem] font-light font-mono opacity-80 max-w-2xl sm:leading-[24px] leading-[22px] lg:p-0 px-8">
                {subheading}
              </p>
            </BlurIn>
            <div className={`${shrink ? "mt-24 2xl:mt-20" : "mt-10"}`}>
              <BlurIn delay={0.7} distance={10}>
                {actions}
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
      <div
        className="submenu absolute top-full z-100 pt-12 duration-600 transition"
        style={{
          left: submenu.coords.x,
          top: submenu.coords.y,
          ...(submenu.state === "visible"
            ? {
                pointerEvents: "auto",
                opacity: 1,
                filter: "blur(0)",
                transform: "translate(-50%, 0)",
              }
            : {
                pointerEvents: "none",
                opacity: 0,
                filter: "blur(4px)",
                transform: "translate(-50%, 30px)",
              }),
        }}
        onMouseEnter={() => {
          // When mouse enters submenu, clear hiding timeout to prevent hiding while interacting with submenu
          if (hideSubmenuTimeoutRef.current) {
            clearTimeout(hideSubmenuTimeoutRef.current);
          }
        }}
        onMouseLeave={(event) => {
          // Schedule hide unless event target is a menu item with children
          const relatedTarget = event.relatedTarget as HTMLElement;
          if (relatedTarget) {
            if (relatedTarget.classList.contains("menu-item--children")) {
              return;
            }
          }
          scheduleHideSubmenu(hoveringTarget!);
          setHoveringTarget(null);
        }}
      >
        <div
          className="w-max backdrop-blur-lg rounded-[24px] p-2 shadow-xl shadow-xl/20
              bg-gradient-to-tr from-[#4e242a] to-[#44161e] border border-white/15 flex max-w-[768px]"
        >
          {submenu.items?.map((child) => (
            <a
              key={child.id}
              href={child.href}
              className="group block p-4 rounded-[20px] hover:bg-white/10 transition-colors flex-1"
            >
              <div className="rounded-[16px] overflow-hidden mb-5 shadow-lg">
                <img
                  src={child.thumbnail}
                  alt={child.label}
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-medium text-lg mb-1">{child.label}</div>
              <div className="text-sm opacity-70 font-mono">
                {child.description}
              </div>
            </a>
          ))}
        </div>
      </div>
      <MobileMenu
        open={mobileMenuOpen}
        close={() => setMobileMenuOpen(false)}
        items={menuItems}
      />
    </header>
  );
}
