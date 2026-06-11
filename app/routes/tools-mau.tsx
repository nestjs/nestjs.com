import {
  ChatsIcon as Chats,
  ClockClockwiseIcon as ClockClockwise,
  CloudIcon as Cloud,
  DatabaseIcon as Database,
  GraphIcon,
  HardDriveIcon as HardDrive,
  NotebookIcon as Notebook,
  PulseIcon as Pulse,
  RocketIcon as Rocket,
  ScalesIcon,
  SquaresFourIcon as SquaresFour,
  TerminalWindowIcon,
  UsersThreeIcon as UsersThree,
} from "@phosphor-icons/react";
import AWSIcon from "../assets/icons/aws.svg";
import CLIIcon from "../assets/icons/cli.svg";
import NestIcon from "../assets/icons/nest.svg";
import Box1 from "../assets/mau-cards/box-1.png";
import Box2 from "../assets/mau-cards/box-2.png";
import Box3 from "../assets/mau-cards/box-3.png";
import MauCard1 from "../assets/mau-cards/card-1.png";
import MauCard2 from "../assets/mau-cards/card-2.png";
import MauCard3 from "../assets/mau-cards/card-3.png";
import MauBackground from "../assets/mau-cards/card-bg.png";
import MauIllustration1 from "../assets/mau-cards/illustration-1.png";
import MauIllustration2 from "../assets/mau-cards/illustration-2.png";
import MauIllustration3 from "../assets/mau-cards/illustration-3.png";
import HeaderBlock1 from "../assets/mau-header/header-block-1.png";
import HeaderBlock2 from "../assets/mau-header/header-block-2.png";
import MauMockup from "../assets/mau-mockup.png";
import { MENU_ITEMS } from "../marketing-ui/common/menu";
import AnimatedContent from "../marketing-ui/components/animations/animated-content/animated-content";
import { BlurIn } from "../marketing-ui/components/animations/blur-in/blur-in";
import ScrollReveal from "../marketing-ui/components/animations/scroll-reveal/scroll-reveal";
import Particles from "../marketing-ui/components/backgrounds/particles/particles";
import { PrimaryButton } from "../marketing-ui/components/buttons/primary-button/primary-button";
import { FeatureSection } from "../marketing-ui/components/domain/feature-section/feature-section";
import {
  PricingCards,
  type Plan,
} from "../marketing-ui/components/domain/pricing-cards/pricing-cards";
import { SectionSubheading } from "../marketing-ui/components/domain/section-subheading/section-subheading";
import { TiltedText } from "../marketing-ui/components/domain/tilted-text/tilted-text";
import { BrandsSection } from "../marketing-ui/sections/brands/brands-section";
import { CoursesSection } from "../marketing-ui/sections/courses/courses-section";
import { EnterpriseSection } from "../marketing-ui/sections/enterprise/enterprise-section";
import FaqSection, {
  type FaqItem,
} from "../marketing-ui/sections/faq/faq-section";
import { Footer } from "../marketing-ui/sections/footer/footer";
import { Header } from "../marketing-ui/sections/header/header";
import { TestimonialsSection } from "../marketing-ui/sections/testimonials/testimonials-section";
import type { Route } from "./+types/home";

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

