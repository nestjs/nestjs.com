import { useState } from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";
import LogoLoop from "../../components/misc/logo-loop/logo-loop";
import useMediaQuery from "../../hooks/use-media-query";

const LOGO_STYLE = {
  transition: "filter 0.3s ease-in-out",
  maxWidth: "100%",
  objectFit: "contain" as const,
};

const LOGOS = [
  {
    node: (
      <img
        src="/logos/ibm.png"
        alt="IBM"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "IBM",
    href: "https://www.ibm.com",
  },
  {
    node: (
      <img
        src="/logos/adidas.png"
        alt="Adidas"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "Adidas",
    href: "https://www.adidas.com",
  },
  {
    node: (
      <img
        src="/logos/sanofi.png"
        alt="Sanofi"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "Sanofi",
    href: "https://www.sanofi.com",
  },
  {
    node: (
      <img
        src="/logos/mercedes.png"
        alt="Mercedes"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "Mercedes-Benz",
    href: "https://www.mercedes-benz.com",
  },
  {
    node: (
      <img
        src="/logos/bmw.png"
        alt="BMW"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "BMW",
    href: "https://www.bmw.com",
  },
  {
    node: (
      <img
        src="/logos/capgemini.png"
        alt="Capgemini"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "Capgemini",
    href: "https://www.capgemini.com",
  },
  {
    node: (
      <img
        src="/logos/gitlab.png"
        alt="GitLab"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "GitLab",
    href: "https://www.gitlab.com",
  },
  {
    node: (
      <img
        src="/logos/decathlon.png"
        alt="Decathlon"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "Decathlon",
    href: "https://www.decathlon.com",
  },
  {
    node: (
      <img
        src="/logos/roche.png"
        alt="Roche"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "Roche",
    href: "https://www.roche.com",
  },
  {
    node: (
      <img
        src="/logos/societe.png"
        alt="Société Générale"
        style={LOGO_STYLE}
        className="lg:max-h-[80px] max-h-[60px]"
      />
    ),
    title: "Société Générale",
    href: "https://www.societegenerale.com",
  },
];

export function BrandsSection() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)"); // md breakpoint
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="container relative text-center">
      <SectionSubheading>Used by the world's finest brands</SectionSubheading>
      {isSmallScreen ? (
        <LogoLoop logos={LOGOS} speed={50} />
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 pt-20 xl:gap-x-40 md:gap-x-25 xl:gap-y-25 md:gap-y-20 p-5 place-items-center">
          {LOGOS.map((logo, index) => {
            const hideOnSmall =
              index >= LOGOS.length - 2 ? "hidden lg:flex" : "flex";
            return (
              <BlurIn key={logo.title} delay={0.1 + index * 0.1} duration={0.8}>
                <a
                  key={logo.title}
                  href={logo.href}
                  target="_blank"
                  className={hideOnSmall + " justify-center"}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    filter:
                      hoveredIndex === null
                        ? "none"
                        : hoveredIndex === index
                          ? "none"
                          : "blur(4px) opacity(0.45)",
                    transition: "filter 0.3s ease-in-out",
                  }}
                >
                  {logo.node}
                </a>
              </BlurIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
