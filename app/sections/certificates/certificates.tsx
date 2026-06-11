import { useState } from "react";
import AnimatedArrow from "../../components/animations/animated-arrow/animated-arrow";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";

// Linkedin posts to embed
const CERTIFICATES = [
  { id: "7447190331055493120", ugcPost: true },
  { id: "7452727863188799488", ugcPost: true },
  { id: "7439727817359126528", ugcPost: false },
  { id: "7340936239149117440", ugcPost: false },
  { id: "7340706183080505344", ugcPost: false },
  { id: "7410378907469643776", ugcPost: false },
  { id: "7412859515353587712", ugcPost: false },
  { id: "7377707234614464512", ugcPost: false },
  { id: "7418032027880329216", ugcPost: true },
  { id: "7367925902321651714", ugcPost: false },
];

export function CertificatesSection() {
  const randomInitialIndex = Math.floor(Math.random() * CERTIFICATES.length);
  const [activeCertificate, setActiveCertificate] = useState<number | null>(
    randomInitialIndex,
  );
  return (
    <div
      className="container relative flex mx-auto md:flex-row flex-col items-center md:mt-60 mt-24 px-4 md:px-0"
      id="certificated"
    >
      <div className="grid md:grid-cols-[55%_10%_35%] grid-rows-[auto] gap-0 place-items-top">
        <div className="mt-12">
          <SectionSubheading>Certified Developers</SectionSubheading>
          <ScrollReveal
            ElementTag="h2"
            className="font-medium sm:text-6xl text-[2.3rem] leading-[1.1]"
            enableBlur
          >
            Share your certification with the world
          </ScrollReveal>
          <ScrollReveal
            className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
            ElementTag="p"
            enableBlur
          >
            Upon completing the course, you will receive an official certificate
            of completion that you can proudly share on your LinkedIn profile,
            resume, or personal website. Showcase your new skills and boost your
            career prospects with a NestJS certification.
          </ScrollReveal>
        </div>
        <span />
        <div className="w-full md:mt-0 mt-12">
          <iframe
            src={`https://www.linkedin.com/embed/feed/update/urn:li:${CERTIFICATES[activeCertificate ?? 0].ugcPost ? "ugcPost" : "share"}:${CERTIFICATES[activeCertificate ?? 0].id}?collapsed=1`}
            className="w-full rounded-lg h-[600px] overflow-y-scroll"
            allowFullScreen
          ></iframe>
          <div className="flex w-full justify-center mt-6">
            <span
              onClick={() => {
                setActiveCertificate((prev) =>
                  prev === null
                    ? 0
                    : (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length,
                );
              }}
              className="p-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer mr-2"
            >
              <AnimatedArrow
                width={40}
                reverse
                onClick={() => {
                  setActiveCertificate((prev) =>
                    prev === null
                      ? 0
                      : (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length,
                  );
                }}
                delay={0}
              />
            </span>
            <span className="text-sm font-mono text-xs flex items-center pb-1 opacity-50">
              {activeCertificate !== null
                ? `${activeCertificate + 1} / ${CERTIFICATES.length}`
                : "No certificates available"}
            </span>
            <span
              onClick={() => {
                setActiveCertificate((prev) =>
                  prev === null ? 0 : (prev + 1) % CERTIFICATES.length,
                );
              }}
              className="p-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <AnimatedArrow width={40} delay={0} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
