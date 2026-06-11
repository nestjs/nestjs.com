import { useState } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";
import { BlurIn } from "./marketing-ui/components/animations/blur-in/blur-in";
import Aurora from "./marketing-ui/components/backgrounds/aurora-background/aurora-background";
import NoiseOverlay from "./marketing-ui/components/backgrounds/noise-overlay/noise-overlay";
import { PrimaryButton } from "./marketing-ui/components/buttons/primary-button/primary-button";
import { GsapRouteHandler } from "./marketing-ui/components/gsap-route-handler";
import LazyRender from "./marketing-ui/components/misc/lazy-render/lazy-render";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@200..800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-lt-installed="true"
      className="overflow-x-hidden w-full"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full overflow-x-clip">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <GsapRouteHandler>
      <Outlet />
    </GsapRouteHandler>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  const [auroraReady, setAuroraReady] = useState(false);

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div
      className={`flex justify-center overflow-hidden relative pb-16
          relative h-[100vh] overflow-hidden
          ${auroraReady ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#050303] via-[#780f20] to-[#050303]"></div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#050303] via-[#780f20] to-[#050303]
              animate-fade-out"
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#050303] via-[#111] to-[#050303]
              opacity-0 animate-fade-in"
      ></div>
      <LazyRender
        className="absolute inset-0 z-0 top-[0px] bottom-[0px] left-[0px] right-[0px] pointer-events-none"
        threshold={0}
        rootMargin="800px 0px 0px 0px"
      >
        <>
          <Aurora
            onReady={() => setAuroraReady(true)}
            transitionColorStops={{
              desktop: ["#333", "#000", "#444"],
              mobile: ["#333", "#000", "#444"],
            }}
            glowColor="#444"
          />
          <NoiseOverlay />
        </>
      </LazyRender>
      <div className="container relative z-10 flex justify-center items-center">
        <div className="centered text-center flex flex-col items-center">
          <h1 className="lg:text-[12rem] text-5xl md:text-7xl lg:leading-[0.95] leading-[1.1] font-medium max-w-4xl self-center px-4 sm:px-0">
            <BlurIn>{message}</BlurIn>
          </h1>
          <BlurIn delay={0.35}>
            <p className="mt-16 sm:text-sm text-[0.8rem] font-light font-mono opacity-80 max-w-2xl sm:leading-[24px] leading-[22px] lg:p-0 px-8">
              {details}
            </p>
          </BlurIn>
          <div className="mt-12">
            <BlurIn delay={0.7} distance={10}>
              <NavLink to="/">
                <PrimaryButton target="_blank">Go home</PrimaryButton>
              </NavLink>
            </BlurIn>
          </div>
        </div>
      </div>
    </div>
  );
}
