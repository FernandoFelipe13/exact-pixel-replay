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
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await context.supabase.from("offers").select("id, link").limit(1000);
    if (error) throw new Error("Não foi possível carregar as ofertas");
    const results: Record<string, LinkStatus> = {};
    const list = data ?? [];
    for (let i = 0; i < list.length; i += 6) {
      const batch = list.slice(i, i + 6);
      const out = await Promise.all(batch.map((o) => checkOne(o.link)));
      batch.forEach((o, j) => (results[o.id] = out[j] ?? "unknown"));
    }
    return results;
  });
