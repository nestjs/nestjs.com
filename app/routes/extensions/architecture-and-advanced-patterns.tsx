import {
  ArrowsSplitIcon,
  BooksIcon,
  HexagonIcon,
  InfinityIcon,
  PipeIcon,
  PlayCircleIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { ARCHITECTURE_AND_ADVANCED_PATTERNS_CURRICULUM } from "../../data/courses/architecture-and-advanced-patterns";
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

export default function ArchitectureAndAdvancedPatternsExtension() {
  return (
    <CourseExtensionPage
      breadcrumb="Fundamentals Course / Extensions"
      subheading="Course extension"
      heading="Architecture and Advanced Patterns"
      headerSubheading="Master advanced Node.js architecture and design patterns like DDD and Hexagonal to build scalable, production-ready NestJS systems."
      description="In one of our most advanced courses yet. In this course, we will be covering many powerful Architectural Concepts & Patterns used in some of today's most complex Node.js systems in the real-world!"
      curriculumText="From N-Tier, Hexagonal, Domain Driven-Design, and so much, you'll be ready to build world-class NestJS / Node.js systems in no-time! Prepare for an in-depth guided course & walk-through of real-world Advanced Architectural Concepts & Patterns from the Creator Kamil Mysliwiec himself, and Mark Pieszak (Core Team Member)."
      bulletpoints={[
        {
          icon: <PlayCircleIcon weight="fill" size={32} />,
          title: "21 videos",
          description:
            "Featuring 21 videos (with subtitles) and over 2 hours of content.",
        },
        {
          title: "Hexagonal / Onion Architectures",
          icon: <HexagonIcon weight="fill" size={32} />,
          description:
            "Learn how to implement Hexagonal/Onion Architectures in your NestJS applications.",
        },
        {
          title: "Domain Driven Design (DDD)",
          icon: <BooksIcon weight="fill" size={32} />,
          description:
            "And how to apply Domain Driven Design (DDD) principles to your NestJS applications.",
        },
        {
          title: "Event-driven architectures",
          icon: <PipeIcon weight="fill" size={32} />,
          description:
            "Deep dive into Event-driven architectures, setup Event Sourcing, and more.",
        },
        {
          title: "CQRS",
          icon: <ArrowsSplitIcon weight="fill" size={32} />,
          description:
            "Command Query Responsibility Segregation (CQRS), why, when, how.",
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
      curriculum={ARCHITECTURE_AND_ADVANCED_PATTERNS_CURRICULUM}
      courseTitle="Architecture and Advanced Patterns Extension"
      coursePrice="$95"
      courseDiscountedPrice="$125"
      purchaseUrl="https://learn.nestjs.com/purchase?product_id=5223094"
    />
  );
}
