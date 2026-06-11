import { useEffect, useState } from "react";
import { MENU_ITEMS } from "../common/menu";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
import { SectionSubheading } from "../components/domain/section-subheading/section-subheading";
import { CoursesSection } from "../sections/courses/courses-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import { Footer } from "../sections/footer/footer";
import { Header } from "../sections/header/header";
import { ProductsSection } from "../sections/products/products-section";
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

export default function Jobs() {
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
        stats={stats}
        breadcrumb="Jobs"
        heading="Official NestJS job board"
        subheading="Find your next opportunity or hire experienced NestJS developers. Browse the latest job openings from top companies around the world, all in one place."
        actions={<PrimaryButton href="/dashboard">Post a job</PrimaryButton>}
        shrink={false}
      />
      <div className="flex justify-center my-30">
        <div className="container relative md:px-0 px-5 flex flex-col-reverse md:flex-col">
          <div className="grid md:grid-cols-[50%_10%_40%] grid-rows-[auto] gap-0 md:mt-0 mt-12">
            <div>
              <SectionSubheading>Jobs</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium md:text-5xl sm:text-3xl text-4xl mb-4 md:leading-14 sm:leading-10 leading-12"
                enableBlur
              >
                Find your next opportunity. Hire top talent.
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light sm:pt-10 pt-4"
              ElementTag="p"
              enableBlur
            >
              Browse the latest job openings from top companies around the
              world, all in one place. Whether you're a seasoned developer or
              just starting your career, our job board connects you with
              exciting opportunities that match your skills and aspirations.
            </ScrollReveal>
          </div>
        </div>
      </div>
      <ProductsSection />
      <EnterpriseSection className="lg:mt-30 mt-0" />
      <CoursesSection className="sm:pt-30 pt-0" />
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
