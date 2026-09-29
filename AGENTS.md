<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- Site chrome (Navbar, Footer, WhatsappFloat) lives in `src/components/site/Chrome.tsx` and renders once in `src/routes/__root.tsx` around `<Outlet />`, so category pages keep the same header/footer; page bodies must not re-add them.
- Category data (slugs, emoji, copy, WhatsApp messages) is the single source `src/lib/site.ts`; each category has its own route file (`/casa`, `/informatica`, `/celulares`, `/games`, `/roupas`, `/fitness`, `/pet`, `/cursos`, `/livros`, `/extras`) sharing `CategoryPage`.

