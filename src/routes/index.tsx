import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Link2,
  Scale,
  Sparkles,
  Tag,
} from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { LatestOffers } from "@/components/site/LatestOffers";
import heroImg from "@/assets/hero.jpg";
import { FACEBOOK } from "@/lib/site";

const TITLE = "Oferta Digital 360 | Os melhores links de ofertas e análises de produtos";
const DESCRIPTION =
  "Encontre os melhores preços da internet em produtos de diversas categorias. Análises honestas, comparações e o melhor link de oferta — com atendimento personalizado.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});


function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center">
      <img
        src={heroImg}
        alt="Pessoa comparando ofertas de produtos no notebook e no celular"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-primary-dark/80" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 py-32 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            <Sparkles size={14} className="text-secondary" />
            Vendas online com curadoria
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-7 text-4xl leading-[1.08] text-primary-foreground sm:text-5xl md:text-6xl">
            Seja bem-vindo à <span className="text-secondary">Oferta Digital 360</span>! 
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            Os melhores achados da internet em um só lugar!
            <br /><br />
            Ofertas em tecnologia, moda, acessórios, utilidades e muito mais, selecionadas para você economizar com praticidade e segurança.
          </p>
        </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#servicos"
                className="inline-flex w-full items-center justify-center rounded-full border border-primary-foreground/35 px-8 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
              >
                Saiba Mais
              </a>
            </div>
          </Reveal>
      </div>
    </section>
  );
}


const SERVICOS = [
  {
    icon: Link2,
    title: "Melhores links de oferta",
    text: "Divulgamos os links com o melhor preço da internet em produtos de diversas categorias, sempre verificados antes de publicar.",
  },
  {
    icon: Scale,
    title: "Comparação de produtos",
    text: "Colocamos modelos lado a lado — preço, durabilidade e custo-benefício — para que a escolha seja segura e sem arrependimento.",
  },
  {
    icon: BarChart3,
    title: "Análises de produtos",
    text: "Ficou em dúvida sobre aquele produto? Analisamos reputação, especificações e experiências reais antes de recomendar.",
  },
  {
    icon: Tag,
    title: "Monitoramento de preços",
    text: "Acompanhamos variações para você não pagar caro em promoção falsa e comprar no momento certo.",
  },
  {
    icon: BadgeCheck,
    title: "Curadoria de tendências",
    text: "Selecionamos os lançamentos que realmente valem a pena, com foco em qualidade e não apenas em novidade.",
  },
];

function Servicos() {
  return (
    <section id="servicos" className="bg-muted py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Serviços e soluções
          </p>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
            Tudo o que você precisa para comprar bem
          </h2>
          <p className="mt-5 text-base text-muted-foreground">
            De tudo um pouco, em diversas categorias — com a análise que resolve a maior dificuldade
            do mercado: encontrar qualidade e confiança.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 3) * 100}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg text-card-foreground">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground transition-transform hover:scale-[1.03]"
              >
                Saiba Mais
                <ArrowRight size={16} />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <LatestOffers />
      <Servicos />
    </main>
  );
}
