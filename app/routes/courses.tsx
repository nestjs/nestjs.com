import {
  ArrowsClockwiseIcon,
  IdentificationBadgeIcon,
  InfinityIcon,
  PlayCircleIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { MENU_ITEMS } from "../common/menu";
import AnimatedContent from "../components/animations/animated-content/animated-content";
import { BlurIn } from "../components/animations/blur-in/blur-in";
import { LettersReveal } from "../components/animations/letters-reveal/letters-reveal";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
import { CheckoutBox } from "../components/domain/checkout-box/checkout-box";
import { CourseCard } from "../components/domain/course-card/course-card";
import { CourseCurriculum } from "../components/domain/course-curriculum/course-curriculum";
import { CoursesFan } from "../components/domain/courses-fan/courses-fan";
import { SectionSubheading } from "../components/domain/section-subheading/section-subheading";
import { ServiceCard } from "../components/domain/service-card/service-card";
import StackedCards from "../components/misc/stacked-cards/stacked-cards";
import { COURSE_EXTENSIONS } from "../data/courses/extensions";
import { FUNDAMENTALS_CURRICULUM } from "../data/courses/fundamentals";
import BarChartSection from "../sections/bar-chart/bar-chart-section";
import CommunitySection from "../sections/community/community-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import FaqSection, { type FaqItem } from "../sections/faq/faq-section";
import { Footer } from "../sections/footer/footer";
import { Header } from "../sections/header/header";
import { TestimonialsSection } from "../sections/testimonials/testimonials-section";
import { fetchNestStats, type NestStats } from "../services/nest-stats.service";
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
}> = [
  {
    icon: <PlayCircleIcon weight="fill" size={32} />,
    title: "80 videos",
    description:
      "Featuring 80 videos (with subtitles) and over 5 hours of content",
    footnote: <a href="#">Watch free lesson</a>,
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
  const [stats, setStats] = useState<NestStats | null>(null);

  useEffect(() => {
    fetchNestStats()
      .then(setStats)
      .catch(() => null);
  }, []);

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
      <div className="relative my-40 checkout-container">
        <div className="container relative flex mx-auto md:flex-row flex-col items-center">
          <div className="grid md:grid-cols-[55%_5%_40%] grid-rows-[auto] gap-0 place-items-top w-full">
            <div className="md:order-1 order-3 md:mt-0 mt-12">
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
                              {item.footnote}
                            </div>
                          )}
                        </AnimatedContent>
                      </div>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
              <div className="mt-32" />
              <SectionSubheading>Curriculum</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
                enableBlur
              >
                What’s inside the course...
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
            <span className="md:order-2 order-2" />
            <div className="md:order-3 order-1 w-full md:pl-12 pl-0">
              <BlurIn
                duration={0.5}
                distance={100}
                className="relative md:sticky md:top-0 pt-10"
              >
                <CheckoutBox />
              </BlurIn>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center overflow-hidden mt-60 mb-30">
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
            <div className="grid grid-cols-3 gap-6 w-full">
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
      <BarChartSection
        subheading="Hands-on"
        heading="Less reading. More building."
        text="Stop spending your learning time buried in documentation and passive reading. This course is designed to get you into the code immediately, building real projects from the very first lesson. You'll learn faster by doing, not by scrolling-turning concepts into working skills as you go."
        cta={
          <PrimaryButton href="#" target="_blank">
            See courses
          </PrimaryButton>
        }
        chart={{
          aValue: 96,
          bValue: 52,
          xAxisLabel: "time spent coding",
          aLabel: "After course completion",
          bLabel: "No course",
        }}
        className="px-5 py-8 mt-50"
      />
      <FaqSection className="mt-50" items={FAQ_ITEMS} />
      <LettersReveal
        ElementTag="h4"
        subComponent={
          <div className="relative centered text-center flex items-center flex-col">
            <h4 className="text-sm font-mono opacity-80 max-w-2xl leading-8 font-light p-10">
              Explore our tools built to supercharge your Nest workflow.
              Discover solutions we created to streamline development, automate
              tasks, and help you ship faster with greater confidence.
            </h4>
          </div>
        }
      >
        <section className="px-20">
          <BlurIn distance={10} duration={2} ease="elastic.out(1, 0.5)">
            <h4 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-[4rem] sm:leading-[1.15] text-4xl leading-[1.15] font-medium text-center flex">
              When&nbsp;there's&nbsp;no&nbsp;yarn
            </h4>
          </BlurIn>
          <BlurIn
            distance={10}
            duration={2}
            delay={0.2}
            ease="elastic.out(1, 0.5)"
          >
            <h4 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-[4rem] sm:leading-[1.15] text-4xl leading-[1.15] font-medium text-center flex">
              we&nbsp;build&nbsp;our&nbsp;own&nbsp;toys
            </h4>
          </BlurIn>
        </section>
      </LettersReveal>
      <StackedCards
        cards={[
          <ServiceCard
            title="Deploy, mau!"
            description="Provision and manage your infrastracture on AWS without the hassle and extra DevOps work."
            screenshots={[
              "/screenshots/mau_1.png",
              "/screenshots/mau_3.png",
              "/screenshots/mau_2.png",
            ]}
            onClick={() => {
              window.open("https://mau.nestjs.com/", "_blank");
            }}
            colors={["#111111", "#202020", "#111"]}
            itemsBackground="radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)"
            cardItems={[
              {
                title: "One-click deployment",
                description:
                  "Deploy your Nest application to AWS with a single command and let us handle the rest.",
              },
              {
                title: "Stream your logs",
                description:
                  "Get real-time visibility into log data, detect anomalies immediately, and respond swiftly.",
              },
              {
                title: "Track your metrics",
                description:
                  "Monitor key performance indicators to ensure optimal application performance.",
              },
            ]}
          />,
          <ServiceCard
            title="Devtools"
            description="Enhance your development workflow with powerful tools designed to streamline your Nest application development."
            screenshots={[
              "/screenshots/devtools_1.png",
              "/screenshots/devtools_2.png",
              "/screenshots/devtools_3.png",
            ]}
            onClick={() => {
              window.open("https://devtools.nestjs.com/", "_blank");
            }}
            itemsBackground="radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)"
            cardItems={[
              {
                title: "Explore your graph",
                description:
                  "Visualize your application's architecture and dependencies with an interactive graph.",
              },
              {
                title: "Code playground",
                description:
                  "Experiment with your code in a safe, sandboxed environment without affecting your main codebase.",
              },
              {
                title: "CI/CD integration",
                description:
                  "Seamlessly integrate with your CI/CD pipeline to detect issues early.",
              },
            ]}
          />,
        ]}
      />
      <EnterpriseSection className="lg:mt-30 mt-0" />
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
