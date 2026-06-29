import { COURSE_EXTENSIONS } from "../../data/courses/extensions";
import { BlurIn } from "../../marketing-ui/components/animations/blur-in/blur-in";
import ScrollReveal from "../../marketing-ui/components/animations/scroll-reveal/scroll-reveal";
import { CourseCard } from "../../marketing-ui/components/domain/course-card/course-card";
import { SectionSubheading } from "../../marketing-ui/components/domain/section-subheading/section-subheading";

export function ExtensionsSection({
  heading = "Course extensions",
}: {
  heading?: string;
}) {
  return (
    <div
      className="flex justify-center overflow-hidden mt-60 lg:mb-30"
      id="extensions"
    >
      <div className="container relative centered justify-center items-center flex flex-col">
        <SectionSubheading>Extensions</SectionSubheading>
        <ScrollReveal
          ElementTag="h2"
          className="font-medium md:text-7xl sm:text-5xl text-4xl text-center md:leading-[1.1] md:px-0 px-4"
          enableBlur
        >
          {heading}
        </ScrollReveal>
        <ScrollReveal
          className="font-mono text-sm opacity-70 leading-6 font-light md:pt-10 pt-4 max-w-4xl text-center md:px-0 px-4"
          ElementTag="p"
          enableBlur
        >
          Explore our course extensions built to supercharge your NestJS
          learning experience. These extensions are designed to complement the
          main course content, providing additional resources, hands-on
          projects, and real-world applications.
        </ScrollReveal>
        <BlurIn className="mt-20 flex justify-center w-full" duration={0.5}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full md:px-0 px-4">
            {COURSE_EXTENSIONS.map((extension, index) => (
              <div className="relative" key={index}>
                <CourseCard
                  {...extension}
                  variant="full"
                  align="left"
                  borderOpaque
                />
              </div>
            ))}
          </div>
        </BlurIn>
      </div>
    </div>
  );
}
