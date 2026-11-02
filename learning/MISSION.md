# Mission: React + TypeScript, de intermediário a sênior

## Why
A empresa vai migrar de Angular para React (Vite). Mariana — frontend sênior em Angular (MFE, arquitetura, code review) — precisa chegar a nível sênior em React rápido para liderar a migração: definir padrões, revisar PRs do time e entregar features. O veículo é o dashboard da viagem à Patagônia (20–30/11/2026), que precisa estar usável até 20/11/2026.

## Success looks like
Em 4,5 semanas (18/10 → 18/11, folga até 20/11):
- Dashboard usável com as 6 páginas (Home, Roteiro, Voos, Hospedagens, Passeios, Checklist), fiel a `../docs/layout.png`.
- Publicado no GitHub Pages e **funcionando offline no celular** (PWA), testado em modo avião antes do embarque.
- Decompor qualquer tela e justificar onde cada estado mora, sem estado redundante nem effects desnecessários.
- Em code review, apontar e explicar com fonte: estado derivado via `useEffect`, props espelhadas em state, keys instáveis, `activeTab` duplicando a URL.
- Usar Context e custom hooks só quando composição e props não bastam (tema).
- Usar a URL como estado (filtros, seleção) com React Router.
- Testes em três camadas: funções de `domain/` (Vitest), comportamento (Testing Library), um smoke (Playwright). Componentes acessíveis.

Fase 2 (depois da viagem): estado em escala, padrões de arquitetura e MFE para o time.

## Plano (4,5h/semana ≈ 20h no total)
| Semana | Lição | Entrega no dashboard |
|---|---|---|
| 1 · 18–25/10 | 01 Thinking in React · 02 Modelar o domínio em TS + composição | `trip.ts`, funções de `domain/` com testes no Vitest, Home estática |
| 2 · 26/10–01/11 | 03 React Router: layout routes, `NavLink`, `basename` | Header/nav, rotas, Roteiro, Voos; **deploy no GitHub Pages** (Actions, `base`, fallback de rotas) |
| 3 · 02–08/11 | 04 Effects como sincronização (inclui flash de tema) · 05 Identidade e keys | Checklist persistida, tema, Hospedagens |
| 4 · 09–15/11 | 06 Testes por comportamento (Testing Library) + a11y · 07 URL como estado | Testes da Checklist, um smoke em Playwright; Passeios com filtro na URL |
| 4,5 · 16–18/11 | 08 Context e custom hooks · revisão intercalada (01–08) | Tema via Context; **PWA offline** (vite-plugin-pwa); teste em modo avião no celular; polimento |

## Constraints
- 4,5h/semana entre estudo e código; lição de ~15–20 min + uma entrega concreta. Se atrasar, corta-se escopo (Passeios primeiro), nunca lições de modelo mental.
- Prazo duro: 20/11/2026.
- Já domina JS, TS e Angular: não ensinar fundamentos gerais nem sintaxe JSX/useState básico.
- Comparar com Angular quando acelerar; apontar reflexos a desaprender.
- Fontes primárias: react.dev, typescriptlang.org, reactrouter.com, testing-library.com.
- Português, termos técnicos em inglês. Feedback crítico e direto.
- Dados estáticos em TS no repo; só checklist e tema persistem em localStorage.
- Estilo: CSS Modules + custom properties (tokens da paleta do layout). Fidelidade visual ao layout, sem pixel-perfect.
- MVP: RouteMap é imagem estática ou lista de paradas, sem mapa interativo.
- Uso principal no celular: mobile-first. O layout é desktop; a versão de celular segue os mesmos componentes e tokens.
- Hospedagem: GitHub Pages (`base: '/patagonia-2026/'`). Deploy desde a semana 2, para testar no celular cedo.
- Checklist por aparelho (localStorage); não sincroniza entre aparelhos nem pessoas.

## Out of scope
- Backend/API, data fetching com cache (TanStack Query etc.), checklist compartilhada.
- Next.js / RSC / SSR.
- Bibliotecas de estado global (Redux, Zustand).
- MFE e arquitetura de time até a Fase 2.
