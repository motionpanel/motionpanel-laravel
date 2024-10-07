import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { HOMEPAGE_ROOT_PATH } from "@/config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../css/app.css";

import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, basepath: HOMEPAGE_ROOT_PATH });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app")!);
root.render(
  <ThemeProvider defaultTheme="light" storageKey="ui-theme">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
