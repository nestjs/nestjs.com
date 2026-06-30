import {
  InfinityIcon,
  ScrollIcon,
  SealPercentIcon,
} from "@phosphor-icons/react";
import {
  COURSE_EXTENSIONS,
  type CourseExtension,
} from "../../data/courses/extensions";
import { CourseExtensionPage } from "../courses/extension-page";
import type { Route } from "./+types/architecture-and-advanced-patterns";

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

const BUNDLE: CourseExtension[] = [
  {
    title: "Fundamentals",
    duration: "+5 hours",
    lessonCount: 80,
    color: "42,157,143",
    price: 129.99,
    url: "/",
  } as any as CourseExtension,
].concat(COURSE_EXTENSIONS.filter((extension) => !extension.isBundle));

export default function AllInOneBundleExtension() {
  return (
    <CourseExtensionPage
      breadcrumb="Fundamentals Course / Extensions"
      subheading="Course extension"
      heading="All-in-One Bundle"
      headerSubheading="Master every aspect of NestJS with the complete learning bundle—from fundamentals and GraphQL to microservices, authentication, and advanced architecture."
      description="Get unlimited access to every NestJS course in one comprehensive bundle. Learn NestJS from the ground up, master GraphQL with both code-first and schema-first approaches, and build production-ready systems using microservices, authentication strategies, and advanced architectural patterns."
      fadeInColors={{
        desktop: ["#0a5048", "#000", "#03231f"],
        mobile: ["#0a5048", "#021513", "#03231f"],
        css: "#0a5048",
      }}
      bundle={BUNDLE}
      courseVideoUrl="https://player.vimeo.com/video/433943559?autoplay=1&muted=1&title=0&byline=0&portrait=0&sidedock=0"
      bulletpoints={[
        {
          icon: <SealPercentIcon weight="fill" size={32} />,
          title: "Save 30% with the bundle",
          description:
            "Get access to all NestJS courses in one bundle, saving 30% compared to purchasing them separately.",
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
      ]}
      courseTitle="All-in-One Bundle"
      coursePrice="$349.00"
      courseDiscountedPrice="$495.00"
      purchaseUrl="https://learn.nestjs.com/purchase?product_id=5772222"
    />
  );
}
