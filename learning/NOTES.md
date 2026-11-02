# Notes

- Prefere críticas diretas; não suavizar erros de quiz.
- Sempre comparar com Angular quando acelerar; listar reflexos a desaprender.
- Exercícios no domínio da viagem; apontar para `../src` quando houver código.
- Tempo: 4,5h/sem (≈ 20h), horizonte de 4,5 semanas (plano em MISSION.md): lições de ~15–20 min + uma entrega concreta.
- Spacing: toda lição a partir da 02 abre com 2–3 perguntas de retrieval das lições anteriores; semana 4,5 = revisão intercalada.
- Papel na migração: liderar arquitetura + revisar PRs + implementar (tudo).
- Estado do repo em 2026-10-18: só scaffold Vite (React 19, TS ~6, oxlint). React Router, Vitest, Testing Library e Playwright AINDA NÃO instalados.
- Glossário: ainda não criado — promover termos só depois que ela usar corretamente (candidatos: derived state, lifting state up, inverse data flow, single source of truth).
- Lições: abrir com `open lessons/<arquivo>.html`.
- Persistência (tema/checklist): react.dev prefere side effects em event handlers; useEffect é "last resort". Ensinar: ler no lazy initializer do useState, gravar no handler; effect só se o valor muda por vários caminhos. Sincronizar entre abas (evento `storage`) é `useSyncExternalStore`, não `useEffect`: o valor muda fora do React (react.dev/reference/react/useSyncExternalStore#subscribing-to-a-browser-api). Flash de tema: script inline no index.html, ensinado na Lição 04.
- Uso real: celular, durante a viagem, com sinal ruim (El Chaltén, trilhas). Offline é requisito. Lição 03 inclui deploy (base + basename + fallback de rotas); PWA é tarefa da semana 4,5, não lição (não é React).
- Lembrar: depois do último deploy, abrir o site no celular com sinal para o service worker baixar a versão final antes de 20/11.
- Lição 01 feita em 2026-10-18: B 8/11, C 2/4. Erros: ver LR-0006 e LR-0007. Pendente para a próxima sessão: ela refaz a árvore da HomePage até as folhas (com ×N), sem consultar a referência; revisar e só então gerar a Lição 02.
