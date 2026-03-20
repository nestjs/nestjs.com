import { useEffect, useState } from "react";
import { BlurIn } from "../components/blur-in/blur-in";
import { PrimaryButton } from "../components/primary-button/primary-button";
import ScrollReveal from "../components/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../components/section-subheading/section-subheading";
import useMediaQuery from "../hooks/use-media-query";
import {
  fetchBronzeSponsors,
  fetchSilverSponsors,
  type Backer,
} from "../services/sponsors.service";

const CELL_COMMON_CLASSES =
  "w-full h-full flex items-center justify-center grayscale hover:grayscale-0";

function SponsorCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <BlurIn duration={0.5} ease="power2.out">
      <div
        className={`cell xl:w-[160px] xl:h-[160px] aspect-square w-full border border-[#1e1d1d] flex items-center ${className}`}
      >
        {children}
      </div>
    </BlurIn>
  );
}

export function SponsorsSection() {
  const isLg = useMediaQuery("(max-width: 1024px)");
  const isMd = useMediaQuery("(max-width: 768px)");
  const isSm = useMediaQuery("(max-width: 640px)");
  const [bronzeSponsors, setBronzeSponsors] = useState<Backer[]>([]);
  const [silverSponsors, setSilverSponsors] = useState<Backer[]>([]);

  useEffect(() => {
    fetchBronzeSponsors()
      .then(setBronzeSponsors)
      .catch((err) => {
        // Just don't show backers section if fetching fails, to avoid breaking the page
      });
    fetchSilverSponsors()
      .then(setSilverSponsors)
      .catch((err) => {
        // Just don't show backers section if fetching fails, to avoid breaking the page
      });
  }, []);

  let backersGrid = 12;
  switch (true) {
    case isSm:
      backersGrid = 4;
      break;
    case isMd:
      backersGrid = 6;
      break;
    case isLg:
      backersGrid = 8;
      break;
  }

  return (
    <div className="px-8">
      <div className="container relative flex mx-auto md:flex-row flex-col items-center">
        <div className="max-w-[800px]">
          <SectionSubheading>Support</SectionSubheading>
          <ScrollReveal
            ElementTag="h2"
            className="font-medium lg:text-8xl md:text-7xl sm:text-6xl text-[2.75rem] md:leading-25 sm:leading-[1] leading-[1.1]"
            enableBlur
          >
            Let's build Nest together
          </ScrollReveal>
          <ScrollReveal
            className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
            ElementTag="p"
            enableBlur
          >
            Support the ongoing development of Nest and help keep the framework
            your product relies on actively maintained, evolving, and giving
            back to the entire community.
          </ScrollReveal>
        </div>
        <div className="w-[300px] justify-end flex flex-col items-center ml-auto">
          <BlurIn>
            <PrimaryButton href="https://docs.nestjs.com/" className="mt-10">
              Become a sponsor
            </PrimaryButton>
          </BlurIn>
        </div>
      </div>
      <div className="container relative flex md:mt-40 mt-16 mx-auto flex-col">
        <div className="flex flex-col md:flex-row di items-center lg:justify-between w-full">
          <div className="self-start xl:px-0 pr-8 md:w-[200px] w-full shrink-0">
            <SectionSubheading typingSpeed={100}>1</SectionSubheading>
            <ScrollReveal
              ElementTag="h5"
              className="font-medium text-2xl mb-8 xl:leading-5 xl:w-auto"
              enableBlur
            >
              Principal Sponsor
            </ScrollReveal>
          </div>
          <div className="grid xl:grid-cols-6 gap-0 lg:grid-cols-5 md:grid-cols-4 grid-cols-2">
            <SponsorCell>
              <a href="https://www.trilon.io" className={CELL_COMMON_CLASSES}>
                <img
                  src="/sponsors/principal/trilon.svg"
                  alt="Trilon"
                  className="w-full h-full object-contain md:p-4 p-10 brightness-100"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="md:ml-[-1px]">
              <a href="https://www.mojam.com" className={CELL_COMMON_CLASSES}>
                <img
                  src="/sponsors/principal/mojam.png"
                  alt="Mojam"
                  className="w-full h-full object-contain md:p-7 p-12 brightness-100 md:max-h-[100px] max-h-[160px]"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="md:ml-[-2px]">
              <a
                href="https://www.microsoft.com"
                className={CELL_COMMON_CLASSES}
              >
                <img
                  src="/sponsors/principal/microsoft.svg"
                  alt="Microsoft"
                  className="w-full h-full object-contain md:p-7 p-12 brightness-100"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="md:ml-[-3px]">
              <a
                href="https://serpapi.com?utm_source=nestjs&utm_medium=referral&utm_campaign=sponsor"
                className={`${CELL_COMMON_CLASSES} brightness-10000 hover:brightness-100`}
              >
                <img
                  src="/sponsors/principal/serpapi.png"
                  alt="SerpApi"
                  className="w-full h-full object-contain md:p-7 p-12"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="lg:ml-[-4px] lg:mt-[0px] md:ml-[0px] md:mt-[-1px]">
              <a
                href="https://www.valor-software.com"
                className={CELL_COMMON_CLASSES}
              >
                <img
                  src="/sponsors/principal/valor.svg"
                  alt="Valor Software"
                  className="w-full h-full object-contain md:p-8 p-12"
                />
              </a>
            </SponsorCell>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center lg:justify-between w-full mt-20">
          <div className="self-start xl:px-0 pr-8 md:w-[200px] w-full shrink-0">
            <SectionSubheading typingSpeed={100}>2</SectionSubheading>
            <ScrollReveal
              ElementTag="h5"
              className="font-medium text-2xl mb-8 xl:leading-5"
              enableBlur
            >
              Gold Sponsor
            </ScrollReveal>
          </div>
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-0">
            <SponsorCell>
              <a
                href="https://www.mercedes.com"
                className={CELL_COMMON_CLASSES}
              >
                <img
                  src="/sponsors/gold/mercedes.png"
                  alt="Mercedes-Benz.io"
                  className="w-full h-full object-contain p-7 brightness-100 max-h-[95px]"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="ml-[-1px]">
              <a href="https://www.sanofi.com" className={CELL_COMMON_CLASSES}>
                <img
                  src="/sponsors/gold/sanofi.png"
                  alt="Sanofi"
                  className="w-full h-full object-contain p-7 brightness-100 max-h-[80px]"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="ml-[-2px]">
              <a
                href="https://www.movavi.com"
                className={`${CELL_COMMON_CLASSES} brightness-10000 hover:brightness-100`}
              >
                <img
                  src="/sponsors/gold/movavi.svg"
                  alt="Movavi"
                  className="w-full h-full object-contain p-7 brightness-100 max-h-[80px]"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="ml-[-3px]">
              <a
                href="https://www.jetbrains.com"
                className={`${CELL_COMMON_CLASSES}`}
              >
                <img
                  src="/sponsors/gold/jetbrains.svg"
                  alt="JetBrains"
                  className="w-full h-full object-contain p-7 brightness-100 max-h-[90px]"
                />
              </a>
            </SponsorCell>
            <SponsorCell className="lg:ml-[-4px] lg:mt-[0px] ml-[0px] mt-[-1px]">
              <a
                href="https://www.snyk.io"
                className={`${CELL_COMMON_CLASSES}`}
              >
                <img
                  src="/sponsors/gold/snyk.png"
                  alt="Snyk"
                  className="w-full h-full object-contain p-7 brightness-100 max-h-[90px]"
                />
              </a>
            </SponsorCell>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:items-center lg:justify-between w-full mt-20">
          <div className="self-start md:w-[200px] w-full shrink-0">
            <SectionSubheading typingSpeed={100}>3</SectionSubheading>
            <ScrollReveal
              ElementTag="h5"
              className="font-medium text-2xl mb-8 xl:leading-5 xl:w-auto"
              enableBlur
            >
              Silver Sponsor
            </ScrollReveal>
          </div>
          <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-0">
            {silverSponsors.map((sponsor, index) => (
              <BlurIn key={sponsor.MemberId} duration={0.5} ease="power2.out">
                <div
                  className={`cell lg:w-[160px] lg:h-[160px] aspect-square w-full border border-[#1e1d1d] flex items-center ${index > 0 ? `ml-[-${index}px]` : ""}`}
                >
                  <a
                    href={sponsor.website || "#"}
                    className="brightness-100 grayscale hover:grayscale-0 w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="w-full h-full object-contain p-5 max-h-[100px]"
                    />
                  </a>
                </div>
              </BlurIn>
            ))}
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:items-center lg:justify-between w-full mt-20">
          <div className="self-start md:w-[200px] w-full shrink-0">
            <SectionSubheading typingSpeed={100}>4</SectionSubheading>
            <ScrollReveal
              ElementTag="h5"
              className="font-medium text-2xl mb-8 xl:leading-5"
              enableBlur
            >
              Backer
            </ScrollReveal>
          </div>
          <div
            className={`grid gap-0`}
            style={{
              gridTemplateColumns: `repeat(${backersGrid}, minmax(0, 1fr))`,
            }}
          >
            {bronzeSponsors.map((sponsor, index) => (
              <BlurIn key={sponsor.MemberId} duration={0.5} ease="power2.out">
                <div
                  className={`cell lg:w-[80px] xl:h-[80px] aspect-square w-full border border-[#1e1d1d] flex items-center
                      ${index % backersGrid === 0 ? `border-l-1` : "border-l-0"} ${index < backersGrid ? `border-t-1` : "border-t-0"}`}
                >
                  <a
                    href={sponsor.website || "#"}
                    className="brightness-100 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="w-full h-full object-contain p-5"
                    />
                  </a>
                </div>
              </BlurIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
