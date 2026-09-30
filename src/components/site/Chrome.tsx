import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Menu, X } from "lucide-react";

import { CATEGORIES, FACEBOOK, INSTAGRAM } from "@/lib/site";
import logoAsset from "@/assets/logo.png.asset.json";

export function Navbar() {
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
            src={logoAsset.url}
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
          className="hidden items-center gap-x-4 lg:flex"
        >
          {CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              to={`/${item.slug}`}
              className={`whitespace-nowrap text-[13px] font-semibold transition-colors ${
                solid
                  ? "text-muted-foreground hover:text-primary"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {item.emoji} {item.name}
            </Link>
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

      {open && (
        <nav
          aria-label="Navegação mobile"
          className="max-h-[70vh] overflow-y-auto border-t border-border bg-background px-5 pb-5 pt-2 lg:hidden"
        >
          {CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              to={`/${item.slug}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold text-foreground"
            >
              {item.emoji} {item.name}
            </Link>
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
          </ul>

        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Oferta Digital 360. Todos os direitos reservados.
      </p>
    </footer>
  );
}

