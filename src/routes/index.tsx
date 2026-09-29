import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Clock,
  Instagram,
  Link2,
  MessageCircle,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Tag,
  Wallet,
} from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/hero.jpg";
import fundadorImg from "@/assets/fundador.jpg";
import ctaImg from "@/assets/cta.jpg";
import { INSTAGRAM, WHATSAPP } from "@/lib/site";

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
            Aqui você encontra praticidade, variedade e os melhores preços da internet em um só lugar!
            Nossa missão é trazer produtos incríveis para facilitar o seu dia a dia, com ofertas especiais em tecnologia, acessórios, moda, utilidades e muito mais.
            <br /><br />
            Navegue pelas nossas categorias, descubra novidades e aproveite promoções imperdíveis com segurança e comodidade, sem sair de casa.
            <br /><br />
            Na Oferta Digital 360, cada compra é uma nova oportunidade de economizar e receber qualidade até você.
            <br /><br />
            Aproveite nossas ofertas e faça parte da experiência 360!
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lift transition-transform hover:scale-[1.03] hover:bg-primary/90 sm:w-auto"
            >
              Fale com Especialista
              <ArrowRight size={18} />
            </a>
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

const TIMELINE = [
  {
    year: "O começo",
    title: "Uma dúvida de compra que virou negócio",
    text: "Cansado de ver gente pagando caro por produtos ruins, começamos a testar, comparar e recomendar apenas o que realmente vale o preço.",
  },
  {
    year: "A curadoria",
    title: "Análises antes de cada indicação",
    text: "Cada produto passa por pesquisa de reputação, comparação de preço histórico e leitura de experiências reais de quem já comprou.",
  },
  {
    year: "Hoje",
    title: "Relacionamento acima da venda",
    text: "Atendemos de forma personalizada, tiramos dúvidas item por item e só enviamos o link quando a escolha faz sentido para você.",
  },
];

const NUMEROS = [
  { value: "+5 anos", label: "de experiência em vendas online" },
  { value: "+2.000", label: "pessoas orientadas na escolha" },
  { value: "+30", label: "categorias de produtos acompanhadas" },
  { value: "100%", label: "das indicações analisadas antes" },
];

