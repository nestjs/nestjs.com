import { useEffect, useState } from "react";
import { MENU_ITEMS } from "../common/menu";
import { BlurIn } from "../components/animations/blur-in/blur-in";
import { LettersReveal } from "../components/animations/letters-reveal/letters-reveal";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
import { CoursesFan } from "../components/domain/courses-fan/courses-fan";
import { ServiceCard } from "../components/domain/service-card/service-card";
import StackedCards from "../components/misc/stacked-cards/stacked-cards";
import BarChartSection from "../sections/bar-chart/bar-chart-section";
import { BrandsSection } from "../sections/brands/brands-section";
import CommunitySection from "../sections/community/community-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import FaqSection from "../sections/faq/faq-section";
import { Footer } from "../sections/footer/footer";
import { Header } from "../sections/header/header";
import { StatsSection } from "../sections/stats/stats-section";
import { SyntaxSection } from "../sections/syntax/syntax-section";
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
      <div className="flex justify-center md:mt-20 mt-8 mb-0">
        <BrandsSection />
      </div>
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
      <CommunitySection />
      <FaqSection className="mt-50" />
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
      <SyntaxSection className="mt-30 pt-2 pb-30" />
      <div className="sm:p-10 sm:mt-50 mt-20 p-4">
        <StatsSection stats={stats} />
      </div>
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
