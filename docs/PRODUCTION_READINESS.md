# Produção — Varredura Final

**Data:** 2026-06-03
**Build:** ✅ `tsc --noEmit`, `next lint`, `next build` — todos limpos

---

## Status Geral

| Categoria               | Preparado | Notas |
|-------------------------|-----------|-------|
| Build                   | ✅        | Static export, 6 páginas, 87 kB shared JS |
| TypeScript              | ✅        | strict mode, zero errors |
| ESLint                  | ✅        | zero warnings |
| Analytics               | ⚠️ Parcial | Estrutura pronta, placeholders pendentes |
| LGPD                    | ✅        | Consentimento granular, revogação funcional |
| SEO (metadata)          | ✅        | OG, Twitter, JSON-LD, canonical, robots, sitemap |
| Acessibilidade          | ✅        | Skip-link, focus trap, aria-hidden, heading hierarchy |
| Performance             | ✅        | LCP prioritized, CLS ~0, ScrollTracker throttled |
| Segurança (código)      | ✅        | .env ignorado, source maps off, .gitignore completo |
| Segurança (servidor)    | ❌        | CSP, headers HTTP pendentes (config servidor) |

---

## O que foi corrigido nesta rodada

### Código

| Item | O quê | Arquivo |
|------|-------|---------|
| S1   | `.env` adicionado ao `.gitignore` | `.gitignore` |
| F1   | Padrões de backup adicionados ao `.gitignore` | `.gitignore` |
| B2   | `productionBrowserSourceMaps: false` explícito | `next.config.mjs` |

### Dependências

| Pacote   | Versão   | Situação |
|----------|----------|----------|
| postcss  | 8.5.15   | Acima do threshold vulnerável (<8.5.10). A advisory do Next.js é sobre postcss interno do pacote `next` — requer upgrade breaking para 16.x. **Aceito** para static export. |
| next     | 14.2.35  | 1 advisory HIGH (DoS Image Opt) — **mitigado** por `output: 'export'` + `images.unoptimized: true`. |

---

## Pendências para Produção

### 🔴 Bloqueantes (impedem o lançamento)

| # | Item | Severidade | O quê fazer |
|---|------|------------|-------------|
| 1 | **WhatsApp link** | 🔴 | Substituir `ctaConfig.whatsappLink = '#'` por link real com UTMs em `src/lib/constants.ts:75` |
| 2 | **Nome do projeto** | 🔴 | Substituir `[Nome do Desafio]` pelo nome real em `src/lib/constants.ts:79` |
| 3 | **Domínio real** | 🔴 | Substituir `https://example.com.br` em `src/app/layout.tsx` e `src/lib/constants.ts` |
| 4 | **OG Image** | 🔴 | Criar `/public/og-image.jpg` (1200×630px, <100KB) |
| 5 | **IDs Analytics** | 🔴 | Substituir `GTM-XXXXXXX` e `1234567890` por IDs reais |

### 🟡 Importantes (recomendado antes do lançamento)

| # | Item | Severidade | O quê fazer |
|---|------|------------|-------------|
| 6 | **Páginas LGPD** | 🟡 | Criar `/politica-de-privacidade` e `/termos-de-uso` (links no Footer) |
| 7 | **Telefone JSON-LD** | 🟡 | Substituir `+55XXXXXXXXXXX` pelo telefone real em `src/app/layout.tsx` |
| 8 | **CSP Header** | 🟡 | Configurar Content-Security-Policy no servidor de hospedagem |
| 9 | **X-Frame-Options** | 🟡 | Adicionar `X-Frame-Options: DENY` ou `frame-ancestors 'none'` no servidor |
| 10 | **Referrer-Policy** | 🟡 | Adicionar `Referrer-Policy: strict-origin-when-cross-origin` no servidor |
| 11 | **CookieBanner privacy link** | 🟡 | Substituir `href="#"` pela URL real da política de privacidade |
| 12 | **Instagram links** | 🟡 | Substituir `https://instagram.com/` pelos perfis reais das especialistas |

