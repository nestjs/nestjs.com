import {
  FingerprintIcon,
  HandshakeIcon,
  InfinityIcon,
  LockLaminatedIcon,
  PlayCircleIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { AUTHENTICATION_AND_AUTHORIZATION_CURRICULUM } from "../../data/courses/authentication-and-authorization";
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

export default function AuthenticationAndAuthorizationExtension() {
  return (
    <CourseExtensionPage
      breadcrumb="Courses / Extensions"
      subheading="Course extension"
      heading="Authentication and Authorization"
      headerSubheading="Create your own hand-written Authentication and Authorization with NestJS. Take full control over your IAM."
      description="Learn how to create your own hand-written Authentication and Authorization with NestJS. Take full control over your Authn/Authz from access to refresh tokens, and everything in between."
      curriculumText="Prepare for an in-depth guided course & walk-through of all the fundamentals of Authentication & Authorization from the Creator Kamil Mysliwiec himself, and Mark Pieszak (Core Team Member)."
      fadeInColors={{
        desktop: ["#55063b", "#000", "#300521"],
        mobile: ["#55063b", "#3d1931", "#300521"],
        css: "#55063b",
      }}
      bulletpoints={[
        {
          icon: <PlayCircleIcon weight="fill" size={32} />,
          title: "19 videos",
          description:
            "Featuring 19 videos (with subtitles) and over 2 hours of content.",
        },
        {
          title: "JWT-based authentication",
          icon: <FingerprintIcon weight="fill" size={32} />,
          description:
            "Implement JWT-based authentication to secure your NestJS applications.",
        },
        {
          title: "Server-side sessions",
          icon: <LockLaminatedIcon weight="fill" size={32} />,
          description: "Learn how to implement server-side sessions.",
        },
        {
          title: "2FA and OAuth2",
          icon: <HandshakeIcon weight="fill" size={32} />,
          description:
            "Implement Two-Factor Authentication (2FA) and OAuth2 (Google) to enhance the security of your applications.",
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
      curriculum={AUTHENTICATION_AND_AUTHORIZATION_CURRICULUM}
      courseTitle="Authentication and Authorization Extension"
      coursePrice="$79.99"
      courseDiscountedPrice="$105"
      purchaseUrl="https://learn.nestjs.com/purchase?product_id=5676929"
    />
  );
}
