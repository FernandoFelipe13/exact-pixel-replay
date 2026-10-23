import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";

import { checkOfferLinks, type LinkStatus } from "@/lib/link-check.functions";
import { offersQuery, type Offer } from "@/lib/offers";
import { CATEGORIES } from "@/lib/site";
import { SUBCATEGORIES, subValue } from "@/lib/subcategories";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel de ofertas | Oferta Digital 360" },
      { name: "description", content: "Cadastre, edite e gerencie as ofertas do site." },
      { property: "og:title", content: "Painel de ofertas | Oferta Digital 360" },
      { property: "og:description", content: "Cadastre, edite e gerencie as ofertas do site." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const EMPTY = { title: "", category: "casa" as string, subcategory: "", store_name: "", link: "", image_url: "" };

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
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const checkFn = useServerFn(checkOfferLinks);
  const [checking, setChecking] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, LinkStatus> | null>(null);
  const [checkErr, setCheckErr] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  async function runCheck() {
    setChecking(true);
    setCheckErr(null);
    setStatuses({});
    try {
      const { data, error } = await supabase.from("offers").select("id").limit(1000);
      if (error) throw error;
      const ids = (data ?? []).map((r) => r.id);
      setProgress({ done: 0, total: ids.length });
      let failed = 0;
      for (let i = 0; i < ids.length; i += 10) {
        const batch = ids.slice(i, i + 10);
        try {
          const res = await checkFn({ data: { ids: batch } });
          setStatuses((prev) => ({ ...(prev ?? {}), ...res }));
        } catch {
          failed += batch.length;
        }
        setProgress({ done: Math.min(i + 10, ids.length), total: ids.length });
      }
      if (failed > 0) setCheckErr(`${failed} ofertas não puderam ser verificadas. Tente novamente.`);
    } catch {
      setCheckErr("Não foi possível verificar os links agora. Tente novamente.");
    } finally {
      setChecking(false);
    }
  }

  function startEdit(o: Offer) {
    setForm({
      title: o.title,
      category: o.category,
      subcategory: o.subcategory ?? "",
      store_name: o.store_name,
      link: o.link,
      image_url: o.image_url ?? "",
    });
    setEditing(o.id);
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditing(null);
    setForm(EMPTY);
    setMsg(null);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const payload = { ...form, image_url: form.image_url || null, subcategory: form.subcategory || null };
    const { error } = editing
      ? await supabase.from("offers").update(payload).eq("id", editing)
      : await supabase.from("offers").insert(payload);
    if (error) return setMsg("Não foi possível salvar: " + error.message);
    setEditing(null);
    setForm(EMPTY);
    setMsg(editing ? "Oferta atualizada!" : "Oferta publicada!");
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
        <h2 className="text-lg font-bold text-foreground sm:col-span-2">
          {editing ? "Editar oferta" : "Nova oferta"}
        </h2>
        <input className={input + " sm:col-span-2"} required placeholder="Nome do produto" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.emoji} {c.name}</option>
          ))}
        </select>
        <select className={input} value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}>
          <option value="">Subcategoria (opcional)</option>
          {(SUBCATEGORIES[form.category] ?? []).map((g) =>
            g.items.length === 0 ? (
              <option key={g.group} value={g.group}>{g.group}</option>
            ) : (
              <optgroup key={g.group} label={g.group}>
                <option value={g.group}>{g.group} (geral)</option>
                {g.items.map((i) => (
                  <option key={i} value={subValue(g.group, i)}>{i}</option>
                ))}
              </optgroup>
            ),
          )}
        </select>
        <input className={input} required placeholder="Nome da loja (ex.: Amazon)" value={form.store_name} onChange={(e) => setForm({ ...form, store_name: e.target.value })} />
        <input className={input + " sm:col-span-2"} required type="url" placeholder="Link da oferta (https://...)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        <input className={input + " sm:col-span-2"} type="url" placeholder="Link da foto do produto (https://...)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <button className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground sm:col-span-2">
          {editing ? "Salvar alterações" : "Publicar oferta"}
        </button>
        {editing && (
          <button type="button" onClick={cancelEdit} className="text-sm font-semibold text-muted-foreground hover:text-foreground sm:col-span-2">
            Cancelar edição
          </button>
        )}
        {msg && <p className="text-sm text-muted-foreground sm:col-span-2">{msg}</p>}
      </form>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl text-foreground">Ofertas publicadas</h2>
        <button
          onClick={runCheck}
          disabled={checking}
          className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary disabled:opacity-60"
        >
          {checking ? "Verificando…" : "Verificar status dos links"}
        </button>
      </div>
      {statuses && (
        <p className="mt-3 text-sm text-muted-foreground">
          {Object.values(statuses).filter((s) => s === "ok").length} no ar ·{" "}
          {Object.values(statuses).filter((s) => s === "broken").length} fora do ar ·{" "}
          {Object.values(statuses).filter((s) => s === "unknown").length} não confirmados (a loja bloqueou a checagem — abra para conferir)
        </p>
      )}
      {checkErr && <p className="mt-3 text-sm text-destructive">{checkErr}</p>}
      <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {(offers.data ?? []).map((o) => (
          <li key={o.id} className={`flex items-center gap-4 p-4 ${editing === o.id ? "bg-muted" : ""}`}>
            {o.image_url && <img src={o.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-card-foreground">{o.title}</p>
              <p className="text-xs text-muted-foreground">{CATEGORIES.find((c) => c.slug === o.category)?.name}{o.subcategory ? ` › ${o.subcategory}` : ""} · {o.store_name}</p>
            </div>
            {statuses?.[o.id] && (
              <a
                href={o.link}
                target="_blank"
                rel="noreferrer"
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  statuses[o.id] === "ok"
                    ? "bg-primary/10 text-primary"
                    : statuses[o.id] === "broken"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-secondary/20 text-foreground"
                }`}
              >
                {statuses[o.id] === "ok" ? "No ar" : statuses[o.id] === "broken" ? "Fora do ar" : "Conferir"}
              </a>
            )}
            <button onClick={() => startEdit(o)} aria-label="Editar oferta" className="text-muted-foreground hover:text-primary">
              <Pencil size={18} />
            </button>
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
