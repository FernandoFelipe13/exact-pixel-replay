import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Menu, Music2, Search, X } from "lucide-react";

import { CATEGORIES, FACEBOOK, INSTAGRAM, TIKTOK } from "@/lib/site";
import { SUBCATEGORIES, subValue } from "@/lib/subcategories";

export function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-background/95 shadow-card backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/logo-oferta-digital-360.png"
            alt="Logo Oferta Digital 360"
            className="h-11 w-11 rounded-full object-contain"
          />
          <span
            className={`font-display text-lg font-extrabold tracking-tight ${
              solid ? "text-primary" : "text-primary-foreground"
            }`}
          >
            Oferta<span className="text-secondary">Digital</span>360
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-x-2 lg:flex xl:gap-x-4"
        >
          {CATEGORIES.map((item, idx) => (
            <div key={item.slug} className="group relative">
            <Link
              to={`/${item.slug}`}
              className={`whitespace-nowrap text-[11.5px] font-semibold transition-colors xl:text-[13px] ${
                solid
                  ? "text-muted-foreground hover:text-primary"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {item.emoji} {item.name}
            </Link>
            {(SUBCATEGORIES[item.slug] ?? []).length > 0 && (
              <div
                className={`invisible absolute top-full z-50 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
                  idx > CATEGORIES.length / 2 ? "right-0" : "left-0"
                }`}
              >
                <div className="grid w-max max-w-[640px] grid-cols-2 gap-x-8 gap-y-4 rounded-2xl border border-border bg-background p-5 shadow-lift">
                  {(SUBCATEGORIES[item.slug] ?? []).map((g) => (
                    <div key={g.group} className="min-w-[150px]">
                      <Link
                        to={`/${item.slug}`}
                        search={{ sub: g.group } as never}
                        className="text-sm font-bold text-foreground hover:text-primary"
                      >
                        {g.group}
                      </Link>
                      {g.items.length > 0 && (
                        <ul className="mt-1.5 space-y-1">
                          {g.items.map((i) => (
                            <li key={i}>
                              <Link
                                to={`/${item.slug}`}
                                search={{ sub: subValue(g.group, i) } as never}
                                className="text-xs text-muted-foreground hover:text-primary"
                              >
                                {i}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${solid ? "text-primary" : "text-primary-foreground"}`}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
          setOpen(false);
          navigate({ to: "/busca", search: { q } });
        }}
        className="mx-auto max-w-3xl px-5 pb-3"
      >
        <label className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-card">
          <Search size={18} className="shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            name="q"
            type="search"
            placeholder="Buscar produtos, lojas, categorias…"
            aria-label="Buscar no site"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-secondary-foreground">
            Buscar
          </button>
        </label>
      </form>

      {open && (
        <nav
          aria-label="Navegação mobile"
          className="max-h-[70vh] overflow-y-auto border-t border-border bg-background px-5 pb-5 pt-2 lg:hidden"
        >
          {CATEGORIES.map((item) => (
            <div key={item.slug}>
            <Link
              to={`/${item.slug}`}
              onClick={() => setOpen(false)}
              className="block pt-3 text-sm font-semibold text-foreground"
            >
              {item.emoji} {item.name}
            </Link>
            <div className="flex flex-wrap gap-x-3 gap-y-1 pb-2 pl-6 pt-1">
              {(SUBCATEGORIES[item.slug] ?? []).map((g) => (
                <Link
                  key={g.group}
                  to={`/${item.slug}`}
                  search={{ sub: g.group } as never}
                  onClick={() => setOpen(false)}
                  className="text-xs text-muted-foreground"
                >
                  {g.group}
                </Link>
              ))}
            </div>
            </div>
          ))}
        </nav>

      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground py-14 text-sm text-primary-foreground/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold text-primary-foreground">
            Oferta<span className="text-secondary">Digital</span>360
          </p>
          <p className="mt-3 leading-relaxed">
            Os melhores links de ofertas e análises de produtos, com qualidade e relacionamento
            duradouro.
          </p>
        </div>

        <nav aria-label="Categorias do site">
          <h3 className="text-sm font-bold text-primary-foreground">Categorias</h3>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map((item) => (
              <li key={item.slug}>
                <Link to={`/${item.slug}`} className="transition-colors hover:text-secondary">
                  {item.emoji} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold text-primary-foreground">Nos siga</h3>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-start gap-2.5">
              <Facebook size={16} className="mt-0.5 shrink-0 text-secondary" />
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-secondary"
              >
                Achadinhos360
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Instagram size={16} className="mt-0.5 shrink-0 text-secondary" />
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-secondary"
              >
                @ofertadigital360
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Music2 size={16} className="mt-0.5 shrink-0 text-secondary" />
              <a
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-secondary"
              >
                @oferta.digital.36
              </a>
            </li>
          </ul>

          <Link
            to="/auth"
            className="mt-5 inline-block text-xs text-primary-foreground/50 transition-colors hover:text-secondary"
          >
            Área administrativa
          </Link>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Oferta Digital 360. Todos os direitos reservados.
      </p>
    </footer>
  );
}

