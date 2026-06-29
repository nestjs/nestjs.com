import { ShoppingBagIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MENU_ITEMS } from "../../marketing-ui/common/menu";
import { PrimaryButton } from "../../marketing-ui/components/buttons/primary-button/primary-button";
import { TransparentButton } from "../../marketing-ui/components/buttons/transparent-button/transparent-button";
import { CourseVideoModal } from "../../marketing-ui/components/domain/course-curriculum/course-curriculum";
import { TiltedText } from "../../marketing-ui/components/domain/tilted-text/tilted-text";
import BarChartSection from "../../marketing-ui/sections/bar-chart/bar-chart-section";
import { CertificatesSection } from "../../marketing-ui/sections/certificates/certificates-section";
import CommunitySection from "../../marketing-ui/sections/community/community-section";
import FaqSection from "../../marketing-ui/sections/faq/faq-section";
import { Footer } from "../../marketing-ui/sections/footer/footer";
import {
  Header,
  type HeaderProps,
} from "../../marketing-ui/sections/header/header";
import { ProductsSection } from "../../marketing-ui/sections/products/products-section";
import { TestimonialsSection } from "../../marketing-ui/sections/testimonials/testimonials-section";
import {
  CourseOverviewSection,
  type CourseOverviewSectionProps,
} from "./course-overview-section";
import { ExtensionsSection } from "./extensions-sections";
import { FAQ_ITEMS } from "./faq";

type CourseExtensionPageProps = Omit<
  CourseOverviewSectionProps,
  "setSelectedVideoId"
> & {
  breadcrumb: string;
  headerSubheading: string;
} & Pick<HeaderProps, "fadeInColors">;

export function CourseExtensionPage(props: CourseExtensionPageProps) {
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
        breadcrumb={props.breadcrumb}
        heading={props.heading}
        subheading={props.headerSubheading}
        actions={
          <>
            <PrimaryButton
              href={props.purchaseUrl}
              className="mr-5"
              target="_blank"
            >
              <div className="flex items-center gap-2 mx-auto justify-center">
                <ShoppingBagIcon weight="fill" className="inline-block mr-2" />
                <span>Purchase course now</span>
              </div>
            </PrimaryButton>
            <TransparentButton href="/" target="_blank">
              Explore Fundamentals course
            </TransparentButton>
          </>
        }
        shrink={false}
        fadeInColors={props.fadeInColors}
      />
      <CourseOverviewSection
        {...props}
        setSelectedVideoId={setSelectedVideoId}
      />
      <div className="md:my-40 my-16" />
      <TiltedText
        heading="This extension is only a part of the Fundamentals course"
        content="Before purchasing this extension, we recommend you to check the Fundamentals course. It contains all the core concepts and best practices of NestJS, and this extension is designed to complement that knowledge."
        buttonText="Explore Fundamentals course"
        buttonLink="/courses"
        gradientColors={{
          from: "#a61c30",
          to: "#aa142b",
        }}
      />
      <ExtensionsSection heading="Check other extensions" />
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
