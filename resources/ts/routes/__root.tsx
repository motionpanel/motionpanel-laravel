import React, { Suspense } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { HomeIcon, ListIcon, TriangleAlert } from "lucide-react";
import MotionPanelLogoSvg from "../../assets/motion-panel-logo-2.svg?react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

const menus = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon size={18} strokeWidth={1.8} />,
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: <ListIcon size={18} strokeWidth={2.3} />,
  },
  {
    title: "Failed Jobs",
    path: "/jobs/failed",
    icon: <TriangleAlert size={18} strokeWidth={1.8} />,
  },
];

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="dark:bg-black min-h-screen bg-zinc-100 dark:text-white">
        <div className="flex space-x-4">
          <nav className="flex flex-col w-52 text-zinc-700 text-xs pl-8">
            <Link to={`/`} className="py-2 h-16">
              <MotionPanelLogoSvg className="w-full h-full px-4" />
            </Link>
            {/* TODO: active state */}
            {menus.map((menu, i) => (
              <Link
                key={i}
                to={`${menu.path}`}
                className="block px-4 py-2 hover:bg-zinc-200 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div>{menu.icon}</div> <div>{menu.title}</div>
                </div>
              </Link>
            ))}
          </nav>
          <div className="min-h-screen flex-1 bg-zinc-50 border-l border-solid border-l-zinc-200">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
