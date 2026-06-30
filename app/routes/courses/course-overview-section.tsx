import { useNavigate } from "react-router";
import type { CourseExtension } from "../../data/courses/extensions";
import { FUNDAMENTALS_CURRICULUM } from "../../data/courses/fundamentals";
import { BlurIn } from "../../marketing-ui/components/animations/blur-in/blur-in";
import ScrollReveal from "../../marketing-ui/components/animations/scroll-reveal/scroll-reveal";
import {
  CheckoutBox,
  type CheckoutBoxProps,
} from "../../marketing-ui/components/domain/checkout-box/checkout-box";
import { CourseCurriculum } from "../../marketing-ui/components/domain/course-curriculum/course-curriculum";
import { SectionSubheading } from "../../marketing-ui/components/domain/section-subheading/section-subheading";
import { CourseBulletpoints } from "./course-bulletpoints";
/* @ts-ignore */
import TimeIcon from "../../marketing-ui/components/domain/course-card/time.svg?react";
/* @ts-ignore */
import PlayIcon from "../../marketing-ui/components/domain/course-card/play.svg?react";

export type CourseOverviewSectionProps = {
  subheading: string;
  heading: string;
  description: string;
  curriculumText?: string;
  bulletpoints: Array<{
    icon: string | React.ReactNode;
    title: string;
    description: string;
    footnote?: React.ReactNode;
    videoId?: string;
  }>;
  curriculum?: typeof FUNDAMENTALS_CURRICULUM;
  setSelectedVideoId: (videoId: string) => void;
  bundle?: CourseExtension[];
} & CheckoutBoxProps;

export function CourseOverviewSection({
  subheading,
  heading,
  curriculumText,
  description,
  bulletpoints,
  curriculum,
  setSelectedVideoId,
  courseVideoUrl,
  courseTitle,
  coursePrice,
  courseDiscountedPrice,
  purchaseUrl,
  bundle,
}: CourseOverviewSectionProps) {
  const navigate = useNavigate();
  return (
    <div className="relative my-8 lg:my-40 checkout-container md:px-0 px-4">
      <div className="container relative flex mx-auto md:flex-row flex-col items-center">
        <div className="grid lg:grid-cols-[55%_5%_40%] grid-rows-[auto] gap-0 place-items-top w-full">
          <div className="lg:order-1 order-3 lg:mt-0 mt-32">
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
              {description}
            </ScrollReveal>
            {bundle && (
              <div className="my-16">
                <h4 className="font-medium text-lg leading-[1.2] mb-8">
                  This bundle includes the following courses:
                </h4>
                {bundle.map((block) => (
                  <section
                    className="overflow-hidden rounded-[20px] mb-4"
                    key={block.title}
                  >
                    <button
                      className="border border-white/20 text-white rounded-[20px] group hover:border-white/40 transition-all duration-100 ease-in-out
              flex w-full items-center gap-4 md:px-8 md:py-7 px-4 py-6 text-left hover:cursor-pointer flex sm:flex-row flex-col sm:items-center items-start justify-between"
                      onClick={() => window.open(block.url, "_blank")}
                      type="button"
                    >
                      <div className="min-w-0 flex-1">
                        <h5 className="text-md font-medium sm:text-md text-white underline underline-offset-4 decoration-1 decoration-white/80">
                          {block.title}
                        </h5>
                      </div>
                      <div className="flex flex-row items-center gap-2 mr-4">
                        <PlayIcon className="icon-course-card w-[14px] h-[14px]" />
                        <span className="shrink-0 text-sm font-mono opacity-70">
                          {block.lessonCount} lessons
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <TimeIcon className="icon-course-card w-[16px] h-[16px] ml-[-2px]" />
                        <span className="shrink-0 text-sm font-mono opacity-70">
                          {block.duration}
                        </span>
                      </div>
                    </button>
                  </section>
                ))}
              </div>
            )}
            <div className="my-6">
              <CourseBulletpoints
                bulletpoints={bulletpoints}
                setSelectedVideoId={setSelectedVideoId}
              />
            </div>
            {curriculum && (
              <>
                <div className="md:mt-32 mt-16" />
                <SectionSubheading>Curriculum</SectionSubheading>
                <ScrollReveal
                  ElementTag="h2"
                  className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
                  enableBlur
                >
                  What's inside the course...
                </ScrollReveal>
                <ScrollReveal
                  className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
                  ElementTag="p"
                  enableBlur
                >
                  {curriculumText}
                </ScrollReveal>
                <div className="my-16" />
                <CourseCurriculum blocks={curriculum} />
              </>
            )}
          </div>
          <span className="lg:order-2 order-2" />
          <div className="lg:order-3 order-1 w-full lg:pl-12 pl-0">
            <BlurIn
              duration={0.5}
              distance={100}
              className="relative lg:sticky lg:top-0 pt-10"
            >
              <CheckoutBox
                courseVideoUrl={courseVideoUrl}
                courseTitle={courseTitle}
                coursePrice={coursePrice}
                courseDiscountedPrice={courseDiscountedPrice}
                purchaseUrl={purchaseUrl}
              />
            </BlurIn>
          </div>
        </div>
      </div>
    </div>
  );
}
