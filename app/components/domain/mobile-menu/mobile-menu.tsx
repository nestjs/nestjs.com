import gsap from "gsap";
import { useEffect, useRef } from "react";
import { siDiscord, siGithub, siX } from "simple-icons";
import LinkedinIcon from "../../../assets/icons/linkedin.svg";

type MenuItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

type MobileMenuProps = {
  open: boolean;
  close: () => void;
  items: MenuItem[];
};

export function MobileMenu({ open, close, items }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  linksRef.current = [];

  const addLinkRef = (el: HTMLAnchorElement) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        linksRef.current,
        { rotation: 25, opacity: 0, transformOrigin: "50% 100%" },
        {
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="fixed block lg:hidden left-0 top-0 w-full h-full bg-[#111111] z-50 flex flex-col flex-start p-8 justify-center"
      style={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        opacity: open ? 1 : 0,
        transition: "transform 0.25s ease-in-out, opacity 0.15s ease-in-out",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        className="absolute top-6 right-6 w-6 h-6 cursor-pointer"
        onClick={close}
      >
        <div className="w-full h-[2px] bg-white rotate-45 absolute top-1/2 left-0" />
        <div className="w-full h-[2px] bg-white -rotate-45 absolute top-1/2 left-0" />
      </div>
      <div className="flex flex-1" />
      <div className="mb-6 flex flex-col flex-start uppercase text-4xl font-semibold">
        {items.map((item, index) => (
          <div key={index} className="mb-2">
            <a
              href={item.href}
              className="mb-6 will-change-transform"
              ref={addLinkRef}
            >
              <span>{item.label}</span>
              <span className="ml-2 text-sm font-normal opacity-50">
                {index + 1}
              </span>
            </a>
            {item.children && (
              <div className="ml-6 my-3 flex flex-col flex-start">
                {item.children.map((child, childIndex) => (
                  <a
                    key={childIndex}
                    href={child.href}
                    className="mt-2 will-change-transform text-lg"
                    ref={addLinkRef}
                  >
                    <span className="opacity-70">{child.label}</span>
                    <span className="ml-2 text-sm font-normal opacity-50">
                      {index + 1}.{childIndex + 1}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row flex-1 items-end opacity-100 justify-center">
        <div className="flex items-center justify-center space-x-5">
          <a
            href="https://github.com/nestjs"
            target="_blank"
            className="icon m-l-30 hover:opacity-60 transition-opacity"
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
            className="icon hover:opacity-60 transition-opacity"
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
            href="https://discord.com/invite/G7Qnnhy"
            target="_blank"
            className="icon hover:opacity-60 transition-opacity"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current color-text"
            >
              <path d={siDiscord.path} />
            </svg>
          </a>
          <a
            href="https://linkedin.com/company/19078346"
            target="_blank"
            className="icon hover:opacity-60 transition-opacity"
          >
            <img
              src={LinkedinIcon}
              alt="Linkedin"
              className="w-4 h-4 fill-current color-text"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
