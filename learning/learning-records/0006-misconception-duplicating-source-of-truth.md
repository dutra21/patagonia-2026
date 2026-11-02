# Equívoco: duplicar a fonte da verdade em vez de derivar

Na Lição 01 os 5 erros da Mariana têm a mesma raiz. Ela guarda ou fixa uma cópia de algo que já tem dono:
- "5 Voos" e a cor do badge tratados como valor próprio, quando são `flights.length` e um mapa a partir da dificuldade;
- nav ativa sem reconhecer a URL como dona;
- localStorage escolhido como dono do tema, sendo que ele só persiste (escrever nele não dispara re-render);
- `selectedStay` guardado como objeto em vez de id.

O último é reflexo direto de Angular. Lá, guardar a referência funciona porque o objeto é mutado no lugar. Em React, uma atualização imutável troca o array, e a referência guardada fica velha.

**Evidence**: Lição 01, Exercício B (8/11 certos, os 3 erros eram "Derivado"). Nos 3 ela marcou "Estático": acertou que não é state, mas não viu a segunda fonte de verdade (erro de DRY, não de state) e Exercício C (2/4 certos, errou o tema → localStorage e a seleção → objeto).

**Implications**: abrir as Lições 02, 04 e 07 com retrieval sobre "quem é o dono deste dado?". Na Lição 04, separar "persistir" (efeito colateral) de "possuir" (state). Ligar imutabilidade à escolha de guardar o id.
