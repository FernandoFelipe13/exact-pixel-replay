import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ExternalLink, ImageOff } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { offersQuery } from "@/lib/offers";
import { CATEGORIES } from "@/lib/site";

export function LatestOffers({ category, sub }: { category?: string; sub?: string | undefined }) {
  const { data, isLoading, isError } = useQuery(offersQuery(category, 8, sub));
  const catName = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section id="ofertas" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <Reveal className="min-w-0 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Últimas ofertas</p>
            <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
              {category ? "Achados recentes desta categoria" : "Os achados mais recentes"}
            </h2>
          </Reveal>
          {data && data.length > 1 && (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Ofertas anteriores"
                onClick={() => scroll(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-muted"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Próximas ofertas"
                onClick={() => scroll(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-muted"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

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
          <ul
            ref={track}
            className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:thin]"
          >
            {data.map((o) => {
              const c = catName(o.category);
              return (
                <li
                  key={o.id}
                  className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
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
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground transition-transform hover:scale-[1.03]"
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
