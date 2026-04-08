import { useEffect, useState } from "react";
import Conference from "../assets/marketing/conferences.png";
import EnterpriseTestimonialAvatar from "../assets/testimonials/otg/author.jpeg";
import DevtoolsThumbnail from "../assets/thumbnails/devtools.png";
import MauThumbnail from "../assets/thumbnails/mau.png";
import AnimatedContent from "../components/animations/animated-content/animated-content";
import LightRays from "../components/animations/light-rays/light-rays";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";
import AnimatedChart from "../components/backgrounds/animated-chart/animated-chart";
import NoiseOverlay from "../components/backgrounds/noise-overlay/noise-overlay";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
import { SectionSubheading } from "../components/domain/section-subheading/section-subheading";
import { BrandsSection } from "../sections/brands/brands-section";
import { CoursesSection } from "../sections/courses/courses-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import { Footer } from "../sections/footer/footer";
import { Header, type MenuItem } from "../sections/header/header";
import PhotoSection from "../sections/photo/photo-section";
import { StatsSection } from "../sections/stats/stats-section";
import { TestimonialsSection } from "../sections/testimonials/testimonials-section";
import { fetchNestStats, type NestStats } from "../services/nest-stats.service";
import type { Route } from "./+types/home";

const MENU_ITEMS: Array<MenuItem> = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "https://docs.nestjs.com" },
  {
    id: "courses",
    label: "Courses",
    href: "/courses",
  },
  {
    id: "tools",
    label: "Tools",
    href: "#",
    children: [
      {
        id: "devtools",
        label: "Devtools",
        href: "https://devtools.nestjs.com",
        description: "Identify dependencies and connections between modules.",
        thumbnail: DevtoolsThumbnail,
      },
      {
        id: "mau",
        label: "Deploy, Mau!",
        href: "https://mau.nestjs.com",
        description: "Provision and manage your infrastructure on AWS.",
        thumbnail: MauThumbnail,
      },
    ],
  },
  { id: "jobs", label: "Jobs", href: "https://jobs.nestjs.com" },
];

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
      <AnimatedContent distance={250} delay={0.1} initialOpacity={0}>
        <section
          id="testimonial"
          className="flex justify-center md:my-24 my-12 px-4"
        >
          <div className="rounded-[20px] border border-white/15 p-2 relative container">
            <div className="bg-gradient-to-b from-[#1b1b1b] to-[#0e0e0e] rounded-[16px] md:py-42 py-16 md:px-12 relative z-10 overflow-hidden">
              <NoiseOverlay opacity={0.1} />
              <div className="absolute scale-150 inset-0 pointer-events-none rounded-[16px]">
                <LightRays
                  raysOrigin="top-right"
                  raysSpeed={0.75}
                  lightSpread={5}
                  rayLength={50}
                  followMouse={false}
                  mouseInfluence={0.1}
                  noiseAmount={0.1}
                  distortion={0.05}
                  opacity={0.3}
                />
              </div>
              <div className="flex md:items-start md:flex-row flex-col-reverse max-w-3xl mx-auto z-100 relative">
                <div className="flex items-center flex-col md:mt-0 mt-12">
                  <AnimatedContent distance={20} delay={0.2} initialOpacity={0}>
                    <div className="rounded-[13px] w-[180px] h-[180px] overflow-hidden">
                      <img
                        src={EnterpriseTestimonialAvatar}
                        alt="Natalie Mazza"
                      />
                    </div>
                  </AnimatedContent>
                  <div className="mt-6 md:text-left text-center">
                    <AnimatedContent
                      distance={20}
                      delay={0.3}
                      initialOpacity={0}
                    >
                      <h6 className="font-medium text-lg">Natalie Mazza</h6>
                    </AnimatedContent>
                    <AnimatedContent
                      distance={20}
                      delay={0.4}
                      initialOpacity={0}
                    >
                      <p className="text-sm opacity-75 font-mono font-light leading-[1.5] mt-1">
                        Partner, CPO @ OTG Management
                      </p>
                    </AnimatedContent>
                  </div>
                </div>
                <div className="relative md:ml-14 md:px-0 px-8 md:pt-0 pt-8">
                  <AnimatedContent distance={20} delay={0.5} initialOpacity={0}>
                    <span className="md:absolute text-[6rem] md:-top-4 -left-2 leading-1 block">
                      “
                    </span>
                  </AnimatedContent>
                  <AnimatedContent distance={20} delay={0.6} initialOpacity={0}>
                    <p className="md:text-xl md:leading-9 text-lg leading-8">
                      At the onset of a new project, we were looking for experts
                      to help us understand a new tech stack (with NestJS) and
                      implement it quickly and seamlessly. We sought out Trilon
                      as the experts in the space and were thrilled we did so.
                      They were able to quickly get our team up to speed on best
                      practices and made themselves readily available for
                      questions at all times...“
                    </p>
                  </AnimatedContent>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>
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
