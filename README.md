# Patagonia 2026

Site da viagem de 20 a 30/11/2026 (São Paulo → Buenos Aires → El Calafate → El Chaltén → Ushuaia → Buenos Aires → São Paulo).
Funciona **offline**: depois de aberto uma vez com internet, tudo funciona em modo avião.

Vite + React 19 + TypeScript, PWA com `vite-plugin-pwa`. Sem backend e sem chamadas de rede em runtime.

## Rodar

Requer Node 24 (veja `.node-version`).

```bash
npm install
npm run dev       # http://localhost:5173 (sem service worker)
npm run build     # build de produção em dist/
npm run preview   # serve dist/ em http://localhost:4173 (com service worker)
```

## Testar

```bash
npm run typecheck
npm run lint
npm test          # Vitest (domínio + componentes)
npm run test:tz   # os mesmos testes com TZ=UTC e TZ=America/Sao_Paulo
npm run e2e       # Playwright: build + preview, inclui o teste offline
npm run check     # typecheck + lint + test:tz + build
```

Para rodar os testes e2e contra outro servidor (por exemplo, o site publicado):

```bash
E2E_BASE_URL=https://seu-site.pages.dev npm run e2e
```

Na primeira vez, instale o navegador do Playwright com `npx playwright install chromium`.

## Editar os dados da viagem

Todos os dados ficam em [`src/data/trip.ts`](src/data/trip.ts): voos, hospedagens, passeios, roteiro e checklist.
Datas e horas vão sempre em ISO 8601 com offset (`2026-11-20T09:00-03:00`).
Os testes de `src/data/trip.test.ts` acusam horário sem offset, id repetido, evento fora do dia certo etc.

Itens ainda a confirmar estão marcados com `// TODO` no arquivo.
**Não coloque** localizadores de reserva, passaporte, telefone ou e-mail: o site é público.

## Imagens, mapa e ícones

Os arquivos gerados ficam versionados. Só rode estes comandos quando mudar a origem:

| Comando | Origem | Gera |
|---|---|---|
| `npm run images` | fotos em `assets-src/` | `src/assets/img/` (AVIF/WebP otimizados) |
| `npm run map` | Natural Earth (pacote `world-atlas`) | `src/features/home/routeMapGeometry.ts` |
| `npm run icons` | `public/favicon.svg` | ícones PWA em `public/` |

## Deploy (Cloudflare Pages)

Recomendado: Cloudflare Pages. É grátis, tem HTTPS e tem servidores em São Paulo e Buenos Aires.

1. No painel da Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** e escolha este repositório.
2. Build command: `npm run build`. Build output directory: `dist`.
3. Salve. Cada push na branch principal publica uma nova versão.

Ou, sem Git: `npx wrangler pages deploy dist --project-name patagonia-2026`.

O que já está configurado:

- **Rotas (SPA):** o Pages devolve o `index.html` para qualquer caminho que não seja um arquivo, porque não existe `404.html`.
  Por isso o [`public/_redirects`](public/_redirects) não tem regras: o Pages rejeita `/* /index.html 200` por considerar um loop infinito.
- **Cache e segurança:** ficam em [`public/_headers`](public/_headers).
  - `index.html`, `sw.js`, o manifest e as rotas usam `no-cache`.
  - `assets/*` e `workbox-*` usam cache imutável de 1 ano.
  - Há uma CSP que só permite recursos do próprio site.
  Se o script de tema inline do `index.html` mudar, atualize o hash `sha256-…` na CSP. O teste e2e "CSP allows the inline theme script" avisa quando isso acontece.
- **Indexação:** o [`public/robots.txt`](public/robots.txt) bloqueia buscadores. O site abre por link, mas não aparece no Google.

## Instalar no celular

Abra o site **uma vez com internet** antes da viagem. Depois disso ele funciona offline.

- **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.
  Instale de verdade: o Safari pode apagar o cache offline e o checklist de sites que ficam 7 dias sem uso, mas não faz isso com apps adicionados à Tela de Início.
- **Android (Chrome):** menu ⋮ → **Instalar app** (ou "Adicionar à tela inicial").

Quando houver versão nova, o app mostra **"Nova versão disponível"**. Ele só atualiza quando você toca em **Atualizar**.
O checklist e o tema ficam salvos no próprio aparelho, e cada pessoa tem o seu.
