import { useEffect, useState } from "react";
import Conference from "../assets/marketing/conferences.jpg";
import Training from "../assets/marketing/trainings.jpg";
import { MENU_ITEMS } from "../marketing-ui/common/menu";
import ScrollReveal from "../marketing-ui/components/animations/scroll-reveal/scroll-reveal";
import AnimatedChart from "../marketing-ui/components/backgrounds/animated-chart/animated-chart";
import { PrimaryButton } from "../marketing-ui/components/buttons/primary-button/primary-button";
import { SectionSubheading } from "../marketing-ui/components/domain/section-subheading/section-subheading";
import { TiltedTestimonial } from "../marketing-ui/components/domain/tilted-testimonial/tilted-testimonial";
import { BrandsSection } from "../marketing-ui/sections/brands/brands-section";
import { CoursesSection } from "../marketing-ui/sections/courses/courses-section";
import { EnterpriseSection } from "../marketing-ui/sections/enterprise/enterprise-section";
import { Footer } from "../marketing-ui/sections/footer/footer";
import { Header } from "../marketing-ui/sections/header/header";
import PhotoSection from "../marketing-ui/sections/photo/photo-section";
import { TestimonialsSection } from "../marketing-ui/sections/testimonials/testimonials-section";
import {
  fetchNestStats,
  type NestStats,
} from "../marketing-ui/services/nest-stats.service";
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
      <div className="px-5 pt-24 md:mt-80 relative lg:pb-160 md:pb-120 pb-40">
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
      <div className="flex justify-center">
        <div className="container relative md:px-0 px-5 flex flex-col-reverse md:flex-col">
          <div className="grid md:grid-cols-[50%_10%_40%] grid-rows-[auto] gap-0 md:mt-0 mt-12">
            <div>
              <SectionSubheading>Expertise</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium md:text-5xl sm:text-3xl text-4xl mb-4 md:leading-14 sm:leading-10 leading-12"
                enableBlur
              >
                Maximize Performance. Minimize Risk.
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light sm:pt-10 pt-4"
              ElementTag="p"
              enableBlur
            >
              Our enterprise NestJS support proactively identifies bottlenecks
              and improves system performance across complex environments. We
              help you maintain stability and reduce risk even under heavy
              production load.
            </ScrollReveal>
          </div>
          <div className="overflow-hidden rounded-[32px] mt-24">
            <img src={Conference} alt="Conference" className="w-full" />
          </div>
        </div>
      </div>
      <PhotoSection
        subheading="Education"
        heading="Hands-on workshops led by experienced engineers"
        text="Focused, practical sessions that help teams build and scale with
              NestJS. We cover core concepts, architecture, testing, and
              performance through real-world examples - so your developers can
              apply what they learn immediately."
        cta={
          <PrimaryButton href="mailto:support@nestjs.com" target="_blank">
            Contact us
          </PrimaryButton>
        }
        image={
          <img
            src={Training}
            alt="Training"
            className="rounded-[20px] w-full"
          />
        }
        className="px-5 py-8 md:mt-60 mt-30 md:mb-30 mb-12"
      />
      <CoursesSection
        className="sm:pt-30 pt-0"
        heading="Upskill your team"
        description="Give your team access to 200+ lessons to master NestJS and confidently build secure, scalable, enterprise-grade backend systems."
        ctaText="Browse courses"
      />
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
