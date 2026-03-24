import { useRef } from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import CountUp from "../../components/animations/count-up/count-up";
import { ScaleOnScroll } from "../../components/animations/scale-on-scroll/scale-on-scroll";
import Aurora from "../../components/backgrounds/aurora-background/aurora-background";
import NoiseOverlay from "../../components/backgrounds/noise-overlay/noise-overlay";
import LazyRender from "../../components/misc/lazy-render/lazy-render";
import { type NestStats } from "../../services/nest-stats.service";

export function StatsSection({
  stats,
  className,
}: {
  stats: NestStats | null;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={sectionRef}
      className={`flex justify-center relative lg:py-30 md:py-20 sm:py-16 py-12 sm:px-8 px-12 rounded-[32px] ${className}`}
    >
      <ScaleOnScroll className="absolute inset-0 z-0 top-0 bottom-0 left-0 right-0 pointer-events-none">
        <LazyRender
          className="absolute inset-0 z-0 top-0 bottom-0 left-0 right-0 pointer-events-none"
          threshold={0}
          rootMargin="1200px 0px 0px 0px"
        >
          <div className="bg-gradient-to-r from-[#050303] via-[#780f20] to-[#050303] absolute inset-0 z-0 top-0 bottom-0 left-0 right-0 sm:rounded-[32px] rounded-[16px] overflow-hidden">
            <Aurora />
            <NoiseOverlay />
          </div>
        </LazyRender>
      </ScaleOnScroll>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[60%_30%] grid-rows-[auto] md:gap-0 gap-8">
          <div className="centered text-left lg:pt-30 lg:pb-40 sm:pt-8 sm:pb-12 pb-4 pt-4 flex flex-col">
            <BlurIn delay={0.1}>
              <h3 className="md:text-7xl sm:text-6xl text-5xl leading-[1.1] font-medium sm:max-w-4xl max-w-full">
                Nine lives. <br />
                Infinite impact.
              </h3>
            </BlurIn>
          </div>
          <div className="relative flex flex-col">
            <BlurIn delay={0.2}>
              <div className="flex flex-col">
                <span className="xl:text-[160px] sm:text-[100px] text-[60px] font-medium leading-[1.2]">
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
                      to={stats ? Math.round(stats.githubStars / 100) / 10 : 0}
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
  );
}
