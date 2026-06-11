import DevtoolsThumbnail from "../assets/thumbnails/devtools.png";
import MauThumbnail from "../assets/thumbnails/mau.png";

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  children?: {
    id: string;
    label: string;
    href: string;
    description: string;
    thumbnail: string;
  }[];
};

export const MENU_ITEMS: Array<MenuItem> = [
  {
    id: "enterprise",
    label: "Enterprise",
    href: "/enterprise",
  },
  {
    id: "courses",
    label: "Courses",
    href: "/courses",
  },
  { id: "docs", label: "Docs", href: "https://docs.nestjs.com" },
  {
    id: "tools",
    label: "Tools",
    href: "#",
    children: [
      {
        id: "devtools",
        label: "Devtools",
        href: "https://devtools.nestjs.com",
        description: "Identify dependencies and connections between modules.",
        thumbnail: DevtoolsThumbnail,
      },
      {
        id: "mau",
        label: "Deploy, Mau!",
        href: "/tools/mau",
        description: "Provision and manage your infrastructure on AWS.",
        thumbnail: MauThumbnail,
      },
    ],
  },
  { id: "jobs", label: "Jobs", href: "/jobs" },
];
