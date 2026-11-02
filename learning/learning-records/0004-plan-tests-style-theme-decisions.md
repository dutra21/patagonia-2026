# Decisões de plano: testes cedo, estilo, RouteMap e flash de tema

Em 2026-10-18 a Mariana ajustou o plano em [[MISSION.md]]:
- **Testes:** Vitest e os testes das funções de `domain/` vão para a semana 1, junto com as funções. A semana 4 fica com Testing Library (Checklist) e um smoke em Playwright.
- **Estilo:** CSS Modules + custom properties com tokens da paleta do layout. Fidelidade visual sem pixel-perfect.
- **RouteMap:** no MVP é imagem ou lista de paradas, sem mapa interativo.
- **Flash de tema:** script inline no `index.html`, ensinado na Lição 04. A lição explica por que effects rodam depois do paint, então não evitam o flash.

**Evidence**: ela corrigiu sozinha uma nota minha. Eu tinha escrito "useEffect para sincronizar entre abas"; ela apontou que é `useSyncExternalStore`, o que confere com react.dev (subscribing to a browser API). É sinal de que ela já distingue "sincronizar algo com um sistema externo" (effect) de "ler um valor que muda fora do React" (useSyncExternalStore).

**Implications**: a Lição 04 pode partir dessa distinção em vez de ensiná-la do zero. A Lição 02 precisa de um passo de setup do Vitest. CSS Modules dispensa uma lição de styling.
