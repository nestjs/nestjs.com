import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("enterprise", "routes/enterprise.tsx"),
] satisfies RouteConfig;
