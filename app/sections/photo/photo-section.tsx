import type React from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";

export default function PhotoSection({
  heading,
  subheading,
  text,
  cta,
  image,
  className,
}: {
  heading: string;
  subheading: string;
  text: string;
  cta: React.ReactNode;
  image: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="container relative flex mx-auto md:flex-row flex-col items-center">
        <div className="grid md:grid-cols-[50%_10%_40%] grid-rows-[auto] gap-0 place-items-center">
          <div className="md:order-1 order-3 md:mt-0 mt-12">
            <SectionSubheading>{subheading}</SectionSubheading>
            <ScrollReveal
              ElementTag="h2"
              className="font-medium sm:text-5xl text-[2.3rem] leading-[1.1]"
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
            <BlurIn distance={20} delay={0.1} initialOpacity={0}>
              {image}
            </BlurIn>
          </div>
        </div>
      </div>
    </div>
  );
}
