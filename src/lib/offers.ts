import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type Offer = {
  id: string;
  title: string;
  category: string;
  store_name: string;
  link: string;
  image_url: string | null;
  subcategory: string | null;
  created_at: string;
};

export const offersQuery = (category?: string, limit = 12, sub?: string) =>
  queryOptions({
    queryKey: ["offers", category ?? "all", limit, sub ?? ""],
    queryFn: async (): Promise<Offer[]> => {
      let q = supabase
        .from("offers")
        .select("id, title, category, store_name, link, image_url, subcategory, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (category) q = q.eq("category", category);
      if (sub) q = sub.includes(" / ") ? q.eq("subcategory", sub) : q.like("subcategory", `${sub}%`);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Offer[];
    },
  });
