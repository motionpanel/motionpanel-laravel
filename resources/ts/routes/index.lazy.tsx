import { createLazyFileRoute } from "@tanstack/react-router";
import { HOMEPAGE_ROOT_PATH } from "@/config/config";
import { PageHeader } from "@/components/ui/page-header";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium">Home</h1>
      </PageHeader>
    </div>
  );
}
