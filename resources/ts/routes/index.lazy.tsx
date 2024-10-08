import { createLazyFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <PageHeader>
      <h1 className="font-medium">Home</h1>
    </PageHeader>
  );
}
