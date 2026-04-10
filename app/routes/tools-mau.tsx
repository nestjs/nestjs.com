import { useEffect, useState } from "react";
import { MENU_ITEMS } from "../common/menu";
import { BlurIn } from "../components/animations/blur-in/blur-in";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
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
          <div className="pt-12 relative flex w-full h-full">
            <BlurIn
              duration={0.9}
              delay={0.2}
              ease="power2.in"
              className="absolute left-0 -top-40 bottom-0 right-0 z-0"
            >
              <div
                className="md:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1),transparent_45%)] bg-[radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.9),transparent_30%)] 
                before:absolute before:inset-0 before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1),transparent_30%)]
                absolute inset-0 z-0 left-0 right-0 top-0 bottom-0 z-1 blur-xl [clip-path:inset(0_0_50%_0)]"
              />
            </BlurIn>
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
              <div
                className="p-4 pb-0 max-w-[90%] relative mx-auto mt-10 z-2
                border border-1 border-[rgba(255,255,255,0.1)] rounded-tl-[20px] rounded-tr-[20px]
                after:absolute after:inset-0 after:border after:border-[rgba(255,255,255,0.1)] after:rounded-tl-[24px] after:rounded-tr-[24px] after:top-[-8px] after:left-[-8px] after:right-[-8px] after:bottom-[-8px] after:z-0
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/15 before:to-white/5 before:via-white/40 before:pointer-events-none before:top-[-8px] before:left-[-8px] before:right-[-8px] before:bottom-[-8px] before:rounded-tl-[24px] before:rounded-tr-[24px] before:z-0"
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
      <FaqSection className="mt-50" />
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
