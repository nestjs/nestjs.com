import {
  HexagonIcon as Hexagon,
  PulseIcon,
  RocketIcon as Rocket,
  StarIcon as Star,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import MauCard1 from "../assets/mau-cards/card-1.png";
import MauCard2 from "../assets/mau-cards/card-2.png";
import MauCard3 from "../assets/mau-cards/card-3.png";
import HeaderBlock1 from "../assets/mau-header/header-block-1.png";
import HeaderBlock2 from "../assets/mau-header/header-block-2.png";
import { MENU_ITEMS } from "../common/menu";
import AnimatedContent from "../components/animations/animated-content/animated-content";
import { BlurIn } from "../components/animations/blur-in/blur-in";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
import { SectionSubheading } from "../components/domain/section-subheading/section-subheading";
import { BrandsSection } from "../sections/brands/brands-section";
import { CoursesSection } from "../sections/courses/courses-section";
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
        breadcrumb="tools / mau"
        heading="Deploy, mau!"
        subheading="Provision and manage your infrastructure on AWS without the hassle and extra DevOps work or additional operational complexity overhead."
        bottomPanel={
          <div className="pt-12 relative flex max-w-[90%] mx-auto h-full">
            <BlurIn
              delay={0.2}
              duration={0.5}
              ease="power2.out"
              className="relative z-2 sm:mt-0 mt-auto"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
              }}
            >
              <BlurIn
                className="absolute left-[20px] top-1/2 max-w-[12%] w-[200px] z-100"
                delay={0.1}
              >
                <img src={HeaderBlock1} className="pointer-events-none" />
              </BlurIn>
              <BlurIn
                className="absolute right-[20px] top-[15%] max-w-[12%] w-[200px] z-100"
                delay={0.3}
              >
                <img src={HeaderBlock2} className="pointer-events-none" />
              </BlurIn>
              <div
                className="p-4 pb-0 max-w-[90%] relative mx-auto mt-10 z-2
                border border-1 border-[rgba(255,255,255,0.1)] rounded-tl-[20px] rounded-tr-[20px]
                after:absolute after:inset-0 after:border after:border-[rgba(255,255,255,0.1)] after:rounded-tl-[24px] after:rounded-tr-[24px] after:top-[-8px] after:left-[-8px] after:right-[-8px] after:bottom-[-8px] after:z-0
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/15 before:to-white/5 before:pointer-events-none before:top-[-8px] before:left-[-8px] before:right-[-8px] before:bottom-[-8px] before:rounded-tl-[24px] before:rounded-tr-[24px] before:z-0"
              >
                <div className="absolute inset-0 rounded-tl-[20px] rounded-tr-[20px] bg-gradient-to-t from-white/15 to-white/5 top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] z-0"></div>
                <img
                  src={"/screenshots/mau_2.png"}
                  className="rounded-tl-[12px] rounded-tr-[12px] z-2 relative"
                />
              </div>
            </BlurIn>
          </div>
        }
        actions={
          <PrimaryButton
            href="https://docs.nestjs.com/"
            className="mr-5"
            target="_blank"
          >
            Start free trial
          </PrimaryButton>
        }
        shrink={false}
      />
      <div className="flex justify-center md:mt-20 mt-8 mb-0">
        <BrandsSection />
      </div>
      <div className="flex justify-center flex-col px-5 pt-40 pb-20">
        <div className="relative container mx-auto">
          <div className="grid md:grid-cols-[60%_10%_30%] sm:grid-cols-[60%_5%_35%] grid-rows-[auto] gap-0">
            <div>
              <SectionSubheading>Infrastructure simplified</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
                enableBlur
              >
                Deploy your applications in seconds
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-90 leading-6 font-light sm:pt-10 pt-4"
              ElementTag="p"
              enableBlur
            >
              Eliminate the burden of handling your infrastructure and instead
              concentrate on what truly counts most: growing and scaling your
              business.
            </ScrollReveal>
          </div>
        </div>
        <div className="relative lg:container mx-auto mt-30 mb-15 w-full">
          <div className="rounded-[32px] border border-white/8 bg-[#191717] w-full p-2 relative">
            <div className="flex md:flex-row flex-col items-center justify-between gap-2">
              <div className="flex items-center lg:h-[550px] md:h-[800px] h-[500px] md:flex-1 flex-auto w-full relative rounded-[24px] overflow-hidden border-white/12 border">
                <BlurIn delay={0.1} className="absolute inset-0">
                  <div
                    style={{ backgroundImage: `url(${MauCard1})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center"
                  />
                </BlurIn>
                <div className="absolute inset-0 bottom-0 left-0 right-0 pointer-events-none lg:p-10 p-6 top-auto lg:h-auto sm:h-[40%]">
                  <AnimatedContent delay={0.2} distance={10} duration={0.8}>
                    <h4 className="xl:text-3xl text-2xl">Track key metrics</h4>
                  </AnimatedContent>
                  <AnimatedContent delay={0.4} distance={15} duration={0.8}>
                    <p className="mt-4 lg:text-[14px] md:text-xs text-sm opacity-70 font-mono font-thin leading-6">
                      Providers are a core concept in Nest. Many of the basic
                      Nest classes, such as services, repositories, factories,
                      and helpers, can be treated as providers.
                    </p>
                  </AnimatedContent>
                </div>
              </div>
              <div className="flex items-center lg:h-[550px] md:h-[800px] h-[500px] md:flex-1 flex-auto w-full relative rounded-[24px] overflow-hidden border-white/12 border">
                <BlurIn delay={0.3} className="absolute inset-0">
                  <div
                    style={{ backgroundImage: `url(${MauCard2})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center"
                  />
                </BlurIn>
                <div className="absolute inset-0 bottom-0 left-0 right-0 pointer-events-none lg:p-10 p-6 top-auto lg:h-auto sm:h-[40%]">
                  <AnimatedContent delay={0.2} distance={10} duration={0.8}>
                    <h4 className="xl:text-3xl text-2xl">Stream your logs</h4>
                  </AnimatedContent>
                  <AnimatedContent delay={0.4} distance={15} duration={0.8}>
                    <p className="mt-4 lg:text-[14px] md:text-xs text-sm opacity-70 font-mono font-thin leading-6">
                      Get real-time visibility into log data, detect anomalies
                      immediately, and respond swiftly
                    </p>
                  </AnimatedContent>
                </div>
              </div>
              <div className="flex items-center lg:h-[550px] md:h-[800px] h-[500px] md:flex-1 flex-auto w-full relative rounded-[24px] overflow-hidden border-white/12 border">
                <BlurIn delay={0.3} className="absolute inset-0">
                  <div
                    style={{ backgroundImage: `url(${MauCard3})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center"
                  />
                </BlurIn>
                <div className="absolute inset-0 bottom-0 left-0 right-0 pointer-events-none lg:p-10 p-6 top-auto lg:h-auto sm:h-[40%]">
                  <AnimatedContent delay={0.2} distance={10} duration={0.8}>
                    <h4 className="xl:text-3xl text-2xl">Traffic insights</h4>
                  </AnimatedContent>
                  <AnimatedContent delay={0.4} distance={15} duration={0.8}>
                    <p className="mt-4 lg:text-[14px] md:text-xs text-sm opacity-70 font-mono font-thin leading-6">
                      Explore historical traffic data, assess response times,
                      and evaluate failure trends for informed decision-making.
                    </p>
                  </AnimatedContent>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 grid md:grid-cols-4 md:grid-rows-1 grid-cols-2 grid-rows-2 md:gap-y-16 md:gap-x-16 gap-y-16 gap-x-4 mx-auto">
            <AnimatedContent distance={20} delay={0.1} duration={0.8}>
              <div className="flex items-center gap-2">
                <Hexagon size="18px" />
                <h6 className="text-lg">Smart canvas</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                An intuitive visual interface to manage your infrastructure.
              </p>
            </AnimatedContent>
            <AnimatedContent distance={20} delay={0.2} duration={0.8}>
              <div className="flex items-center gap-2">
                <Rocket size="18px" />
                <h6 className="text-lg">One-click deployment</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                Deploy your Nest application to AWS with a single command.
              </p>
            </AnimatedContent>
            <AnimatedContent distance={20} delay={0.3} duration={0.8}>
              <div className="flex items-center gap-2">
                <Star size="18px" />
                <h6 className="text-lg">Real-time logs</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                Get real-time visibility into log data and detect anomalies
                immediately.
              </p>
            </AnimatedContent>
            <AnimatedContent distance={20} delay={0.4} duration={0.8}>
              <div className="flex items-center gap-2">
                <PulseIcon size="18px" />
                <h6 className="text-lg">Traffic insights</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                Explore historical traffic data and evaluate failure trends.
              </p>
            </AnimatedContent>
          </div>
        </div>
      </div>
      <FaqSection />
      <EnterpriseSection className="lg:mt-30 mt-0" />
      <SyntaxSection className="mt-30 pt-2 pb-30" />
      <CoursesSection className="sm:pt-30 pt-0" />
      <div className="sm:p-10 sm:mt-50 mt-20 p-4">
        <StatsSection stats={stats} />
      </div>
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
