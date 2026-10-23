import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type LinkStatus = "ok" | "broken" | "unknown";

async function checkOne(url: string): Promise<LinkStatus> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": "Mozilla/5.0 (compatible; OfertaDigital360LinkCheck/1.0)" },
    });
    if (res.status === 404 || res.status === 410) return "broken";
    if (res.status >= 500 && res.status !== 503) return "broken";
    if (res.ok) return "ok";
    // 403/429/503 etc: lojas costumam bloquear robôs
    return "unknown";
  } catch {
    return "broken";
  } finally {
    clearTimeout(t);
  }
}

export const checkOfferLinks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { ids: string[] }) => {
    if (!Array.isArray(data?.ids)) throw new Error("ids inválidos");
    return { ids: data.ids.slice(0, 10).map(String) };
  })
  .handler(async ({ context, data: input }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    if (input.ids.length === 0) return {} as Record<string, LinkStatus>;
    const { data, error } = await context.supabase
      .from("offers")
      .select("id, link")
      .in("id", input.ids);
    if (error) throw new Error("Não foi possível carregar as ofertas");
    const list = data ?? [];
    const out = await Promise.all(list.map((o) => checkOne(o.link)));
    const results: Record<string, LinkStatus> = {};
    list.forEach((o, j) => (results[o.id] = out[j] ?? "unknown"));
    return results;
  });
