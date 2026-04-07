import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
// @ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import Conference from "../assets/marketing/conferences.png";
import Chart from "../assets/misc/chart.svg?react";
import EnterpriseTestimonialAvatar from "../assets/testimonials/otg/author.jpeg";
import DevtoolsThumbnail from "../assets/thumbnails/devtools.png";
import MauThumbnail from "../assets/thumbnails/mau.png";
import AnimatedContent from "../components/animations/animated-content/animated-content";
import { BlurIn } from "../components/animations/blur-in/blur-in";
import LightRays from "../components/animations/light-rays/light-rays";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";
import NoiseOverlay from "../components/backgrounds/noise-overlay/noise-overlay";
import { PrimaryButton } from "../components/buttons/primary-button/primary-button";
import { SectionSubheading } from "../components/domain/section-subheading/section-subheading";
import { BrandsSection } from "../sections/brands/brands-section";
import { CoursesSection } from "../sections/courses/courses-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import { Footer } from "../sections/footer/footer";
import { Header, type MenuItem } from "../sections/header/header";
import { StatsSection } from "../sections/stats/stats-section";
import { TestimonialsSection } from "../sections/testimonials/testimonials-section";
import { fetchNestStats, type NestStats } from "../services/nest-stats.service";
import type { Route } from "./+types/home";

gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS: Array<MenuItem> = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "https://docs.nestjs.com" },
  {
    id: "courses",
    label: "Courses",
    href: "https://courses.nestjs.com",
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
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNestStats()
      .then(setStats)
      .catch(() => null);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = gsap.context(() => {
      const bars = chartRef.current!.querySelectorAll("rect");

      gsap.set(bars, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "bottom center",
        filter: "hue-rotate(90deg) brightness(0.2)",
      });
      gsap.set(chartRef.current, { opacity: 1 });

      gsap.to(bars, {
        scaleY: 1,
        opacity: 1,
        filter: "hue-rotate(0deg) brightness(1)",
        duration: 3,
        stagger: {
          each: 0.008,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, chartRef);

    return () => ctx.revert();
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
        className="lg:mt-30 mt-0"
        subheading="Enterprise Solutions"
        primaryText="Accelerate your development"
        secondaryText="We work alongside you to meet your deadlines while avoiding costly tech debt. Challenging issue? We've got you covered."
        variant="description"
      />
      <AnimatedContent distance={250} delay={0.1} initialOpacity={0}>
        <section id="testimonial" className="flex justify-center my-24">
          <div className="rounded-[20px] border border-white/15 p-2 relative container">
            <div className="bg-gradient-to-b from-[#1b1b1b] to-[#0e0e0e] rounded-[16px] py-42 relative z-10 overflow-hidden">
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
              <div className="flex items-start max-w-3xl mx-auto z-100 relative">
                <div className="flex items-center flex-col">
                  <AnimatedContent distance={20} delay={0.2} initialOpacity={0}>
                    <div className="rounded-[13px] w-[180px] h-[180px] overflow-hidden">
                      <img
                        src={EnterpriseTestimonialAvatar}
                        alt="Natalie Mazza"
                      />
                    </div>
                  </AnimatedContent>
                  <div className="mt-6">
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
                <div className="relative ml-14">
                  <AnimatedContent distance={20} delay={0.5} initialOpacity={0}>
                    <span className="absolute text-[6rem] -top-4 -left-2 leading-1">
                      “
                    </span>
                  </AnimatedContent>
                  <AnimatedContent distance={20} delay={0.6} initialOpacity={0}>
                    <p className="text-xl leading-9">
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
      <div className="px-5 pt-24 mt-80 relative pb-160">
        <div
          ref={chartRef}
          className="absolute inset-0 l-0 r-0 -top-50 opacity-0"
        >
          <Chart className="opacity-20 w-full" height={1200} />
        </div>
        <div className="container relative flex mx-auto md:flex-row flex-col items-center">
          <div className="max-w-[800px]">
            <SectionSubheading>Consulting</SectionSubheading>
            <ScrollReveal
              ElementTag="h2"
              className="font-medium sm:text-6xl text-[2.75rem] leading-[1.1]"
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
      <div className="px-5 py-8 mb-30 relative">
        <div className="container relative flex mx-auto md:flex-row flex-col items-center">
          <div className="grid md:grid-cols-[50%_10%_40%] grid-rows-[auto] gap-0 place-items-center">
            <div>
              <SectionSubheading>Expertise</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium sm:text-5xl text-[2.75rem] leading-[1.1]"
                enableBlur
              >
                Maximize Performance. Minimize Risk.
              </ScrollReveal>
              <ScrollReveal
                className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
                ElementTag="p"
                enableBlur
              >
                Our enterprise NestJS support proactively identifies bottlenecks
                and improves system performance across complex environments. We
                help you maintain stability and reduce risk even under heavy
                production load.
              </ScrollReveal>
              <div className="mt-10">
                <BlurIn distance={20} delay={0.1} initialOpacity={0}>
                  <PrimaryButton
                    href="mailto:support@nestjs.com"
                    target="_blank"
                  >
                    Contact us
                  </PrimaryButton>
                </BlurIn>
              </div>
            </div>
            <span />
            <div>
              <BlurIn distance={20} delay={0.1} initialOpacity={0}>
                <img
                  src={Conference}
                  alt="Conference"
                  className="rounded-[20px] w-full"
                />
              </BlurIn>
            </div>
          </div>
        </div>
      </div>
      <CoursesSection className="sm:pt-30 pt-0" />
      <div className="sm:p-10 sm:mt-50 mt-20 p-4">
        <StatsSection stats={stats} />
      </div>
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
