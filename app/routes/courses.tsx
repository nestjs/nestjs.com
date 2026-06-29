import {
  ArrowsClockwiseIcon,
  IdentificationBadgeIcon,
  InfinityIcon,
  PlayCircleIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FUNDAMENTALS_CURRICULUM } from "../data/courses/fundamentals";
import { MENU_ITEMS } from "../marketing-ui/common/menu";
import { PrimaryButton } from "../marketing-ui/components/buttons/primary-button/primary-button";
import { CourseVideoModal } from "../marketing-ui/components/domain/course-curriculum/course-curriculum";
import { CoursesFan } from "../marketing-ui/components/domain/courses-fan/courses-fan";
import { TiltedText } from "../marketing-ui/components/domain/tilted-text/tilted-text";
import BarChartSection from "../marketing-ui/sections/bar-chart/bar-chart-section";
import { CertificatesSection } from "../marketing-ui/sections/certificates/certificates-section";
import CommunitySection from "../marketing-ui/sections/community/community-section";
import FaqSection from "../marketing-ui/sections/faq/faq-section";
import { Footer } from "../marketing-ui/sections/footer/footer";
import { Header } from "../marketing-ui/sections/header/header";
import { ProductsSection } from "../marketing-ui/sections/products/products-section";
import { TestimonialsSection } from "../marketing-ui/sections/testimonials/testimonials-section";
import type { Route } from "./+types/home";
import { CourseOverviewSection } from "./courses/course-overview-section";
import { ExtensionsSection } from "./courses/extensions-sections";
import { FAQ_ITEMS } from "./courses/faq";

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

const FUNDAMENTALS_ITEMS: Array<{
  icon: string | React.ReactNode;
  title: string;
  description: string;
  footnote?: React.ReactNode;
  videoId?: string;
}> = [
  {
    icon: <PlayCircleIcon weight="fill" size={32} />,
    title: "80 videos",
    description:
      "Featuring 80 videos (with subtitles) and over 5 hours of content.",
    footnote: "Watch free lesson",
    videoId: "447091051",
  },
  {
    title: "From NestJS creator",
    icon: <IdentificationBadgeIcon weight="fill" size={32} />,
    description:
      "The only official course from the Creator Kamil Mysliwiec himself, and Mark Pieszak (Core Team Member).",
  },
  {
    title: "Official certification",
    icon: <ScrollIcon weight="fill" size={32} />,
    description:
      "Receive an official certificate of completion to showcase your new skills and boost your career.",
    footnote: <a href="#certified">See certified developers</a>,
  },
  {
    title: "Lifetime access",
    icon: <InfinityIcon weight="fill" size={32} />,
    description:
      "Get lifetime access to the course content, including all future updates and additions.",
  },
  {
    title: "Regular content updates",
    icon: <ArrowsClockwiseIcon weight="fill" size={32} />,
    description:
      "We regularly update the course content to reflect the latest NestJS features and best practices.",
  },
];

export default function Courses() {
  const location = useLocation();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("preview")) {
      setSelectedVideoId("447091051");
    }
  }, [location.search]);

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
      <CourseOverviewSection
        subheading="Fundamentals course"
        heading="Become an expert with NestJS Fundamentals Course"
        description="Get up to speed with NestJS fast. Master the building blocks and essential concepts behind creating your own enterprise-grade applications."
        bulletpoints={FUNDAMENTALS_ITEMS}
        curriculumText="The course curriculum is designed to take you from the basics of NestJS to advanced concepts, covering everything you need to know to build production-ready applications."
        curriculum={FUNDAMENTALS_CURRICULUM}
        setSelectedVideoId={setSelectedVideoId}
        courseVideoUrl="https://player.vimeo.com/video/433943559?autoplay=1&muted=1&title=0&byline=0&portrait=0&sidedock=0"
        courseTitle="NestJS Fundamentals Course"
        coursePrice="$129"
        courseDiscountedPrice="$175"
        purchaseUrl="https://learn.nestjs.com/purchase?product_id=5676925"
      />
      <ExtensionsSection />
      <CommunitySection />
      <CertificatesSection />
      <BarChartSection
        subheading="Hands-on"
        heading="Less reading. More building."
        text="Stop spending your learning time buried in documentation and passive reading. This course is designed to get you into the code immediately, building real projects from the very first lesson. You'll learn faster by doing, not by scrolling-turning concepts into working skills as you go."
        cta={
          <PrimaryButton href="#extensions">
            See course extensions
          </PrimaryButton>
        }
        chart={{
          aValue: 96,
          bValue: 52,
          xAxisLabel: "time spent coding",
          aLabel: "After course completion",
          bLabel: "No course",
        }}
        className="px-5 py-8 md:mt-60 mt-30"
      />
      <FaqSection className="md:mt-50" items={FAQ_ITEMS} />
      <TiltedText
        heading="Does your team need additional support?"
        content="Nest core team members can work directly with your team on a daily basis to help take your project to the next-level. Let us partner with you and your team to develop the most ambitious projects."
        buttonText="Enterprise official support"
        buttonLink="https://enterprise.nestjs.com"
      />
      <ProductsSection />
      <TestimonialsSection />
      <CourseVideoModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
      <Footer className="mt-20" />
    </>
  );
}
