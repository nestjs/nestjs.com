import { siDiscord, siGithub, siX } from "simple-icons";
import BokehHeader from "../components/bokeh-header/bokeh-header";
import NoiseOverlay from "../components/bokeh-header/noise-overlay";
import type { Route } from "./+types/home";
import classes from "./home.module.scss";

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

export default function Home() {
  return (
    <div className="p-10">
      <header
        className="flex justify-center bg-gradient-to-r from-[#050303] 
            via-[#c21f3a] 
            to-[#050303] overflow-hidden relative rounded-[32px]"
      >
        <BokehHeader />
        <NoiseOverlay />
        <div className="container relative z-10">
          <div
            className={`${classes.navPanel} flex items-center p-5 bg-black/60 mt-8 rounded-[32px]`}
          >
            <div className="flex justify-start">
              <a href="https://nestjs.com">
                <img src="logo.svg" alt="NestJS Logo" className="h-10" />
              </a>
            </div>

            <nav
              className={`flex justify-center space-x-10 font-bold text-base flex-1`}
            >
              <a href="https://docs.nestjs.com">Docs</a>
              <a href="https://courses.nestjs.com">Official courses</a>
              <a href="#">Tools</a>
              <a href="https://enterprise.nestjs.com">Enterprise</a>
              <a href="https://jobs.nestjs.com">Jobs</a>
            </nav>

            <div className="flex justify-end space-x-5">
              <a
                href="https://github.com/nestjs/nest"
                target="_blank"
                className="icon m-l-30"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current color-text"
                >
                  <path d={siGithub.path} />
                </svg>
              </a>
              <a
                href="https://twitter.com/nestframework"
                target="_blank"
                className="icon"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 color-text fill-current"
                >
                  <path d={siX.path} />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/19078346"
                target="_blank"
                className="icon"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current color-text"
                >
                  <path d={siDiscord.path} />
                </svg>
              </a>
            </div>
          </div>
          <div className="centered text-center pt-30 pb-40 flex flex-col items-center">
            <h1 className="text-8xl font-medium max-w-4xl self-center">
              More than just a Node framework
            </h1>
            <p className="mt-4 text-sm font-normal font-mono opacity-80 max-w-2xl leading-[24px]">
              Nest - the world's fastest-growing Node framework for building
              efficient, reliable and scalable server-side applications.
            </p>
            <div className="mt-30">
              <a
                href="https://docs.nestjs.com/"
                className="btn bg-white rounded text-black font-bold pt-6 pb-6 pl-8 pr-8 rounded-[32px]"
              >
                Get started
              </a>
              <a
                href="https://github.com/nestjs/nest"
                className="btn bg-secondary text-white font-bold pt-6 pb-6 pl-8 pr-8 rounded-[32px]"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
