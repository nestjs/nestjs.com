import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";
import { TransparentButton } from "../../components/buttons/transparent-button/transparent-button";
import { CoursesFan } from "../../components/domain/courses-fan/courses-fan";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";

export function CoursesSection({
  className,
  heading = "Become Nest Certified Expert",
  description = "Over 200 lessons. Learn everything you need to master NestJS and tackle modern backend applications at any scale.",
  ctaText = "Get certified today",
}: {
  className?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
}) {
  return (
    <div className="flex justify-center overflow-hidden pt-35">
      <div className="container relative centered justify-center items-center flex flex-col">
        <CoursesFan />
        <SectionSubheading>Courses</SectionSubheading>
        <ScrollReveal
          ElementTag="h2"
          className="font-medium xl:text-9xl lg:text-8xl sm:text-7xl text-[2.75rem] text-center leading-[1.1] md:px-0 px-4"
          enableBlur
        >
          {heading}
        </ScrollReveal>
        <ScrollReveal
          className="font-mono text-sm opacity-70 leading-6 font-light pt-10 max-w-xl text-center md:px-0 px-4"
          ElementTag="p"
          enableBlur
        >
          {description}
        </ScrollReveal>
        <BlurIn
          className="mt-20 flex sm:space-x-5 justify-center sm:flex-row flex-col items-center space-y-4 sm:space-y-0"
          duration={0.5}
        >
          <PrimaryButton href="https://courses.nestjs.com/">
            {ctaText}
          </PrimaryButton>
          <TransparentButton href="https://courses.nestjs.com/#featured">
            <img src="/icons/play.svg" className="w-4 h-4 mr-2" />
            <span>Watch free lesson</span>
          </TransparentButton>
        </BlurIn>
      </div>
    </div>
  );
}
