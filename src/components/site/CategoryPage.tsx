import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { whatsappLink, type Category } from "@/lib/site";

export function CategoryPage({ category }: { category: Category }) {
  const message = `Olá! Vi o site da Oferta Digital 360 e quero ofertas de ${category.name}.`;

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
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-secondary-foreground shadow-lift transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Pedir ofertas de {category.name}
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

      <section className="bg-background py-20">
        <Reveal className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Não achou o que procurava?</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Manda sua dúvida no WhatsApp: buscamos o melhor preço de {category.name} para você,
            sem custo nenhum.
          </p>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lift transition-transform hover:scale-[1.03] hover:bg-primary/90"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </a>
        </Reveal>
      </section>
    </div>
  );
}
