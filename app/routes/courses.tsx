import {
  ArrowsClockwiseIcon,
  IdentificationBadgeIcon,
  InfinityIcon,
  PlayCircleIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { COURSE_EXTENSIONS } from "../data/courses/extensions";
import { FUNDAMENTALS_CURRICULUM } from "../data/courses/fundamentals";
import { MENU_ITEMS } from "../marketing-ui/common/menu";
import AnimatedContent from "../marketing-ui/components/animations/animated-content/animated-content";
import { BlurIn } from "../marketing-ui/components/animations/blur-in/blur-in";
import ScrollReveal from "../marketing-ui/components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../marketing-ui/components/buttons/primary-button/primary-button";
import { CheckoutBox } from "../marketing-ui/components/domain/checkout-box/checkout-box";
import { CourseCard } from "../marketing-ui/components/domain/course-card/course-card";
import {
  CourseCurriculum,
  CourseVideoModal,
} from "../marketing-ui/components/domain/course-curriculum/course-curriculum";
import { CoursesFan } from "../marketing-ui/components/domain/courses-fan/courses-fan";
import { SectionSubheading } from "../marketing-ui/components/domain/section-subheading/section-subheading";
import { TiltedText } from "../marketing-ui/components/domain/tilted-text/tilted-text";
import BarChartSection from "../marketing-ui/sections/bar-chart/bar-chart-section";
import { CertificatesSection } from "../marketing-ui/sections/certificates/certificates-section";
import CommunitySection from "../marketing-ui/sections/community/community-section";
import FaqSection, {
  type FaqItem,
} from "../marketing-ui/sections/faq/faq-section";
import { Footer } from "../marketing-ui/sections/footer/footer";
import { Header } from "../marketing-ui/sections/header/header";
import { ProductsSection } from "../marketing-ui/sections/products/products-section";
import { TestimonialsSection } from "../marketing-ui/sections/testimonials/testimonials-section";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NestJS - A progressive Node.js framework" },
    {
      name: "description",
      content:
        "NestJS is a framework for building efficient, scalable Node.js web applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).",
    },
  ];
}

const FUNDAMENTALS_ITEMS: Array<{
  icon: string | React.ReactNode;
  title: string;
  description: string;
  footnote?: React.ReactNode;
  videoId?: string;
}> = [
  {
    icon: <PlayCircleIcon weight="fill" size={32} />,
    title: "80 videos",
    description:
      "Featuring 80 videos (with subtitles) and over 5 hours of content",
    footnote: "Watch free lesson",
    videoId: "447091051",
  },
  {
    title: "From NestJS creator",
    icon: <IdentificationBadgeIcon weight="fill" size={32} />,
    description:
      "The only official course from the Creator Kamil Mysliwiec himself, and Mark Pieszak (Core Team Member).",
  },
  {
    title: "Official certification",
    icon: <ScrollIcon weight="fill" size={32} />,
    description:
      "Receive an official certificate of completion to showcase your new skills and boost your career.",
    footnote: <a href="#">See certified developers</a>,
  },
  {
    title: "Lifetime access",
    icon: <InfinityIcon weight="fill" size={32} />,
    description:
      "Get lifetime access to the course content, including all future updates and additions.",
  },
  {
    title: "Regular content updates",
    icon: <ArrowsClockwiseIcon weight="fill" size={32} />,
    description:
      "We regularly update the course content to reflect the latest NestJS features and best practices.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do courses have subtitles (Closed Captions)?",
    answer:
      "Yes! All courses have subtitles (Closed Captions) and full written transcripts for each lesson in English.",
  },
  {
    question: "How long do I have access to the course?",
    answer:
      "All course purchases have unlimited lifetime access & free updates. No subscriptions needed, you can access the course anytime, forever.",
  },
  {
    question: "What are my payment options?",
    answer:
      "Our online checkout accepts all major Credit Cards and Google Pay. Checkout is a fully secure 128-bit SSL encrypted payment system through Stripe.",
  },
  {
    question: "Do you offer large team discounts?",
    answer: (
      <>
        Yes of course! Please contact us at{" "}
        <a href="mailto:support@nestjs.com" className="text-white underline">
          support@nestjs.com
        </a>{" "}
        about the size of your team, and we can help you purchase all course
        licenses with discount codes.
      </>
    ),
  },
  {
    question: "Can I share my course with someone else?",
    answer: (
      <>
        Each purchase is limited to <strong>ONE</strong> license & user viewing
        the course. Our licensing agreement prohibits any form of sharing.
        Account activity is tracked and abuse of copyright taken very seriously.
        If you are purchasing for larger teams (10+) shoot us an email at{" "}
        <a href="mailto:support@nestjs.com" className="text-white underline">
          support@nestjs.com
        </a>{" "}
        to retrieve a large-team discount code.
      </>
    ),
  },
  {
    question: "Do I receive a certificate of completion?",
    answer:
      "Yes. When completing each course you will receive an official Certificate indicating that you have completed each Nest certified course. You can download an official certificate of completion that can be used to be reimbursed by your employer or land that dream job you are applying for.",
  },
];

