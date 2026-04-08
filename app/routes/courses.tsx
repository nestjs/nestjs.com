import { useEffect, useState } from "react";
import DevtoolsThumbnail from "../assets/thumbnails/devtools.png";
import MauThumbnail from "../assets/thumbnails/mau.png";
import { BlurIn } from "../components/animations/blur-in/blur-in";
import { LettersReveal } from "../components/animations/letters-reveal/letters-reveal";
import { CoursesFan } from "../components/domain/courses-fan/courses-fan";
import { ServiceCard } from "../components/domain/service-card/service-card";
import StackedCards from "../components/misc/stacked-cards/stacked-cards";
import { BrandsSection } from "../sections/brands/brands-section";
import { EnterpriseSection } from "../sections/enterprise/enterprise-section";
import FaqSection from "../sections/faq-section/faq-section";
import { Footer } from "../sections/footer/footer";
import { Header, type MenuItem } from "../sections/header/header";
import { StatsSection } from "../sections/stats/stats-section";
import { SyntaxSection } from "../sections/syntax/syntax-section";
import { TestimonialsSection } from "../sections/testimonials/testimonials-section";
import { fetchNestStats, type NestStats } from "../services/nest-stats.service";
import type { Route } from "./+types/home";

const MENU_ITEMS: Array<MenuItem> = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "https://docs.nestjs.com" },
  {
    id: "enterprise",
    label: "Enterprise",
    href: "/enterprise",
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

import { useMemo } from "react";
import ScrollReveal from "../components/animations/scroll-reveal/scroll-reveal";

type Avatar = {
  id: number;
  x: number;
  y: number;
  size: number;
  url: string;
};

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

function UsersMesh() {
  const avatars: Avatar[] = useMemo(() => {
    const count = 30;

    // Create a loose grid to ensure even spacing
    const cols = 6;
    const rows = 5;

    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    const points: Avatar[] = [];

    let id = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (id >= count) break;

        // jitter inside each cell for natural randomness
        const x = c * cellWidth + getRandom(10, cellWidth - 15);
        const y = r * cellHeight + getRandom(10, cellHeight - 24);

        const userId = Math.floor(getRandom(1, 1000));

        points.push({
          id,
          x,
          y,
          size: 48,
          url: `https://avatars.githubusercontent.com/u/${userId}?v=4`,
        });

        id++;
      }
    }

    return points;
  }, []);

  return (
    <div className="relative w-full h-screen mt-60">
      {avatars.map((a) => (
        <BlurIn
          key={a.id}
          className="absolute rounded-full object-cover shadow-md overflow-hidden"
          style={{
            top: `${a.y}%`,
            left: `${a.x}%`,
            width: `${a.size}px`,
            height: `${a.size}px`,
            transform: "translate(-50%, -50%)",
          }}
          delay={Math.random() * 1.25}
          scale={0}
        >
          <img src={a.url} alt="avatar" className="grayscale opacity-30" />
        </BlurIn>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center container mx-auto px-4 bg-[radial-gradient(circle,_rgba(0,0,0,1),_transparent_70%)] shadow-lg">
          <ScrollReveal
            ElementTag="h2"
            className="font-medium md:text-8xl sm:text-3xl text-4xl mb-4 md:leading-28 sm:leading-10 leading-12"
            enableBlur
          >
            Join our ever-growing community of students
          </ScrollReveal>
          <ScrollReveal
            className="font-mono text-sm opacity-70 leading-6 font-light pt-4 max-w-4xl"
            ElementTag="p"
            enableBlur
          >
            Our courses are trusted by over 100,000 students worldwide. Become a
            part of our thriving community and start your NestJS journey today.
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
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
      <UsersMesh />
      <FaqSection />
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
