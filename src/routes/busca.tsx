import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/site";
import { SUBCATEGORIES, subValue } from "@/lib/subcategories";
import type { Offer } from "@/lib/offers";

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const Route = createFileRoute("/busca")({
  validateSearch: zodValidator(z.object({ q: fallback(z.string(), "").default("") })),
  head: () => ({
    meta: [
      { title: "Buscar ofertas | Oferta Digital 360" },
      { name: "description", content: "Busque produtos, lojas, categorias e subcategorias em todas as ofertas da Oferta Digital 360." },
      { property: "og:title", content: "Buscar ofertas | Oferta Digital 360" },
      { property: "og:description", content: "Encontre qualquer oferta em todas as categorias do site." },
    ],
  }),
  component: BuscaPage,
});

function BuscaPage() {
  const { q } = Route.useSearch();
  const term = q.trim().slice(0, 80);
  const n = norm(term);

  const cats = n ? CATEGORIES.filter((c) => norm(c.name).includes(n)) : [];
  const subs: { slug: string; label: string; value: string }[] = [];
  if (n) {
    for (const c of CATEGORIES) {
      for (const g of SUBCATEGORIES[c.slug] ?? []) {
        if (norm(g.group).includes(n)) subs.push({ slug: c.slug, label: `${c.name} › ${g.group}`, value: g.group });
        for (const i of g.items) {
          if (norm(i).includes(n)) subs.push({ slug: c.slug, label: `${c.name} › ${i}`, value: subValue(g.group, i) });
        }
      }
    }
  }

  const offers = useQuery({
    queryKey: ["search-offers", term],
    enabled: term.length > 0,
    queryFn: async (): Promise<Offer[]> => {
      const safe = term.replace(/[,()%*\\]/g, " ");
      const ors = [`title.ilike.%${safe}%`, `store_name.ilike.%${safe}%`, `subcategory.ilike.%${safe}%`];
      if (cats.length) ors.push(`category.in.(${cats.map((c) => c.slug).join(",")})`);
      const { data, error } = await supabase
        .from("offers")
        .select("id, title, category, store_name, link, image_url, subcategory, created_at")
        .or(ors.join(","))
        .order("created_at", { ascending: false })
        .limit(48);
      if (error) throw error;
      return (data ?? []) as Offer[];
    },
  });

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 pb-24 pt-40">
      <h1 className="text-3xl text-foreground">{term ? <>Resultados para “{term}”</> : "Buscar ofertas"}</h1>
      {!term && <p className="mt-4 text-muted-foreground">Digite algo na barra de busca no topo do site.</p>}

      {(cats.length > 0 || subs.length > 0) && (
        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Link key={c.slug} to={`/${c.slug}`} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              {c.emoji} {c.name}
            </Link>
          ))}
          {subs.slice(0, 24).map((s) => (
            <Link key={s.slug + s.value} to={`/${s.slug}`} search={{ sub: s.value } as never} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary">
              {s.label}
            </Link>
          ))}
        </div>
      )}

      {term && (
        <section className="mt-10">
          {offers.isLoading && <p className="text-muted-foreground">Buscando…</p>}
          {offers.isError && <p className="text-destructive">Não foi possível buscar agora.</p>}
          {offers.data && offers.data.length === 0 && <p className="text-muted-foreground">Nenhuma oferta encontrada.</p>}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offers.data?.map((o) => {
              const cat = CATEGORIES.find((c) => c.slug === o.category);
              return (
                <li key={o.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  {o.image_url && <img src={o.image_url} alt={o.title} loading="lazy" className="aspect-square w-full bg-muted object-contain" />}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-bold text-primary">{cat ? `${cat.emoji} ${cat.name}` : o.category}{o.subcategory ? ` · ${o.subcategory}` : ""}</p>
                    <h2 className="mt-2 flex-1 text-sm font-semibold text-card-foreground">{o.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{o.store_name}</p>
                    <a href={o.link} target="_blank" rel="noopener noreferrer sponsored" className="mt-4 rounded-full bg-secondary px-4 py-2 text-center text-sm font-bold text-secondary-foreground">
                      Ver oferta
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
