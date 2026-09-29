import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/site/CategoryPage";
import { findCategory } from "@/lib/site";

const category = findCategory("extras");

export const Route = createFileRoute("/extras")({
  head: () => ({
    meta: [
      { title: category.title },
      { name: "description", content: category.description },
      { property: "og:title", content: category.title },
      { property: "og:description", content: category.description },
    ],
  }),
  component: () => <CategoryPage category={category} />,
});