const PRICING_PLANS: Plan[] = [
  {
    type: "developer",
    name: "Developer",
    shortDescription: "For individuals and indie hackers",

    price: "7",
    symbol: "$",
    currency: "USD",
    bullets: [
      {
        text: "One application",
      },
      {
        text: "100 deployments/day",
      },
      {
        text: "One database",
      },
      {
        text: "Unlimited brokers",
      },
      {
        text: "Unlimited tasks",
      },
      {
        text: "Unlimited lambdas",
      },
      {
        text: "CLI integration",
      },
      {
        text: "Database backups",
        available: false,
      },
      {
        text: "Collaboration (share projects)",
        available: false,
      },
      {
        text: "Metrics monitoring",
        available: false,
      },
    ],
    trial: true,
  },
  {
    type: "team",
    name: "Professional",
    shortDescription: "For scalable commercial projects",
    price: "20",
    symbol: "$",
    currency: "USD",
    bullets: [
      {
        text: "One project",
      },
      {
        text: "Unlimited applications",
      },
      {
        text: "Unlimited deployments",
      },
      {
        text: "Unlimited databases",
      },
      {
        text: "Unlimited brokers",
      },
      {
        text: "Unlimited tasks",
      },
      {
        text: "Unlimited lambdas",
      },
      {
        text: "CLI integration",
      },
      {
        text: "Database backups",
      },
      {
        text: "Collaboration (share projects)",
        available: false,
      },
      {
        text: "Metrics monitoring",
        available: false,
      },
    ],
  },
  {
    type: "enterprise",
    name: "Business",
    shortDescription: "For companies and teams",
    price: "30",
    symbol: "$",
    currency: "USD",
    bullets: [
      {
        text: "Unlimited projects",
      },
      {
        text: "Unlimited applications",
      },
      {
        text: "Unlimited deployments",
      },
      {
        text: "Unlimited databases",
      },
      {
        text: "Unlimited brokers",
      },
      {
        text: "Unlimited tasks",
      },
      {
        text: "Unlimited lambdas",
      },
      {
        text: "CLI integration",
      },
      {
        text: "Database backups",
      },
      {
        text: "Collaboration (share projects)",
      },
      { text: "Metrics monitoring" },
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Where is my infrastructure hosted?",
    answer:
      "All services, databases, brokers etc. are hosted in the cloud on Amazon Web Services (AWS). We use AWS because of its reliability, security, and scalability.",
  },
  {
    question: "What happens to my application if I cancel my subscription?",
    answer:
      "If you decide to cancel your subscription, your application will continue to be available and operational. Nevertheless, you won't have access to the dashboard for making changes through Nest Mau; you'll need to handle it manually via the AWS UI.",
  },
  {
    question: "What are my payment options?",
    answer:
      "Our online checkout accepts all major Credit Cards and Google Pay. Checkout is a fully secure 128-bit SSL encrypted payment system through Stripe.",
  },
  {
    question:
      "Does price include the cost of AWS services (e.g. EC2, RDS, etc.)?",
    answer:
      "No, the cost you incur is solely for Nest Mau's services. AWS will bill you separately for the usage of their services.",
  },
  {
    question: "Can I use Mau to deploy my existing Nest application?",
    answer:
      "Absolutely! With Mau, you can deploy any Nest application on AWS. Just follow the instructions provided in the dashboard.",
  },
  {
    question:
      "Why should I use Mau instead of deploying my application manually?",
    answer:
      "Mau streamlines the deployment of your Nest application on AWS, sparing you from delving into the complexities of AWS-specific concepts and patterns. The AWS UI is designed to support various systems and use cases, making it somewhat challenging for less experienced users. That's where Mau comes in.",
  },
];

export default function Mau() {
  return (
    <>
      <Header
        menuItems={MENU_ITEMS}
        breadcrumb="tools / mau"
        heading="Deploy, mau!"
        subheading="Provision and manage your infrastructure on AWS without the hassle and extra DevOps work or additional operational complexity overhead."
        bottomPanel={
          <div className="pt-12 relative flex max-w-[90%] mx-auto h-full">
            <BlurIn
              delay={0.2}
              duration={0.5}
              ease="power2.out"
              className="relative z-2 sm:mt-0 mt-auto"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
              }}
            >
              <BlurIn
                className="absolute left-[20px] top-1/2 max-w-[12%] w-[200px] z-100"
                delay={0.1}
              >
                <img src={HeaderBlock1} className="pointer-events-none" />
              </BlurIn>
              <BlurIn
                className="absolute right-[20px] top-[15%] max-w-[12%] w-[200px] z-100"
                delay={0.3}
              >
                <img src={HeaderBlock2} className="pointer-events-none" />
              </BlurIn>
              <div
                className="p-4 pb-0 max-w-[90%] relative mx-auto mt-10 z-2
                border border-1 border-[rgba(255,255,255,0.1)] rounded-tl-[20px] rounded-tr-[20px]
                after:absolute after:inset-0 after:border after:border-[rgba(255,255,255,0.1)] after:rounded-tl-[24px] after:rounded-tr-[24px] after:top-[-8px] after:left-[-8px] after:right-[-8px] after:bottom-[-8px] after:z-0
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/15 before:to-white/5 before:pointer-events-none before:top-[-8px] before:left-[-8px] before:right-[-8px] before:bottom-[-8px] before:rounded-tl-[24px] before:rounded-tr-[24px] before:z-0"
              >
                <div className="absolute inset-0 rounded-tl-[20px] rounded-tr-[20px] bg-gradient-to-t from-white/15 to-white/5 top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] z-0"></div>
                <img
                  src={"/screenshots/mau_2.png"}
                  className="rounded-tl-[12px] rounded-tr-[12px] z-2 relative"
                />
              </div>
            </BlurIn>
          </div>
        }
        actions={
          <PrimaryButton
            href="https://docs.nestjs.com/"
            className="mr-5"
            target="_blank"
          >
            Start free trial
          </PrimaryButton>
        }
        shrink={false}
      />
      <div className="flex justify-center md:mt-20 mt-8 mb-0">
        <BrandsSection />
      </div>
      <div className="relative px-4 sm:block hidden">
        <div className="absolute inset-0 top-0 left-0 right-0 bottom-0 pointer-events-none">
          <Particles alphaParticles speed={0.05} />
        </div>
        <img src={MauMockup} className="w-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-40% via-[#050303] to-[#050303] h-[60%] top-auto"></div>
        <div className="absolute inset-0 z-10 left-0 right-0 bottom-[20%] top-auto text-center">
          <ScrollReveal
            ElementTag="h2"
            className="font-medium xl:text-7xl lg:text-6xl text-4xl text-center leading-[1.1] md:px-0 px-4"
            enableBlur
          >
            Zero hassle, effortless deployment
          </ScrollReveal>
          <ScrollReveal
            className="font-mono text-sm opacity-70 leading-6 font-light lg:pt-10 pt-4 max-w-2xl mx-auto text-center md:px-0 px-4"
            ElementTag="p"
            enableBlur
          >
            Say goodbye to complex configurations and DevOps overhead. With Mau,
            you can deploy your Nest applications to AWS in just a few clicks,
            allowing you to focus on building and scaling your projects with
            ease.
          </ScrollReveal>
        </div>
      </div>
      <div className="flex justify-center flex-col px-5 pb-20 sm:pt-0 pt-20">
        <div className="relative container mx-auto">
          <div className="grid md:grid-cols-[60%_10%_30%] sm:grid-cols-[60%_5%_35%] grid-rows-[auto] gap-0">
            <div>
              <SectionSubheading>Infrastructure simplified</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
                enableBlur
              >
                Deploy your applications in seconds
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-90 leading-6 font-light sm:pt-10 pt-4"
              ElementTag="p"
              enableBlur
            >
              Eliminate the burden of handling your infrastructure and instead
              concentrate on what truly counts most: growing and scaling your
              business.
            </ScrollReveal>
          </div>
        </div>
        <div className="relative lg:container mx-auto md:mt-30 mt-15 md:mb-15 w-full">
          <div className="rounded-[32px] border border-white/8 bg-[#191717] w-full p-2 relative">
            <div className="flex md:flex-row flex-col items-center justify-between gap-2">
              <div className="flex items-center lg:h-[550px] md:h-[800px] h-[500px] md:flex-1 flex-auto w-full relative rounded-[24px] overflow-hidden border-white/12 border">
                <BlurIn delay={0.1} className="absolute inset-0">
                  <div
                    style={{ backgroundImage: `url(${MauBackground})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center xl:block hidden"
                  />
                  <img
                    src={MauIllustration1}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full pointer-events-none xl:block hidden"
                  />
                  <div
                    style={{ backgroundImage: `url(${MauCard1})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center xl:hidden block"
                  />
                </BlurIn>
                <div className="absolute inset-0 bottom-0 left-0 right-0 pointer-events-none lg:p-10 p-6 top-auto lg:h-auto sm:h-[40%]">
                  <AnimatedContent delay={0.2} distance={10} duration={0.8}>
                    <h4 className="xl:text-3xl text-2xl">Track key metrics</h4>
                  </AnimatedContent>
                  <AnimatedContent delay={0.4} distance={15} duration={0.8}>
                    <p className="mt-4 lg:text-[14px] md:text-xs text-sm opacity-70 font-mono font-thin leading-6">
                      Monitor your application's health and performance with
                      real-time metrics ensuring optimal performance and
                      reliability.
                    </p>
                  </AnimatedContent>
                </div>
              </div>
              <div className="flex items-center lg:h-[550px] md:h-[800px] h-[500px] md:flex-1 flex-auto w-full relative rounded-[24px] overflow-hidden border-white/12 border">
                <BlurIn delay={0.3} className="absolute inset-0">
                  <div
                    style={{ backgroundImage: `url(${MauBackground})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center
                    xl:block hidden"
                  />
                  <img
                    src={MauIllustration2}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full pointer-events-none xl:block hidden"
                  />
                  <div
                    style={{ backgroundImage: `url(${MauCard2})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center
                    xl:hidden block"
                  />
                </BlurIn>
                <div className="absolute inset-0 bottom-0 left-0 right-0 pointer-events-none lg:p-10 p-6 top-auto lg:h-auto sm:h-[40%]">
                  <AnimatedContent delay={0.2} distance={10} duration={0.8}>
                    <h4 className="xl:text-3xl text-2xl">Stream your logs</h4>
                  </AnimatedContent>
                  <AnimatedContent delay={0.4} distance={15} duration={0.8}>
                    <p className="mt-4 lg:text-[14px] md:text-xs text-sm opacity-70 font-mono font-thin leading-6">
                      Get real-time visibility into log data, detect anomalies
                      immediately, and respond swiftly.
                    </p>
                  </AnimatedContent>
                </div>
              </div>
              <div className="flex items-center lg:h-[550px] md:h-[800px] h-[500px] md:flex-1 flex-auto w-full relative rounded-[24px] overflow-hidden border-white/12 border">
                <BlurIn delay={0.3} className="absolute inset-0">
                  <div
                    style={{ backgroundImage: `url(${MauBackground})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center xl:block hidden"
                  />
                  <img
                    src={MauIllustration3}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full pointer-events-none xl:block hidden"
                  />
                  <div
                    style={{ backgroundImage: `url(${MauCard3})` }}
                    className="absolute top-0 left-0 bottom-0 right-0 w-full bg-cover lg:bg-position-[center_left] sm:bg-center xl:hidden block"
                  />
                </BlurIn>
                <div className="absolute inset-0 bottom-0 left-0 right-0 pointer-events-none lg:p-10 p-6 top-auto lg:h-auto sm:h-[40%]">
                  <AnimatedContent delay={0.2} distance={10} duration={0.8}>
                    <h4 className="xl:text-3xl text-2xl">Traffic insights</h4>
                  </AnimatedContent>
                  <AnimatedContent delay={0.4} distance={15} duration={0.8}>
                    <p className="mt-4 lg:text-[14px] md:text-xs text-sm opacity-70 font-mono font-thin leading-6">
                      Explore historical traffic data, assess response times,
                      and evaluate failure trends for informed decision-making.
                    </p>
                  </AnimatedContent>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 grid md:grid-cols-4 md:grid-rows-1 grid-cols-2 grid-rows-2 md:gap-y-16 md:gap-x-16 gap-y-16 gap-x-4 mx-auto">
            <AnimatedContent distance={20} delay={0.1} duration={0.8}>
              <div className="flex items-center gap-2">
                <ScalesIcon size="18px" weight="fill" />
                <h6 className="text-lg">Scale on demand</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                Automatically scale your applications based on traffic and
                resource needs.
              </p>
            </AnimatedContent>
            <AnimatedContent distance={20} delay={0.2} duration={0.8}>
              <div className="flex items-center gap-2">
                <Rocket size="18px" weight="fill" />
                <h6 className="text-lg">One-click deployment</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                Deploy your Nest application to AWS with a single command, or
                use our intuitive dashboard.
              </p>
            </AnimatedContent>
            <AnimatedContent distance={20} delay={0.3} duration={0.8}>
              <div className="flex items-center gap-2">
                <GraphIcon size="18px" weight="fill" />
                <h6 className="text-lg">Load balancing</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                Distribute incoming traffic across multiple servers to ensure
                high availability and reliability.
              </p>
            </AnimatedContent>
            <AnimatedContent distance={20} delay={0.4} duration={0.8}>
              <div className="flex items-center gap-2">
                <TerminalWindowIcon size="18px" weight="fill" />
                <h6 className="text-lg">CLI</h6>
              </div>
              <p className="text-sm opacity-50 font-normal leading-6 mt-2">
                One command is all it takes to deploy your Nest application to
                AWS.
              </p>
            </AnimatedContent>
          </div>
        </div>
      </div>
      <FeatureSection
        subheading="Scale and grow"
        title="Focus on building your product"
        image={Box1}
        items={[
          {
            icon: AWSIcon,
            title: "AWS",
            description:
              "Deploy your infrastructure on AWS with a few clicks. No DevOps knowledge required.",
          },
          {
            icon: NestIcon,
            title: "Nest integrated",
            description:
              "Mau is built by the creator of NestJS, and makes provisioning your applications a breeze.",
          },
          {
            icon: CLIIcon,
            title: "CLI",
            description:
              "Deploy your applications with ease using our dedicated command line interface.",
          },
          {
            icon: <UsersThree size="28px" weight="fill" className="shrink-0" />,
            title: "Collaboration",
            description:
              "Invite your team members to collaborate on infrastructure management and share access to resources.",
          },
        ]}
      />
      <FeatureSection
        className="md:mt-60"
        subheading="Stability and reliability"
        title="Server management made easy"
        image={Box2}
        reverse
        items={[
          {
            icon: <Cloud size="28px" weight="fill" className="shrink-0" />,
            title: "Web applications",
            description:
              "Trust Mau to handle the deployment and management of your NestJS applications.",
          },
          {
            icon: <Database size="28px" weight="fill" className="shrink-0" />,
            title: "Databases",
            description:
              "Whether it's PostgreSQL, MySQL, MongoDB, or Redis, Mau has got you covered.",
          },
          {
            icon: (
              <ClockClockwise size="28px" weight="fill" className="shrink-0" />
            ),
            title: "Task scheduling",
            description:
              "Easily schedule and manage your background tasks and cron jobs with Mau.",
          },
          {
            icon: (
              <SquaresFour size="28px" weight="fill" className="shrink-0" />
            ),
            title: "Microservices",
            description:
              "Deploy and manage your microservices architecture with our intuitive interface.",
          },
        ]}
      />
      <FeatureSection
        className="md:mt-60"
        subheading="Insights and visibility"
        title="Monitor and optimize"
        image={Box3}
        items={[
          {
            icon: <Notebook size="28px" weight="fill" className="shrink-0" />,
            title: "Real-time logs",
            description:
              "Logs are streamlined and conveniently accessible directly from the Mau dashboard.",
          },
          {
            icon: <Pulse size="28px" weight="fill" className="shrink-0" />,
            title: "Monitoring",
            description:
              "Keep an eye on your application's performance (CPU, memory, health) with real-time monitoring tools.",
          },
          {
            icon: <HardDrive size="28px" weight="fill" className="shrink-0" />,
            title: "Backups",
            description:
              "Automate your database backups with the Business plan and ensure your data is always safe and recoverable.",
          },
          {
            icon: <Chats size="28px" weight="fill" className="shrink-0" />,
            title: "Brokers",
            description:
              "Kafka, RabbitMQ, NATS - Mau supports a variety of message brokers to fit your application's needs.",
          },
        ]}
      />
      <PricingCards className="pt-12 pb-24" plans={PRICING_PLANS} />
      <TiltedText
        heading="Start a free trial today"
        content="Experience the full power of Mau with our free trial, and see how it can transform your development process and accelerate your projects."
        buttonText="Deploy your first app"
        buttonLink="/dashboard"
      />
      <FaqSection items={FAQ_ITEMS} />
      <EnterpriseSection className="lg:mt-30 mt-0" />
      <CoursesSection className="sm:pt-30 pt-0" />
      <TestimonialsSection />
      <Footer className="mt-20" />
    </>
  );
}
