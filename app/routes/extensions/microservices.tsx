import {
  ChatsIcon,
  DatabaseIcon,
  EnvelopeSimpleIcon,
  InfinityIcon,
  NetworkIcon,
  PlayCircleIcon,
  ScrollIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import { MICROSERVICES_CURRICULUM } from "../../data/courses/microservices";
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

export default function MicroservicesExtension() {
  return (
    <CourseExtensionPage
      breadcrumb="Courses / Extensions"
      subheading="Course extension"
      heading="Microservices"
      headerSubheading="Dive into the exciting world of Microservice Architectures and learn how to easily tackle them with the help of NestJS."
      description="Dive into the exciting world of Microservice Architectures and learn how to easily tackle them with the help of NestJS. In this course, we will be covering many powerful Microservice Concepts & Patterns used in some of today's most complex Node.js systems in the real-world!"
      curriculumText="Prepare for an in-depth guided course & walk-through about the complex world of Microservices, setting up our own Microservice system with NestJS, all from the ground-up! Learn directly from the NestJS Creator - Kamil Mysliwiec himself, and Mark Pieszak (Core Team Member)."
      fadeInColors={{
        desktop: ["#004956", "#000", "#053841"],
        mobile: ["#004956", "#07454e", "#053841"],
        css: "#004956",
      }}
      bulletpoints={[
        {
          icon: <PlayCircleIcon weight="fill" size={32} />,
          title: "20 videos",
          description:
            "Featuring 20 videos (with subtitles) and over 2 hours of content.",
        },
        {
          title: "Monolithic Architecture vs Microservices",
          icon: <NetworkIcon weight="fill" size={32} />,
          description:
            "Build a solid understanding of monolithic and microservices architectures and how they differ.",
        },
        {
          title: "Horizontal vs Vertical Scaling",
          icon: <TrendUpIcon weight="fill" size={32} />,
          description:
            "Gain clarity on horizontal vs vertical scaling and when each approach fits.",
        },
        {
          title: "Data consistency",
          icon: <DatabaseIcon weight="fill" size={32} />,
          description:
            "Understand the principles of data consistency and how they’re maintained in systems.",
        },
        {
          title: "Communication brokers",

          icon: <ChatsIcon weight="fill" size={32} />,
          description:
            "Explore how communication brokers facilitate messaging and decoupling in microservice systems.",
        },
        {
          title: "Outbox / Inbox",
          icon: <EnvelopeSimpleIcon weight="fill" size={32} />,
          description:
            "Learn how to implement the transactional outbox and inbox patterns to ensure reliable message delivery in microservice systems.",
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
      curriculum={MICROSERVICES_CURRICULUM}
      courseTitle="Microservices Extension"
      coursePrice="$59.99"
      courseDiscountedPrice="$79"
      purchaseUrl="https://learn.nestjs.com/purchase?product_id=5468604"
    />
  );
}
