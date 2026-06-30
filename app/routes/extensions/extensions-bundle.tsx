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

const BUNDLE: CourseExtension[] = COURSE_EXTENSIONS.filter(
  (extension) => !extension.isBundle,
);

export default function ExtensionsBundleExtension() {
  return (
    <CourseExtensionPage
      breadcrumb="Fundamentals Course / Extensions"
      subheading="Course extension"
      heading="Extensions Bundle"
      headerSubheading="Master advanced NestJS development including GraphQL, microservices, authentication, and architecture—without the fundamentals course."
      description="This bundle includes all advanced NestJS courses, covering GraphQL (code-first and schema-first), microservices, authentication and authorization, and advanced architectural patterns. It is designed for developers who already understand NestJS basics and want to level up to production-grade system design."
      fadeInColors={{
        desktop: ["#68240c", "#000", "#370f00"],
        mobile: ["#68240c", "#370f00", "#370f00"],
        css: "#68240c",
      }}
      bundle={BUNDLE}
      bulletpoints={[
        {
          icon: <SealPercentIcon weight="fill" size={32} />,
          title: "Save 30% with the bundle",
          description:
            "Get access to all NestJS extensions in one bundle, saving 30% compared to purchasing them separately.",
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
      courseTitle="Extensions Bundle"
      coursePrice="$269.00"
      courseDiscountedPrice="$349.00"
      purchaseUrl="https://learn.nestjs.com/purchase?product_id=5772223"
    />
  );
}
