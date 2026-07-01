import { useEffect, useState } from "react";
import { MENU_ITEMS } from "../marketing-ui/common/menu";
import ScrollReveal from "../marketing-ui/components/animations/scroll-reveal/scroll-reveal";
import FeatureCards from "../marketing-ui/components/domain/feature-cards/feature-cards";
import { SectionSubheading } from "../marketing-ui/components/domain/section-subheading/section-subheading";
import { BrandsSection } from "../marketing-ui/sections/brands/brands-section";
import { CoursesSection } from "../marketing-ui/sections/courses/courses-section";
import { EnterpriseSection } from "../marketing-ui/sections/enterprise/enterprise-section";
import { Footer } from "../marketing-ui/sections/footer/footer";
import { Header } from "../marketing-ui/sections/header/header";
import { ProductsSection } from "../marketing-ui/sections/products/products-section";
import { StatsSection } from "../marketing-ui/sections/stats/stats-section";
import { SyntaxSection } from "../marketing-ui/sections/syntax/syntax-section";
import { TestimonialsSection } from "../marketing-ui/sections/testimonials/testimonials-section";
import {
  fetchNestStats,
  type NestStats,
} from "../marketing-ui/services/nest-stats.service";
import { SponsorsSection } from "../sections/sponsors/sponsors-section";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NestJS - A progressive Node.js framework" },
    {
      name: "description",
      content:
        "NestJS is a framework for building efficient, scalable Node.js web applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).",
    },
    {
      property: "og:url",
      content: "https://nestjs.com",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "og:site_name",
      content: "NestJS - A progressive Node.js framework",
    },
    {
      property: "og:title",
      content: "NestJS - A progressive Node.js framework",
    },
    {
      property: "og:description",
      content:
        "NestJS is a framework for building efficient, scalable Node.js web applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).",
    },
    {
      property: "og:image",
      content: "https://nestjs.com/nest-og.png",
    },
    {
      property: "og:image:width",
      content: "820",
    },
    {
      property: "og:image:height",
      content: "429",
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
      <Header stats={stats} menuItems={MENU_ITEMS} />
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
      <ProductsSection />
      <EnterpriseSection className="lg:mt-30 mt-0" />
      <SyntaxSection className="mt-30 pt-2 pb-30" />
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
