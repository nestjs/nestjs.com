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
  COURSE_EXTENSIONS.find(
    (extension) => extension.extensionKey === "code-first",
  )!,
  COURSE_EXTENSIONS.find(
    (extension) => extension.extensionKey === "schema-first",
  )!,
].filter(Boolean) as CourseExtension[];

export default function GraphQLBundleExtension() {
  return (
    <CourseExtensionPage
      breadcrumb="Fundamentals Course / Extensions"
      subheading="Course extension"
      heading="GraphQL - Bundle"
      headerSubheading="Master both the code-first and schema-first approaches to building GraphQL APIs with NestJS. Learn GraphQL fundamentals, best practices, and everything you need to create scalable, enterprise-grade GraphQL applications."
      description="This complete GraphQL bundle combines both the code-first and schema-first courses, giving you a comprehensive understanding of each approach. Learn when to use each paradigm, master GraphQL concepts, and build production-ready APIs with NestJS."
      fadeInColors={{
        desktop: ["#2e104d", "#000", "#200c32"],
        mobile: ["#2e104d", "#200e31", "#200c32"],
        css: "#2e104d",
      }}
      bundle={BUNDLE}
      bulletpoints={[
        {
          icon: <SealPercentIcon weight="fill" size={32} />,
          title: "Save 25% with the bundle",
          description:
            "Get access to both the code-first and schema-first courses in one bundle, saving 25% compared to purchasing them separately.",
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
      courseTitle="GraphQL Bundle"
      coursePrice="$59.99"
      courseDiscountedPrice="$79.99"
      purchaseUrl="https://learn.nestjs.com/purchase?product_id=4215020"
      courseVideoUrl="https://player.vimeo.com/video/740669317?autoplay=1&muted=1&title=0&byline=0&portrait=0&sidedock=0"
    />
  );
}
