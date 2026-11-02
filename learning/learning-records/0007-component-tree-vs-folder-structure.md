# Confundiu a árvore de componentes com a estrutura de pastas

No Exercício A da Lição 01 a Mariana misturou a hierarquia de render (App → AppHeader → …) com pastas de feature (`features/itinerary`, `flights`…) e parou no primeiro nível. Faltaram RouteMap e NextSteps, e nenhuma repetição (×N) nem moldura compartilhada (PreviewCard) apareceu.

São duas perguntas diferentes. A árvore é sobre o runtime: quem renderiza quem e onde o estado mora. As pastas são sobre organização de código. A divisão por feature que ela propôs é uma boa resposta para a segunda pergunta.

**Evidence**: resposta colada do Exercício A.

**Implications**: retomar a decomposição até as folhas na Lição 02 (composição/children). A estrutura de pastas por feature entra na Lição 02 como decisão separada e é aprofundada na Fase 2.
