import { BlurIn } from "../../components/animations/blur-in/blur-in";
import { LettersReveal } from "../../components/animations/letters-reveal/letters-reveal";
import Particles from "../../components/backgrounds/particles/particles";
import { ServiceCard } from "../../components/domain/service-card/service-card";
import StackedCards from "../../components/misc/stacked-cards/stacked-cards";

export function ProductsSection() {
  return (
    <>
      <LettersReveal
        ElementTag="h4"
        subComponent={
          <div className="relative centered text-center flex items-center flex-col">
            <h4 className="text-sm font-mono opacity-80 max-w-2xl leading-8 font-light p-10">
              Explore our tools built to supercharge your Nest workflow.
              Discover solutions we created to streamline development, automate
              tasks, and help you ship faster with greater confidence.
            </h4>
          </div>
        }
      >
        <div className="absolute inset-0 top-0 left-0 right-0 bottom-0 pointer-events-none">
          <Particles alphaParticles speed={0.05} />
        </div>
        <section className="px-20">
          <BlurIn distance={10} duration={2} ease="elastic.out(1, 0.5)">
            <h4 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-[4rem] sm:leading-[1.15] text-4xl leading-[1.15] font-medium text-center flex">
              When&nbsp;there's&nbsp;no&nbsp;yarn
            </h4>
          </BlurIn>
          <BlurIn
            distance={10}
            duration={2}
            delay={0.2}
            ease="elastic.out(1, 0.5)"
          >
            <h4 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-[4rem] sm:leading-[1.15] text-4xl leading-[1.15] font-medium text-center flex">
              we&nbsp;build&nbsp;our&nbsp;own&nbsp;toys
            </h4>
          </BlurIn>
        </section>
      </LettersReveal>
      <StackedCards
        cards={[
          <ServiceCard
            title="Deploy, mau!"
            description="Provision and manage your infrastracture on AWS without the hassle and extra DevOps work."
            screenshots={[
              "/screenshots/mau_1.png",
              "/screenshots/mau_3.png",
              "/screenshots/mau_2.png",
            ]}
            onClick={() => {
              window.open("https://mau.nestjs.com/", "_blank");
            }}
            colors={["#111111", "#202020", "#111"]}
            itemsBackground="radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)"
            cardItems={[
              {
                title: "One-click deployment",
                description:
                  "Deploy your Nest application to AWS with a single command and let us handle the rest.",
              },
              {
                title: "Stream your logs",
                description:
                  "Get real-time visibility into log data, detect anomalies immediately, and respond swiftly.",
              },
              {
                title: "Track your metrics",
                description:
                  "Monitor key performance indicators to ensure optimal application performance.",
              },
            ]}
          />,
          <ServiceCard
            title="Devtools"
            description="Enhance your development workflow with powerful tools designed to streamline your Nest application development."
            screenshots={[
              "/screenshots/devtools_1.png",
              "/screenshots/devtools_2.png",
              "/screenshots/devtools_3.png",
            ]}
            onClick={() => {
              window.open("https://devtools.nestjs.com/", "_blank");
            }}
            itemsBackground="radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)"
            cardItems={[
              {
                title: "Explore your graph",
                description:
                  "Visualize your application's architecture and dependencies with an interactive graph.",
              },
              {
                title: "Code playground",
                description:
                  "Experiment with your code in a safe, sandboxed environment without affecting your main codebase.",
              },
              {
                title: "CI/CD integration",
                description:
                  "Seamlessly integrate with your CI/CD pipeline to detect issues early.",
              },
            ]}
          />,
        ]}
      />
    </>
  );
}
