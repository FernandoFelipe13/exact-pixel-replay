import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar | Oferta Digital 360" },
      { name: "description", content: "Acesso ao painel de ofertas da Oferta Digital 360." },
      { property: "og:title", content: "Entrar | Oferta Digital 360" },
      { property: "og:description", content: "Acesso ao painel de ofertas da Oferta Digital 360." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "up") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return setMsg(error.message);
      if (!data.session) return setMsg("Conta criada! Confirme pelo link enviado ao seu e-mail e depois entre.");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg("E-mail ou senha incorretos.");
      navigate({ to: "/admin" });
    }
  }

  const input = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground";
  return (
    <main className="mx-auto max-w-md px-5 pb-20 pt-36">
      <h1 className="text-3xl text-foreground">{mode === "in" ? "Entrar no painel" : "Criar conta"}</h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input className={input} type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={input} type="password" required minLength={6} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={busy} className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60">
          {mode === "in" ? "Entrar" : "Criar conta"}
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-muted-foreground">{msg}</p>}
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-6 text-sm font-semibold text-primary">
        {mode === "in" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
      </button>
    </main>
  );
}
