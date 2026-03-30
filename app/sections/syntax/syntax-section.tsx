import AnimatedContent from "../../components/animations/animated-content/animated-content";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { SecondaryButton } from "../../components/buttons/secondary-button/secondary-button";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";
import { StaticCodeEditor } from "../../components/domain/static-code-editor/static-code-editor";

export function SyntaxSection({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="container relative md:px-0 sm:px-8 px-5">
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
  );
}