function Sobre() {
  return (
    <section id="sobre" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Sobre nós</p>
              <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
                Qualidade e relacionamento duradouro no centro de tudo
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                A Oferta Digital 360 nasceu com um propósito simples: buscar constantemente as
                melhores opções em produtos variados, sempre com as tendências mais atuais, sem
                abrir mão da qualidade.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Nosso diferencial é o atendimento personalizado com foco em resultados e a expertise
                no segmento de vendas online. Não empurramos produto: orientamos a decisão.
              </p>
            </Reveal>

            <ol className="mt-12 space-y-0 border-l border-border pl-8">
              {TIMELINE.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 120} className="relative pb-10">
                  <span
                    className="absolute -left-[41px] mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-primary-soft"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary-foreground">
                    {item.year}
                  </p>
                  <h3 className="mt-2 text-lg text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={150} className="lg:sticky lg:top-28">
            <img
              src={fundadorImg}
              alt="Fernando Felipe, fundador da Oferta Digital 360, em seu escritório"
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full rounded-2xl object-cover shadow-lift"
            />
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {NUMEROS.map((n) => (
                <div key={n.label} className="rounded-xl bg-primary-soft p-4">
                  <dt className="font-display text-2xl font-extrabold text-primary">{n.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{n.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
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
    icon: MessageCircle,
    title: "Atendimento personalizado",
    text: "Fale direto com um especialista pelo WhatsApp e receba indicações feitas para a sua necessidade e o seu orçamento.",
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
                href={WHATSAPP}
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

const DIFERENCIAIS = [
  {
    icon: MessageCircle,
    title: "Atendimento personalizado",
    text: "Resposta de especialista no WhatsApp, com foco em resultado e não em venda a qualquer custo.",
  },
  {
    icon: Wallet,
    title: "Custo zero para você",
    text: "A orientação e as análises não têm custo: você paga apenas o preço do produto na loja.",
  },
  {
    icon: Clock,
    title: "Resposta no mesmo dia",
    text: "Dúvidas respondidas em horário comercial, normalmente em poucas horas.",
  },
  {
    icon: ShieldCheck,
    title: "Só lojas confiáveis",
    text: "Indicamos apenas links de lojas conhecidas, com política de troca e prazo de entrega claro.",
  },
  {
    icon: BadgeCheck,
    title: "Qualidade inegociável",
    text: "Produto sem qualidade comprovada não entra na nossa lista, mesmo com preço baixo.",
  },
  {
    icon: Sparkles,
    title: "Tendências atuais",
    text: "Acompanhamos lançamentos e novidades de mais de 30 categorias todos os meses.",
  },
];

function Diferenciais() {
  return (
    <section id="diferenciais" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Diferenciais competitivos
          </p>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
            Por que confiar na Oferta Digital 360
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {DIFERENCIAIS.map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 2) * 100} className="flex gap-4">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/20 text-secondary-foreground">
                <d.icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base text-foreground">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const DEPOIMENTOS = [
  {
    nome: "Juliana Prado",
    cargo: "Gerente de compras, JP Distribuidora",
    texto:
      "Precisávamos equipar o escritório sem estourar o orçamento. A análise comparativa economizou cerca de 22% na compra e nenhum item deu problema.",
    inicial: "JP",
  },
  {
    nome: "Rafael Menezes",
    cargo: "Fotógrafo autônomo",
    texto:
      "Estava em dúvida entre três modelos há semanas. Em uma conversa recebi a análise completa e o melhor link. Segurança total na escolha.",
    inicial: "RM",
  },
  {
    nome: "Camila Souza",
    cargo: "Sócia, Ateliê Duas Marias",
    texto:
      "O atendimento é realmente personalizado. Me avisaram para esperar dois dias e o preço caiu de verdade. Virou meu canal de consulta antes de qualquer compra.",
    inicial: "CS",
  },
];

function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-muted py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Depoimentos e prova social
          </p>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
            Clientes satisfeitos, escolhas com confiança
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <Reveal
              as="li"
              key={d.nome}
              delay={i * 120}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-transform duration-300 hover:-translate-y-1.5"
            >
              <Quote size={28} className="text-secondary" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-card-foreground">
                “{d.texto}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground"
                  aria-hidden="true"
                >
                  {d.inicial}
                </span>
                <span>
                  <span className="block text-sm font-bold text-foreground">{d.nome}</span>
                  <span className="block text-xs text-muted-foreground">{d.cargo}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section id="contato" className="bg-gradient-primary">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <img
            src={ctaImg}
            alt="Cliente recebendo entrega de um produto comprado com oferta indicada"
            width={1280}
            height={1280}
            loading="lazy"
            className="w-full rounded-2xl object-cover shadow-lift"
          />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-3xl text-primary-foreground sm:text-4xl">
            Resultados excepcionais que superam expectativas e geram valor real
          </h2>
          <p className="mt-5 text-base text-primary-foreground/85">
            Sem custo de consultoria, sem enrolação: você recebe a análise, o prazo de entrega da
            loja e o melhor link de oferta antes de decidir.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-primary-foreground/90">
            {[
              "Orientação gratuita — você paga só o produto",
              "Prazo de entrega informado antes da compra",
              "Apenas lojas confiáveis e produtos de qualidade",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <BadgeCheck size={18} className="mt-0.5 shrink-0 text-secondary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:nandofelipeoliveira@gmail.com?subject=${encodeURIComponent("Contato pelo site — Oferta Digital 360")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-4 text-sm font-bold text-secondary-foreground transition-transform hover:scale-[1.03]"
            >
              Entre em Contato
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <MessageCircle size={18} />
              WhatsApp (11) 99333-7675
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <Instagram size={18} />
              @ofertadigital360
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function Index() {
  return (
    <main>
      <Hero />
      <Sobre />
      <Servicos />
      <Diferenciais />
      <Depoimentos />
      <CtaFinal />
    </main>
  );
}
