import { useEffect, useRef } from "react";
import Aurora from "../../components/backgrounds/aurora-background/aurora-background";
import LineWaves from "../../components/backgrounds/line-waves/line-waves";
import NoiseOverlay from "../../components/backgrounds/noise-overlay/noise-overlay";
import FlashlightText from "../../components/effects/flashlight-text/flashlight-text";

export function Footer({ className }: { className?: string }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const easterEggRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!footerRef.current || !easterEggRef.current) {
        return;
      }
      const easterEggRect = easterEggRef.current.getBoundingClientRect();
      if (easterEggRect.height !== 0) {
        return;
      }

      const elementBottom =
        footerRef.current.offsetTop + footerRef.current.offsetHeight;
      const scrollBottom = window.scrollY + window.innerHeight;

      if (scrollBottom + 1 >= elementBottom) {
        easterEggRef.current.style.height = "240px";
        const images = easterEggRef.current.querySelectorAll("img");
        const randomIndex = Math.floor(Math.random() * images.length);
        images[randomIndex].classList.remove("hidden");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <footer
      className={`sm:p-10 p-5 relative overflow-hidden ${className}`}
      id="footer"
      ref={footerRef}
    >
      <div className="absolute inset-0 z-0 top-[30%] bottom-[-200px] left-0 right-0 pointer-events-none">
        <div className="bg-gradient-to-r from-[#ea2845] via-[#780f20] to-[#050303] absolute inset-0 z-0 top-0 bottom-0 left-0 right-0 overflow-hidden">
          <Aurora />
          <NoiseOverlay />
          <div className="bg-gradient-to-t from-transparent from-0% via-transparent via-60% to-[var(--color-bg)] to-100% absolute inset-0 z-0 t-0 b-0 r-0 l-0"></div>
        </div>
      </div>
      <div className="bg-[#0b0b0b] sm:rounded-[32px] rounded-[16px] border border-[#262626] relative overflow-hidden">
        <div className="noise" />
        <FlashlightText text="$ npm i -g @nestjs/cli<br />$ nest new project-name" />
        <div className="grid xl:grid-cols-[30%_70%] md:grid-cols-[50%_50%] grid-cols-1 relative z-10 border-t border-[#262626]">
          <section
            id="newsletter"
            className="sm:py-30 sm:px-20 px-8 py-12 border-r border-[#262626] w-full flex flex-col relative md:align-self-center lg:align-self-start"
          >
            <div className="absolute inset-0 left-0 right-0 top-0 bottom-0 z-0 overflow-hidden">
              <LineWaves speed={0.1} />
              <div className="absolute bg-gradient-to-tl from-transparent from-0% to-[#151515] to-50% top-0 left-0 right-0 bottom-0 pointer-events-none" />
            </div>
            <h4 className="text-xl font-semibold mb-4 z-10 relative">
              Want to stay in touch?
            </h4>
            <p className="text-sm opacity-70 mb-6 leading-6 max-w-xl font-mono font-light z-10 relative">
              Join our newsletter to get the latest news, updates and special
              offers.
            </p>
            <form className="flex flex-col sm:flex-row items-center gap-4 mt-2 relative z-10">
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="px-5 py-6 uppercase font-mono text-xs rounded-[24px] bg-white/12 border border-white/12 focus:outline-none focus:ring-2 focus:ring-[#780f20] w-full"
              />
              <button
                type="submit"
                className="absolute bg-[#4e4e4e] top-[3px] bottom-[3px] right-[3px] w-[120px] rounded-[22px] text-sm font-semibold cursor-pointer overflow-hidden
                    before:content-[''] before:absolute before:inset-0 before:w-[25px] before:h-[25px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white/10 before:rounded-full before:scale-0 before:opacity-0 before:transition-transform before:duration-700 before:transition-opacity
                    after:content-[''] after:absolute after:inset-0 after:w-[25px] after:h-[25px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white/10 after:rounded-full after:scale-0 after:opacity-0 after:transition-transform after:duration-700 after:delay-150 after:transition-opacity
                    hover:before:scale-500 hover:before:opacity-100 hover:after:scale-500 hover:after:opacity-100"
              >
                <span className="relative z-10">Subscribe</span>
              </button>
            </form>
          </section>
          <div className="sm:px-20 px-8 flex flex-col justify-between sm:py-12 md:border-none border-t border-[#262626] py-8 px-8">
            <div className="grid xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl text-sm sm:pt-20 sm:pb-30 pt-6 pb-6">
              <div>
                <span className="font-mono uppercase text-[#9B9A9A] text-xs mb-6 block">
                  Resources
                </span>
                <ul className="leading-9">
                  <li>
                    <a
                      href="https://docs.nestjs.com/"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80 "
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://courses.nestjs.com/"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jobs.nestjs.com/"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://enterprise.nestjs.com/"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Enterprise support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-mono uppercase text-[#9B9A9A] text-xs mb-6 block">
                  Tools
                </span>
                <ul className="leading-9">
                  <li>
                    <a
                      href="https://devtools.nestjs.com/"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Devtools
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mau.nestjs.com/"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Deploy Mau
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-mono uppercase text-[#9B9A9A] text-xs mb-6 block">
                  Socials
                </span>
                <ul className="leading-9">
                  <li>
                    <a
                      href="https://github.com/nestjs/nest"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/company/19078346"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Linedin
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/nestframework"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      X (Twitter)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.com/invite/G7Qnnhy"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-mono uppercase text-[#9B9A9A] text-xs mb-6 block">
                  About
                </span>
                <ul className="leading-9">
                  <li>
                    <a
                      href="https://github.com/nestjs/nest/releases"
                      className="font-semibold  hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Releases
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/nestjs/nest/blob/master/CONTRIBUTING.md"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Contributing
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/nestjs/nest/blob/master/CODE_OF_CONDUCT.md"
                      className="font-semibold hover:underline hover:underline-offset-4 hover:opacity-80"
                    >
                      Code of Conduct
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-center text-xs font-mono justify-between uppercase mt-10">
              <p className="text-[#9B9A9A] sm:text-left text-center">
                Released under the MIT License{" "}
                <span className="mx-3 sm:inline block sm:opacity-100 opacity-0">
                  /
                </span>{" "}
                Copyright © 2017 - {new Date().getFullYear()}{" "}
                <a
                  href="https://github.com/kamilmysliwiec"
                  target="_blank"
                  className="underline text-white hover:opacity-80"
                >
                  Kamil Mysliwiec
                </a>
              </p>
              <p className="text-[#9B9A9A] sm:mt-0 mt-4 text-center sm:text-left">
                Designed by{" "}
                <a
                  href="#"
                  target="_blank"
                  className="underline text-white hover:opacity-80"
                >
                  Jakub Staron
                </a>{" "}
                <span className="mx-3 sm:inline block sm:opacity-100 opacity-0">
                  /
                </span>{" "}
                Hosted by{" "}
                <a
                  href="https://netlify.com"
                  target="_blank"
                  className="underline text-white hover:opacity-80"
                >
                  Netlify
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={easterEggRef}
        className="z-10 relative flex justify-center items-center flex w-full overflow-hidden h-0 transition-all duration-1000"
      >
        <div className="p-24 pb-14">
          <img src={`/gifs/1.gif`} alt="Easter Egg" className="w-25 hidden" />
          <img src={`/gifs/2.gif`} alt="Easter Egg" className="w-25 hidden" />
          <img src={`/gifs/3.gif`} alt="Easter Egg" className="w-25 hidden" />
        </div>
      </div>
    </footer>
  );
}
