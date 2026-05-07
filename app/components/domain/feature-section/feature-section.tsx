import AnimatedContent from "../../animations/animated-content/animated-content";
import ScrollReveal from "../../animations/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../section-subheading/section-subheading";

type FeatureSectionProps = {
  subheading: string;
  title: string;
  items: Array<{
    icon: string | React.ReactNode;
    title: string;
    description: string;
  }>;
  image: string;
  className?: string;
  reverse?: boolean;
};

export function FeatureSection({
  subheading,
  title,
  items,
  image,
  className = "",
  reverse = false,
}: FeatureSectionProps) {
  return (
    <div className={`container mx-auto my-30 ${className}`}>
      <div
        className={`flex justify-center gap-40 ${reverse ? "flex-row-reverse" : ""}`}
      >
        <div className="flex flex-col basis-[48%] text-left">
          <SectionSubheading>{subheading}</SectionSubheading>
          <ScrollReveal
            ElementTag="h2"
            className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
            enableBlur
          >
            {title}
          </ScrollReveal>
          <div className="my-6">
            {items.map((item, index) => (
              <AnimatedContent
                key={index}
                delay={index * 0.2}
                distance={10}
                duration={0.8}
              >
                <div
                  key={index}
                  className={`${index !== items.length - 1 ? "border-b border-white/10" : ""} w-full py-8 flex gap-8 items-center`}
                >
                  {typeof item.icon === "string" ? (
                    <img src={item.icon} alt={`${item.title} Icon`} />
                  ) : (
                    item.icon
                  )}
                  <div className="">
                    <AnimatedContent delay={0.15} distance={10} duration={0.8}>
                      <h5 className="text-lg">{item.title}</h5>
                    </AnimatedContent>
                    <AnimatedContent delay={0.3} distance={10} duration={0.8}>
                      <p className="font-mono text-sm opacity-70 leading-6 font-light mt-2">
                        {item.description}
                      </p>
                    </AnimatedContent>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
        <div className="relative basis-[52%]">
          <AnimatedContent distance={150} delay={0.1} initialOpacity={0}>
            <img src={image} className="w-full pointer-events-none" />
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
}
