import { useEffect, useState } from "react";
import { BlurIn } from "../components/animations/blur-in/blur-in";
import { LettersReveal } from "../components/animations/letters-reveal/letters-reveal";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";
import FeatureCards from "../components/domain/feature-cards/feature-cards";
import { SectionSubheading } from "../components/domain/section-subheading/section-subheading";
import { ServiceCard } from "../components/domain/service-card/service-card";
import StackedCards from "../components/misc/stacked-cards/stacked-cards";
import { BrandsSection } from "../sections/brands/brands-section";
import { CoursesSection } from "../sections/courses/courses-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import { Footer } from "../sections/footer/footer";
import { Header } from "../sections/header/header";
import { SponsorsSection } from "../sections/sponsors/sponsors-section";
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

export default function Home() {
  const [stats, setStats] = useState<NestStats | null>(null);

  useEffect(() => {
    fetchNestStats()
      .then(setStats)
      .catch(() => null);
  }, []);

  return (
    <>
      <Header stats={stats} />
      <div className="flex justify-center md:mt-20 mt-8 mb-0">
        <BrandsSection />
      </div>
      <div className="flex justify-center mt-30">
        <div className="container relative md:px-0 px-5">
          <div className="grid md:grid-cols-[60%_10%_30%] sm:grid-cols-[60%_5%_35%] grid-rows-[auto] gap-0">
            <div>
              <SectionSubheading>What is Nest</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium md:text-5xl sm:text-3xl text-4xl mb-4 md:leading-14 sm:leading-10 leading-12"
                enableBlur
              >
                Nest is a modern framework designed to build efficient, scalable
                web applications
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light sm:pt-10 pt-4"
              ElementTag="p"
              enableBlur
            >
              Built on TypeScript and Node.js, Nest blends best programming
              practices with a clean, modular architecture, keeping projects
              organized and easy to maintain.
            </ScrollReveal>
          </div>
        </div>
      </div>
      <div className="lg:pt-50 lg:pb-40 pt-40 pb-16 flex justify-center overflow-hidden">
        <FeatureCards
          className="custom-bounceCards"
          cards={[
            {
              icon: <img src="/features-icons/modules.png" />,
              title: "Modules",
              description:
                "Streamline upkeep by organizing applications into self-contained modules.",
            },
            {
              icon: <img src="/features-icons/dependency.png" />,
              title: "Dependency Injection",
              description:
                "Boost code maintainability and testability with built-in dependency injection.",
            },
            {
              icon: <img src="/features-icons/typesafety.png" />,
              title: "Type Safety",
              description:
                "Mitigate errors through the robust type safety features of TypeScript.",
            },
            {
              icon: <img src="/features-icons/enterprise-ready.png" />,
              title: "Enterprise Ready",
              description:
                "Trusted by thousands of leading companies and organizations worldwide.",
            },
            {
              icon: <img src="/features-icons/scalability.png" />,
              title: "Decorators",
              description:
                "Enhance code readability and structure with TypeScript decorators.",
            },
            {
              icon: <img src="/features-icons/microservices.png" />,
              title: "Microservices",
              description:
                "Build scalable and efficient microservice architectures with ease.",
            },
            {
              icon: <img src="/features-icons/webapps.png" />,
              title: "Web Apps",
              description:
                "Create dynamic and responsive web applications effortlessly.",
            },
          ]}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          enableHover
        />
      </div>
      <LettersReveal ElementTag="h4">
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
      <div className="relative centered text-center flex items-center flex-col">
        <ScrollReveal
          ElementTag="h4"
          className="text-sm font-mono opacity-80 max-w-2xl leading-8 font-light p-10"
          wordAnimationEnd="bottom 40%"
          enableBlur
        >
          Explore our tools built to supercharge your Nest workflow. Discover
          solutions we created to streamline development, automate tasks, and
          help you ship faster with greater confidence.
        </ScrollReveal>
      </div>
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
            colors={["#111111", "#202020", "#111"]}
            itemsBackground="radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)"
            cardItems={[
              {
                title: "One-click deployment",
                description:
                  "Provision and manage your infrastracture on AWS without the hassle and extra DevOps work.",
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
            description="Provision and manage your infrastracture on AWS without the hassle and extra DevOps work."
            screenshots={[
              "/screenshots/devtools_1.png",
              "/screenshots/devtools_2.png",
              "/screenshots/devtools_3.png",
            ]}
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
      <SyntaxSection className="my-30 pt-2" />
      <CoursesSection className="sm:pt-30 pt-0" />
      <div className="sm:p-10 sm:mt-50 mt-20 p-4">
        <StatsSection stats={stats} />
      </div>
      <TestimonialsSection />
      <SponsorsSection />
      <Footer className="mt-20" />
    </>
  );
}
