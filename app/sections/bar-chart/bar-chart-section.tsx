import type React from "react";
import AnimatedContent from "../../components/animations/animated-content/animated-content";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import CountUp from "../../components/animations/count-up/count-up";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import NoiseOverlay from "../../components/backgrounds/noise-overlay/noise-overlay";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";

export default function BarChartSection({
  heading,
  subheading,
  text,
  cta,
  className,
  chart,
}: {
  heading: string;
  subheading: string;
  text: string;
  cta: React.ReactNode;
  className?: string;
  chart: {
    aValue: number;
    bValue: number;
    xAxisLabel: string;
    aLabel: string;
    bLabel: string;
  };
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="container relative flex mx-auto md:flex-row flex-col items-center">
        <div className="grid md:grid-cols-[50%_10%_40%] grid-rows-[auto] gap-0 place-items-center">
          <div className="md:order-1 order-3 md:mt-0 mt-12">
            <SectionSubheading>{subheading}</SectionSubheading>
            <ScrollReveal
              ElementTag="h2"
              className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
              enableBlur
            >
              {heading}
            </ScrollReveal>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
              ElementTag="p"
              enableBlur
            >
              {text}
            </ScrollReveal>
            <div className="mt-10">
              <BlurIn distance={20} delay={0.1} initialOpacity={0}>
                {cta}
              </BlurIn>
            </div>
          </div>
          <span className="md:order-2 order-2" />
          <div className="md:order-3 order-1 w-full">
            <div className="flex flex-col gap-8">
              <AnimatedContent
                scaleX={0}
                delay={0.1}
                distance={0}
                duration={2}
                ease="power4.out"
              >
                <div className="h-28 rounded-[32px] relative bg-[linear-gradient(to_right,transparent_0%,var(--primary-color)100%)] flex items-center justify-end p-5">
                  <NoiseOverlay />
                  <BlurIn
                    distance={10}
                    duration={2}
                    ease="power4.out"
                    delay={0.5}
                  >
                    <CountUp
                      from={0}
                      to={chart.aValue}
                      delay={0.6}
                      duration={0.2}
                      className="text-5xl font-medium text-white"
                      endChar="%"
                    />
                  </BlurIn>
                </div>
              </AnimatedContent>
              <AnimatedContent
                scaleX={0}
                delay={0.1}
                distance={0}
                duration={2}
                ease="power4.out"
              >
                <div
                  className={`h-28 rounded-[32px] relative bg-[linear-gradient(to_right,transparent_0%,#FF318C)100%)] flex items-center justify-end p-5`}
                  style={{ width: `${chart.bValue}%` }}
                >
                  <NoiseOverlay />
                  <BlurIn
                    distance={10}
                    duration={2}
                    ease="power4.out"
                    delay={0.5}
                  >
                    <CountUp
                      from={0}
                      to={chart.bValue}
                      duration={0.2}
                      delay={0.6}
                      className="text-5xl font-medium text-white"
                      endChar="%"
                    />
                  </BlurIn>
                </div>
              </AnimatedContent>
              <AnimatedContent distance={0} delay={0.1}>
                <div className="flex justify-between text-xs text-white/50 mt-4 font-mono border-t border-white/10 pt-4">
                  <span>0</span>
                  <span>{chart.xAxisLabel}</span>
                  <span>100</span>
                </div>
              </AnimatedContent>
              <div className="flex justify-start gap-10 mt-6">
                <div className="flex items-center gap-4 flex-row">
                  <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
                  <span className="text-xs font-light text-white font-mono uppercase">
                    {chart.aLabel}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-row">
                  <div className="w-2 h-2 bg-[#FF318C] rounded-full"></div>
                  <span className="text-xs font-light text-white font-mono uppercase">
                    {chart.bLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
