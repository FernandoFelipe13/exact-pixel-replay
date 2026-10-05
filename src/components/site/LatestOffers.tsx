import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ImageOff } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { offersQuery } from "@/lib/offers";
import { CATEGORIES } from "@/lib/site";

export function LatestOffers({ category, sub }: { category?: string; sub?: string }) {
  const { data, isLoading, isError } = useQuery(offersQuery(category, 12, sub));
  const catName = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

  return (
    <section id="ofertas" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Últimas ofertas</p>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
            {category ? "Achados recentes desta categoria" : "Os achados mais recentes"}
          </h2>
        </Reveal>

        {isLoading && <p className="mt-10 text-sm text-muted-foreground">Carregando ofertas…</p>}
        {isError && (
          <p className="mt-10 text-sm text-muted-foreground">Não foi possível carregar as ofertas agora.</p>
        )}
        {data && data.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nenhuma oferta publicada ainda. Volte em breve!
          </p>
        )}

        {data && data.length > 0 && (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((o) => {
              const c = catName(o.category);
              return (
                <li
                  key={o.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
                >
                  <div className="flex aspect-square items-center justify-center bg-muted">
                    {o.image_url ? (
                      <img src={o.image_url} alt={o.title} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <ImageOff className="text-muted-foreground" aria-hidden="true" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {c && (
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        {c.emoji} {c.name}{o.subcategory ? ` · ${o.subcategory}` : ""}
                      </span>
                    )}
                    <h3 className="mt-2 text-base text-card-foreground">{o.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{o.store_name}</p>
                    <a
                      href={o.link}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 pt-3 text-sm font-bold text-secondary-foreground transition-transform hover:scale-[1.03]"
                      style={{ marginTop: "1rem" }}
                    >
                      Ver oferta <ExternalLink size={16} />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
