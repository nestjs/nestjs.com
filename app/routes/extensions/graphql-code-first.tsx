import {
  DatabaseIcon,
  InfinityIcon,
  MathOperationsIcon,
  PlayCircleIcon,
  PuzzlePieceIcon,
  ScrollIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";
import { GRAPHQL_CODE_FIRST_CURRICULUM } from "../../data/courses/graphql-code-first";
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

export default function GraphQLCodeFirstExtension() {
  return (
    <CourseExtensionPage
      breadcrumb="Courses / Extensions"
      subheading="Course extension"
      heading="GraphQL Code First"
      headerSubheading="Learn everything about the code-first approach to creating GraphQL APIs with NestJS. Master GraphQL concepts, tips & tricks, and everything you need to your own enterprise-grade GraphQL APIs."
      description="Learn everything about the code-first approach to creating GraphQL APIs with NestJS. Master GraphQL concepts, tips & tricks, and everything you need to your own enterprise-grade GraphQL APIs."
      curriculumText="Prepare for an in-depth guided course & walk-through of GraphQL fundamentals and utilizing the code-first approaches within NestJS applications from the Creator Kamil Mysliwiec himself, and Mark Pieszak (Core Team Member)."
      fadeInColors={{
        desktop: ["#2e104d", "#000", "#200c32"],
        mobile: ["#2e104d", "#200e31", "#200c32"],
        css: "#2e104d",
      }}
      bulletpoints={[
        {
          icon: <PlayCircleIcon weight="fill" size={32} />,
          title: "23 videos",
          description:
            "Featuring 23 videos (with subtitles) and 2 hours of content.",
        },
        {
          title: "Queries, Mutations, and Subscriptions",
          icon: <MathOperationsIcon weight="fill" size={32} />,
          description:
            "Learn how to implement Queries, Mutations, and Subscriptions in your GraphQL APIs.",
        },
        {
          title: "PostgreSQL database integration",
          icon: <DatabaseIcon weight="fill" size={32} />,
          description:
            "Interact with an actual PostgreSQL database and learn how to integrate it with your GraphQL APIs.",
        },
        {
          title: "Data loaders",
          icon: <TreeStructureIcon weight="fill" size={32} />,
          description:
            "Leverage data loaders to optimize your GraphQL APIs and prevent the N+1 problem.",
        },
        {
          title: "Scalars, Interfaces, and Enums",
          icon: <PuzzlePieceIcon weight="fill" size={32} />,
          description:
            "Explore how scalars, interfaces, and enums can be used to improve your GraphQL APIs.",
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
      curriculum={GRAPHQL_CODE_FIRST_CURRICULUM}
      courseTitle="GraphQL Code-First Extension"
      coursePrice="$39.99"
      courseDiscountedPrice="$59.99"
      purchaseUrl="https://learn.nestjs.com/purchase?product_id=4215017"
    />
  );
}
