import { useEffect, useState } from "react";
import Conference from "../assets/marketing/conferences.png";
import { MENU_ITEMS } from "../common/menu";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";
import AnimatedChart from "../components/backgrounds/animated-chart/animated-chart";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
import { SectionSubheading } from "../components/domain/section-subheading/section-subheading";
import { TiltedTestimonial } from "../components/domain/tilted-testimonial/tilted-testimonial";
import { BrandsSection } from "../sections/brands/brands-section";
import { CoursesSection } from "../sections/courses/courses-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import { Footer } from "../sections/footer/footer";
import { Header } from "../sections/header/header";
import PhotoSection from "../sections/photo/photo-section";
import { StatsSection } from "../sections/stats/stats-section";
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

export default function Enterprise() {
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
        breadcrumb="Enterprise"
        heading="Scale your enterprise with official support"
        subheading="Our Experts become your development partner to eliminate project risk, tackling the most ambitious projects - right by your side."
        actions={
          <PrimaryButton
            href="mailto:support@nestjs.com?subject=Enterprise%20Support%20Inquiry"
            target="_blank"
          >
            Get in touch
          </PrimaryButton>
        }
        shrink={false}
      />
      <div className="flex justify-center md:mt-20 mt-8 mb-0">
        <BrandsSection />
      </div>
      <EnterpriseSection
        className="lg:mt-30 mt-4"
        subheading="Enterprise Solutions"
        primaryText="Accelerate your development"
        secondaryText="We work alongside you to meet your deadlines while avoiding costly tech debt. Challenging issue? We've got you covered."
        variant="description"
      />
      <TiltedTestimonial />
      <div className="px-5 pt-24 md:mt-80 relative md:pb-160 pb-24">
        <AnimatedChart />
        <div className="container relative flex mx-auto md:flex-row flex-col items-center">
          <div className="max-w-[800px]">
            <SectionSubheading>Consulting</SectionSubheading>
            <ScrollReveal
              ElementTag="h2"
              className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
              enableBlur
            >
              Team augmentation. By your side at every step
            </ScrollReveal>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
              ElementTag="p"
              enableBlur
            >
              Nest core team members can work directly with your team on a daily
              basis to help take your project to the next-level. Let us partner
              with you and your team to develop the most ambitious projects.
            </ScrollReveal>
          </div>
        </div>
      </div>
      <PhotoSection
        subheading="Expertise"
        heading="Maximize Performance. Minimize Risk."
        text="Our enterprise NestJS support proactively identifies bottlenecks and improves system performance across complex environments. We help you maintain stability and reduce risk even under heavy production load."
        cta={
          <PrimaryButton href="mailto:support@nestjs.com" target="_blank">
            Contact us
          </PrimaryButton>
        }
        image={
          <img
            src={Conference}
            alt="Conference"
            className="rounded-[20px] w-full"
          />
        }
        className="px-5 py-8 mb-30"
      />
      <CoursesSection
        className="sm:pt-30 pt-0"
        heading="Upskill your team"
        description="Give your team access to 200+ lessons to master NestJS and confidently build secure, scalable, enterprise-grade backend systems."
        ctaText="Browse courses"
      />
      <div className="sm:p-10 sm:mt-50 mt-20 p-4">
        <StatsSection stats={stats} />
      </div>
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
