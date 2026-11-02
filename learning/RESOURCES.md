# React + TypeScript Resources

## Knowledge

- [react.dev — Thinking in React](https://react.dev/learn/thinking-in-react)
  Os 5 passos: hierarquia, versão estática, estado mínimo, onde o estado mora, inverse data flow. Use for: decompor telas, classificar dados.
- [react.dev — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
  5 princípios (agrupar, evitar contradição, redundância, duplicação, aninhamento). Use for: review de modelagem de estado, `selectedId` vs objeto.
- [react.dev — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
  Catálogo de effects desnecessários. Use for: desaprender lifecycle/ngOnChanges; code review.
- [react.dev — Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
  Lifting state up, single source of truth. Use for: onde o estado mora.
- [react.dev — Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
  Render como cálculo puro. Use for: por que não ler relógio/localStorage no render.
- [react.dev — Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
  Identidade por posição na árvore, keys. Use for: reconciliação.
- [react.dev — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
  Effects como sincronização com sistemas externos. Use for: localStorage, relógio, document.title.
- [React Router docs](https://reactrouter.com/home)
  Use for: rotas, NavLink, search params como estado.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
  Use for: modelar o domínio (unions discriminadas para tipos de evento do roteiro).
- [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles) e [Queries priority](https://testing-library.com/docs/queries/about#priority)
  Use for: testes por comportamento, queries por role (liga com acessibilidade).

- [Vite — Deploying a Static Site (GitHub Pages)](https://vite.dev/guide/static-deploy)
  `base: '/<REPO>/'` + workflow do GitHub Actions. Não cobre fallback de SPA. Use for: deploy da semana 2.
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/guide/) e [Service Worker Precache](https://vite-pwa-org.netlify.app/guide/service-worker-precache)
  Manifest + service worker via Workbox. Use for: offline na semana 4,5.

## Wisdom (Communities)

- [Reactiflux (Discord)](https://www.reactiflux.com/)
  Maior comunidade de React, canais de ajuda e code review moderados. Use for: discutir decisões de arquitetura, pedir review de componentes do dashboard.
- [React GitHub Discussions / issues](https://github.com/facebook/react)
  Use for: entender decisões de design direto dos mantenedores (ler, mais que postar).

## Gaps
- Fonte primária para fallback de SPA no GitHub Pages (404.html). Verificar nos docs do React Router/GitHub antes da Lição 03.
- Fonte primária sobre MFE em React com Vite (Module Federation) — buscar quando chegarmos em arquitetura.
