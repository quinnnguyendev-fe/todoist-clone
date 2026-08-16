import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  layout("./components/layout/index.tsx", [
    route("inbox", "./pages/inbox/index.tsx"),
    route("today", "./pages/today/index.tsx"),
    route("reporting", "./pages/reporting/index.tsx"),
    route("filters-and-labels", "./pages/filters-and-labels/index.tsx"),
    route("upcoming", "./pages/upcoming/index.tsx"),
    route("notifications", "./pages/notifications/index.tsx"),
  ]),
] satisfies RouteConfig;
