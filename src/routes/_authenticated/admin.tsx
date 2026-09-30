import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { offersQuery } from "@/lib/offers";
import { CATEGORIES } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel de ofertas | Oferta Digital 360" },
      { name: "description", content: "Cadastre e gerencie as ofertas do site." },
      { property: "og:title", content: "Painel de ofertas | Oferta Digital 360" },
      { property: "og:description", content: "Cadastre e gerencie as ofertas do site." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const EMPTY = { title: "", category: CATEGORIES[0].slug as string, store_name: "", link: "", image_url: "" };

function AdminPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const admin = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data } = await supabase.rpc("claim_first_admin");
      return Boolean(data);
    },
  });
  const offers = useQuery(offersQuery(undefined, 100));
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const { error } = await supabase.from("offers").insert({ ...form, image_url: form.image_url || null });
    if (error) return setMsg("Não foi possível salvar: " + error.message);
    setForm(EMPTY);
    setMsg("Oferta publicada!");
    qc.invalidateQueries({ queryKey: ["offers"] });
  }

  async function remove(id: string) {
    if (!confirm("Apagar esta oferta?")) return;
    await supabase.from("offers").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["offers"] });
  }

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const input = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground";

  if (admin.isLoading) return <main className="px-5 pt-36 text-center text-muted-foreground">Carregando…</main>;
  if (!admin.data)
    return (
      <main className="mx-auto max-w-md px-5 pb-20 pt-36 text-center">
        <h1 className="text-2xl text-foreground">Acesso restrito</h1>
        <p className="mt-3 text-sm text-muted-foreground">Esta conta não é administradora do site.</p>
        <button onClick={signOut} className="mt-6 text-sm font-semibold text-primary">Sair</button>
      </main>
    );

  return (
    <main className="mx-auto max-w-4xl px-5 pb-20 pt-32">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-foreground">Painel de ofertas</h1>
        <button onClick={signOut} className="text-sm font-semibold text-primary">Sair</button>
      </div>

      <form onSubmit={save} className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:grid-cols-2">
        <input className={input + " sm:col-span-2"} required placeholder="Nome do produto" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.emoji} {c.name}</option>
          ))}
        </select>
        <input className={input} required placeholder="Nome da loja (ex.: Amazon)" value={form.store_name} onChange={(e) => setForm({ ...form, store_name: e.target.value })} />
        <input className={input + " sm:col-span-2"} required type="url" placeholder="Link da oferta (https://...)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        <input className={input + " sm:col-span-2"} type="url" placeholder="Link da foto do produto (https://...)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <button className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground sm:col-span-2">Publicar oferta</button>
        {msg && <p className="text-sm text-muted-foreground sm:col-span-2">{msg}</p>}
      </form>

      <h2 className="mt-12 text-xl text-foreground">Ofertas publicadas</h2>
      <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {(offers.data ?? []).map((o) => (
          <li key={o.id} className="flex items-center gap-4 p-4">
            {o.image_url && <img src={o.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-card-foreground">{o.title}</p>
              <p className="text-xs text-muted-foreground">{CATEGORIES.find((c) => c.slug === o.category)?.name} · {o.store_name}</p>
            </div>
            <button onClick={() => remove(o.id)} aria-label="Apagar oferta" className="text-muted-foreground hover:text-destructive">
              <Trash2 size={18} />
            </button>
          </li>
        ))}
        {offers.data?.length === 0 && <li className="p-4 text-sm text-muted-foreground">Nenhuma oferta ainda.</li>}
      </ul>
    </main>
  );
}
