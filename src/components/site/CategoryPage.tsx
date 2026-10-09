import { Link, useSearch } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Facebook } from "lucide-react";

import { LatestOffers } from "@/components/site/LatestOffers";
import { Reveal } from "@/components/site/Reveal";
import { FACEBOOK, type Category } from "@/lib/site";
import { SUBCATEGORIES, subValue } from "@/lib/subcategories";

export function CategoryPage({ category }: { category: Category }) {
  const search = useSearch({ strict: false }) as { sub?: string };
  const sub = typeof search.sub === "string" ? search.sub : undefined;
  const groups = SUBCATEGORIES[category.slug] ?? [];
  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"
    }`;

  return (
    <div>
      <section className="bg-gradient-primary">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-36 text-center">
          <Reveal>
            <span
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/10 text-4xl ring-1 ring-primary-foreground/25"
              aria-hidden="true"
            >
              {category.emoji}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl leading-tight text-primary-foreground sm:text-5xl">
              Ofertas de <span className="text-secondary">{category.name}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
              {category.intro}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-secondary-foreground shadow-lift transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Ver ofertas de {category.name}
                <ArrowRight size={18} />
              </a>
              <Link
                to="/"
                className="inline-flex w-full items-center justify-center rounded-full border border-primary-foreground/35 px-8 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
              >
                Voltar ao início
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              O que você encontra
            </p>
            <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">{category.bulletsHeading}</h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {category.bullets.map((b, i) => (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 100}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card"
              >
                <BadgeCheck size={24} className="text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-base text-card-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {groups.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-16">
          <h2 className="text-xl text-foreground">Subcategorias</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to={`/${category.slug}`} search={{} as never} className={chip(!sub)}>Todas</Link>
            {groups.map((g) => (
              <Link key={g.group} to={`/${category.slug}`} search={{ sub: g.group } as never} className={chip(sub === g.group)}>
                {g.group}
              </Link>
            ))}
          </div>
          {(() => {
            const g = groups.find((x) => sub === x.group || sub?.startsWith(`${x.group} / `));
            if (!g || g.items.length === 0) return null;
            return (
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((i) => {
                  const v = subValue(g.group, i);
                  return (
                    <Link key={i} to={`/${category.slug}`} search={{ sub: v } as never} className={chip(sub === v)}>
                      {i}
                    </Link>
                  );
                })}
              </div>
            );
          })()}
        </section>
      )}
      <LatestOffers category={category.slug} sub={sub} grid />

      <section className="bg-muted py-20">
        <Reveal className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Não achou o que procurava?</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Siga a página Achadinhos360 no Facebook: divulgamos o melhor preço de {category.name}{" "}
            primeiro por lá.
          </p>
          <a
            href={FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lift transition-transform hover:scale-[1.03] hover:bg-primary/90"
          >
            <Facebook size={18} />
            Seguir no Facebook
          </a>
        </Reveal>
      </section>
    </div>
  );
}
