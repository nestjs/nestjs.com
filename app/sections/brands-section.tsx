import { useState } from "react";
import { BlurIn } from "../components/blur-in/blur-in";
import { SectionSubheading } from "../components/section-subheading/section-subheading";

const LOGO_STYLE = {
  transition: "filter 0.3s ease-in-out",
  maxWidth: "100%",
  maxHeight: "80px",
  objectFit: "contain" as const,
};

const LOGOS = [
  {
    node: <img src="/logos/ibm.png" alt="IBM" style={LOGO_STYLE} />,
    title: "IBM",
    href: "https://www.ibm.com",
  },
  {
    node: <img src="/logos/adidas.png" alt="Adidas" style={LOGO_STYLE} />,
    title: "Adidas",
    href: "https://www.adidas.com",
  },
  {
    node: <img src="/logos/sanofi.png" alt="Sanofi" style={LOGO_STYLE} />,
    title: "Sanofi",
    href: "https://www.sanofi.com",
  },
  {
    node: <img src="/logos/mercedes.png" alt="Mercedes" style={LOGO_STYLE} />,
    title: "Mercedes-Benz",
    href: "https://www.mercedes-benz.com",
  },
  {
    node: <img src="/logos/bmw.png" alt="BMW" style={LOGO_STYLE} height={70} />,
    title: "BMW",
    href: "https://www.bmw.com",
  },
  {
    node: <img src="/logos/capgemini.png" alt="Capgemini" style={LOGO_STYLE} />,
    title: "Capgemini",
    href: "https://www.capgemini.com",
  },
  {
    node: <img src="/logos/gitlab.png" alt="GitLab" style={LOGO_STYLE} />,
    title: "GitLab",
    href: "https://www.gitlab.com",
  },
  {
    node: <img src="/logos/decathlon.png" alt="Decathlon" style={LOGO_STYLE} />,
    title: "Decathlon",
    href: "https://www.decathlon.com",
  },
  {
    node: <img src="/logos/roche.png" alt="Roche" style={LOGO_STYLE} />,
    title: "Roche",
    href: "https://www.roche.com",
  },
  {
    node: (
      <img src="/logos/societe.png" alt="Société Générale" style={LOGO_STYLE} />
    ),
    title: "Société Générale",
    href: "https://www.societegenerale.com",
  },
];

export function BrandsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="container relative text-center">
      <BlurIn duration={0.5}>
        <SectionSubheading>Used by the world's finest brands</SectionSubheading>
      </BlurIn>
      <div className="grid grid-cols-5 pt-20 gap-x-40 gap-y-20 p-5 place-items-center">
        {LOGOS.map((logo, index) => (
          <BlurIn key={logo.title} delay={0.1 + index * 0.1} duration={0.8}>
            <a
              key={logo.title}
              href={logo.href}
              target="_blank"
              className="flex justify-center"
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
        ))}
      </div>
    </div>
  );
}
