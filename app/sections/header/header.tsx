import { ChevronDown } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { siDiscord, siGithub, siX } from "simple-icons";
import LinkedinIcon from "../../assets/icons/linkedin.svg";
import DevtoolsThumbnail from "../../assets/thumbnails/devtools.png";
import MauThumbnail from "../../assets/thumbnails/mau.png";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import CountUp from "../../components/animations/count-up/count-up";
import { WordByWord } from "../../components/animations/word-by-word/word-by-word";
import Aurora from "../../components/backgrounds/aurora-background/aurora-background";
import NoiseOverlay from "../../components/backgrounds/noise-overlay/noise-overlay";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";
import { TransparentButton } from "../../components/buttons/transparent-button/transparent-button";
import { MobileMenu } from "../../components/domain/mobile-menu/mobile-menu";
import { ShineText } from "../../components/effects/shine-text/shine-text";
import SpotlightCard from "../../components/effects/spotlight-card/spotlight-card";
import LazyRender from "../../components/misc/lazy-render/lazy-render";
import { type NestStats } from "../../services/nest-stats.service";
import classes from "./header.module.scss";

type MenuItem = {
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

const MENU_ITEMS: Array<MenuItem> = [
  { id: "docs", label: "Docs", href: "https://docs.nestjs.com" },
  {
    id: "enterprise",
    label: "Enterprise",
    href: "https://enterprise.nestjs.com",
  },
  {
    id: "courses",
    label: "Courses",
    href: "https://courses.nestjs.com",
  },
  {
    id: "tools",
    label: "Tools",
    href: "#",
    children: [
      {
        id: "devtools",
        label: "Devtools",
        href: "https://devtools.nestjs.com",
        description: "Identify dependencies and connections between modules.",
        thumbnail: DevtoolsThumbnail,
      },
      {
        id: "mau",
        label: "Deploy, Mau!",
        href: "https://mau.nestjs.com",
        description: "Provision and manage your infrastructure on AWS.",
        thumbnail: MauThumbnail,
      },
    ],
  },
  { id: "jobs", label: "Jobs", href: "https://jobs.nestjs.com" },
];

const HIDE_SUBMENU_DELAY = 2000; // ms
const INITIAL_SUBMENU_STATE = {
  state: "hidden",
  coords: { x: 0, y: 0 },
  items: null,
} as const;
// const INITIAL_SUBMENU_STATE = {
//   coords: { x: 900, y: 150 },
//   items: MENU_ITEMS[3].children || null,
// };

export function Header({ stats }: { stats: NestStats | null }) {
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

        return;
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
                    className={`lg:flex hidden justify-center font-medium text-base flex-1`}
                  >
                    {MENU_ITEMS.map((item) => (
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
                          <ChevronDown
                            className={`inline-block w-4 h-4 ml-2 transition-opacity duration-300
                              ${item === hoveringTarget ? "opacity-60 cursor-pointer" : hoveringTarget === null ? "opacity-100" : "opacity-30 blur-[1px]"}`}
                          />
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
                    target="_blank"
                  >
                    Get started
                  </PrimaryButton>
                  <TransparentButton
                    href="https://github.com/nestjs"
                    target="_blank"
                  >
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
        items={MENU_ITEMS}
      />
    </header>
  );
}