export default function Courses() {
  const location = useLocation();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("preview")) {
      setSelectedVideoId("447091051");
    }
  }, [location.search]);

  return (
    <>
      <Header
        menuItems={MENU_ITEMS}
        breadcrumb="courses"
        heading="Upskill your team with official NestJS courses"
        subheading="Over 200 lessons. Learn everything you need to master NestJS and tackle modern backend applications at any scale."
        bottomPanel={
          <div className="pt-12 relative flex w-full h-full">
            <CoursesFan
              variant="mask"
              shadowOnHover={false}
              animationDelay={0.5}
              animationStartTriggerValue="top 100%"
              reverse
            />
          </div>
        }
        actions={null}
        shrink={false}
      />
      <div className="relative my-8 lg:my-40 checkout-container md:px-0 px-4">
        <div className="container relative flex mx-auto md:flex-row flex-col items-center">
          <div className="grid lg:grid-cols-[55%_5%_40%] grid-rows-[auto] gap-0 place-items-top w-full">
            <div className="lg:order-1 order-3 lg:mt-0 mt-32">
              <SectionSubheading>Fundamentals course</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
                enableBlur
              >
                Become an expert with NestJS Fundamentals Course
              </ScrollReveal>
              <ScrollReveal
                className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
                ElementTag="p"
                enableBlur
              >
                Get up to speed with NestJS fast. Master the building blocks and
                essential concepts behind creating your own enterprise-grade
                applications.
              </ScrollReveal>
              <div className="my-6">
                {FUNDAMENTALS_ITEMS.map((item, index) => (
                  <AnimatedContent
                    key={index}
                    delay={index * 0.2}
                    distance={10}
                    duration={0.8}
                  >
                    <div
                      key={index}
                      className={`${index !== FUNDAMENTALS_ITEMS.length - 1 ? "border-b border-white/10" : ""} w-full py-8 flex gap-8 items-center`}
                    >
                      {typeof item.icon === "string" ? (
                        <img src={item.icon} alt={`${item.title} Icon`} />
                      ) : (
                        item.icon
                      )}
                      <div className="">
                        <AnimatedContent
                          delay={0.15}
                          distance={10}
                          duration={0.8}
                        >
                          <h5 className="text-lg">{item.title}</h5>
                        </AnimatedContent>
                        <AnimatedContent
                          delay={0.3}
                          distance={10}
                          duration={0.8}
                        >
                          <p className="font-mono text-sm opacity-70 leading-6 font-light mt-2">
                            {item.description}
                          </p>
                          {item.footnote && (
                            <div className="mt-2 text-[var(--primary-color)] hover:underline font-semibold">
                              {item.videoId ? (
                                <button
                                  className="hover:cursor-pointer"
                                  onClick={() =>
                                    setSelectedVideoId(item.videoId!)
                                  }
                                  type="button"
                                >
                                  {item.footnote}
                                </button>
                              ) : (
                                item.footnote
                              )}
                            </div>
                          )}
                        </AnimatedContent>
                      </div>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
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
                The course curriculum is designed to take you from the basics of
                NestJS to advanced concepts, covering everything you need to
                know to build production-ready applications.
              </ScrollReveal>
              <div className="my-16" />
              <CourseCurriculum blocks={FUNDAMENTALS_CURRICULUM} />
            </div>
            <span className="lg:order-2 order-2" />
            <div className="lg:order-3 order-1 w-full lg:pl-12 pl-0">
              <BlurIn
                duration={0.5}
                distance={100}
                className="relative lg:sticky lg:top-0 pt-10"
              >
                <CheckoutBox />
              </BlurIn>
            </div>
          </div>
        </div>
      </div>
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
            Course extensions
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
      <CommunitySection />
      <CertificatesSection />
      <BarChartSection
        subheading="Hands-on"
        heading="Less reading. More building."
        text="Stop spending your learning time buried in documentation and passive reading. This course is designed to get you into the code immediately, building real projects from the very first lesson. You'll learn faster by doing, not by scrolling-turning concepts into working skills as you go."
        cta={
          <PrimaryButton href="#extensions">
            See course extensions
          </PrimaryButton>
        }
        chart={{
          aValue: 96,
          bValue: 52,
          xAxisLabel: "time spent coding",
          aLabel: "After course completion",
          bLabel: "No course",
        }}
        className="px-5 py-8 md:mt-60 mt-30"
      />
      <FaqSection className="md:mt-50" items={FAQ_ITEMS} />
      <TiltedText
        heading="Does your team need additional support?"
        content="Nest core team members can work directly with your team on a daily basis to help take your project to the next-level. Let us partner with you and your team to develop the most ambitious projects."
        buttonText="Enterprise official support"
        buttonLink="/enterprise"
      />
      <ProductsSection />
      <TestimonialsSection />
      <CourseVideoModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
      <Footer className="mt-20" />
    </>
  );
}