### 🟢 Melhorias (pós-lançamento)

| # | Item | Severidade | O quê fazer |
|---|------|------------|-------------|
| 13 | Favicons | 🟢 | Substituir `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png` pelos ícones reais |
| 14 | Font fallback | 🟢 | Avaliar fallback fonts mais próximas visualmente |
| 15 | Sitemap submission | 🟢 | Submeter `sitemap.xml` no Google Search Console |
| 16 | Rich results test | 🟢 | Validar JSON-LD em search.google.com/test/rich-results |
| 17 | OpenGraph preview | 🟢 | Verificar preview em opengraph.xyz |
| 18 | Twitter Card preview | 🟢 | Verificar em cards-dev.twitter.com/validator |
| 19 | Favicon real | 🟢 | Atualizar favicon com ícone da marca |

---

## Checklist de Deploy

```diff
 ANTES DE FAZER O BUILD DE PRODUÇÃO:

 [ ] Substituir domínio: example.com.br → dominio real
 [ ] Substituir nome: [Nome do Desafio] → nome real
 [ ] Substituir WhatsApp: ctaConfig.whatsappLink → link real com UTMs
 [ ] Substituir GTM ID: GTM-XXXXXXX → ID real
 [ ] Substituir Pixel ID: 1234567890 → ID real
 [ ] Substituir telefone: +55XXXXXXXXXXX → telefone real
 [ ] Substituir Instagram das especialistas
 [ ] Adicionar /public/og-image.jpg
 [ ] Adicionar /politica-de-privacidade/page.tsx
 [ ] Adicionar /termos-de-uso/page.tsx
 [ ] Atualizar href do link de privacidade no CookieBanner
 + Confirmar que public/favicon* estão atualizados
 + Rodar: npm run build

 APÓS O DEPLOY:

 [ ] Configurar CSP no servidor
 [ ] Configurar X-Frame-Options: DENY
 [ ] Configurar Referrer-Policy
 [ ] Configurar X-Content-Type-Options: nosniff
 [ ] Configurar redirect HTTP → HTTPS
 [ ] Submeter sitemap.xml no Google Search Console
 [ ] Testar preview OG em opengraph.xyz
 [ ] Testar rich results em search.google.com
```

---

## Build Final

```
Route (app)                              Size     First Load JS
┌ ○ /                                    48.4 kB         136 kB
├ ○ /_not-found                          873 B          88.3 kB
├ ○ /robots.txt                          0 B                0 B
└ ○ /sitemap.xml                         0 B                0 B
+ First Load JS shared by all            87.4 kB

Output: static export (out/)
```

---

## Arquivos Modificados nesta Rodada

| Arquivo | Mudança |
|---------|---------|
| `.gitignore` | Adicionado `.env`, `*.bak`, `*.tmp`, `*~`, `public/**/*.bak`, `public/**/*.tmp` |
| `next.config.mjs` | Adicionado `productionBrowserSourceMaps: false` |

---

## Resumo Geral do Projeto

| Métrica | Valor |
|---------|-------|
| Fases implementadas | 14 de 15 |
| Componentes | 17 (5 sections, 2 layout, 6 ui, 3 analytics, 3 lgpd, 1 context) |
| Arquivos de código | ~40 |
| Documentação | 8 arquivos (ARCHITECTURE, DESIGN_SYSTEM, IMPLEMENTATION_PLAN, LGPD, SEO, FINAL_AUDIT, SECURITY_AUDIT + este) |
| Build size | 87.4 kB shared JS, 48.4 kB página inicial |
| TypeScript | strict mode, zero errors |
| ESLint | zero warnings |
| LGPD consent | Granular (necessary/analytics/marketing) |
| SEO | OG, Twitter, JSON-LD, canonical, robots, sitemap |
| Acessibilidade | Skip-link, focus trap, ARIA, heading hierarchy |
| Performance | CLS ~0, LCP prioritized, ScrollTracker throttled |
| Segurança | Source maps off, .env gitignored, sem segredos expostos |
