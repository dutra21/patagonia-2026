# Uso no celular durante a viagem: offline, GitHub Pages, checklist por aparelho

Em 2026-10-18 a Mariana confirmou que vai usar o dashboard no celular durante a viagem. Decisões registradas em [[MISSION.md]]:
- **Offline obrigatório:** PWA com vite-plugin-pwa na semana 4,5. O motivo é o sinal ruim em El Chaltén e nas trilhas.
- **Hospedagem:** GitHub Pages, com deploy via Actions desde a semana 2. Ela escolheu isso em vez de Cloudflare Pages/Netlify, que eram minha recomendação, e aceitou o custo de `base` + `basename` + workaround de fallback de rotas.
- **Checklist:** fica por aparelho, sem sincronização. Uma checklist compartilhada exigiria backend, que está fora de escopo.
- **Mobile-first.**

**Implications**: a Lição 03 precisa cobrir `basename` e por que um refresh em `/patagonia-2026/roteiro` dá 404 numa hospedagem estática. O polimento final inclui um teste em modo avião. Riscos: o service worker servir uma versão antiga, e o base path afetar o escopo do service worker. Testar os dois cedo.
