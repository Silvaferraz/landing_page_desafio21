# SEO — Estrategia de Otimizacao para Mecanismos de Busca

## Estrategia

A landing page segue praticas recomendadas de SEO On-Page para maximizar a indexacao e o compartilhamento social, utilizando exclusivamente recursos nativos do Next.js 14 App Router — sem dependencias extras.

### Pilares

1. **Metadata API** — titulo, descricao, keywords, autores servidos via `layout.tsx`
2. **OpenGraph** — compartilhamento rico em Facebook, LinkedIn, Telegram, WhatsApp
3. **Twitter Cards** — cards otimizados para X/Twitter com `summary_large_image`
4. **Canonical URL** — prevencao de conteudo duplicado
5. **Structured Data (JSON-LD)** — rich snippets para Organization, WebSite, LocalBusiness
6. **Sitemap XML** — indexacao completa de URLs
7. **Robots TXT** — controle de rastreamento

---

## Metadata

### Layout Global (`src/app/layout.tsx`)

```ts
title: {
  default: 'Desafio Saude Feminina | Transforme Sua Saude em 12 Semanas',
  template: '%s | Desafio Saude Feminina',
},
description:
  'Transforme sua saude com acompanhamento especializado. Programa intensivo de 12 semanas para mulheres que desejam recuperar o controle da saude com resultados reais.',
keywords: [
  'saude feminina',
  'emagrecimento saudavel',
  'equilibrio hormonal',
  'programa de saude para mulheres',
],
```

| Propriedade   | Valor                          |
|---------------|--------------------------------|
| `title`       | `Desafio Saude Feminina \| Transforme Sua Saude em 12 Semanas` |
| `description` | ~157 caracteres, com keywords  |
| `keywords`    | 6 termos focados em saude feminina |
| `authors`     | Nome do projeto                |
| `creator`     | Nome do projeto                |
| `publisher`   | Nome do projeto                |

---

## OpenGraph

```ts
openGraph: {
  title: 'Desafio Saude Feminina',
  description: 'Transforme sua saude com acompanhamento especializado...',
  url: 'https://example.com.br',
  siteName: 'Desafio Saude Feminina',
  images: [{ url: 'https://example.com.br/og-image.jpg', width: 1200, height: 630 }],
  locale: 'pt_BR',
  type: 'website',
},
```

### Preview compartilhamento

| Plataforma   | Visualiza                         |
|--------------|-----------------------------------|
| WhatsApp     | Titulo + descricao + imagem 1.91:1 |
| Facebook     | Card rico com og:image            |
| LinkedIn     | Titulo + descricao + imagem       |
| Telegram     | Preview com imagem e descricao    |

---

## Twitter Cards

```ts
twitter: {
  card: 'summary_large_image',
  title: 'Desafio Saude Feminina',
  description: 'Transforme sua saude com acompanhamento especializado...',
  images: ['https://example.com.br/og-image.jpg'],
},
```

---

## Canonical

```ts
alternates: {
  canonical: 'https://example.com.br',
}
```

A URL canonica e definida no layout global para evitar duplicidade de indexacao.

---

## JSON-LD

Tres entidades no grafo unico, injetadas via `<script type="application/ld+json">` no `layout.tsx`:

### Organization

```json
{
  "@type": "Organization",
  "@id": "https://example.com.br/#organization",
  "name": "Desafio Saude Feminina",
  "url": "https://example.com.br",
  "logo": "https://example.com.br/favicon.svg"
}
```

### WebSite

```json
{
  "@type": "WebSite",
  "@id": "https://example.com.br/#website",
  "url": "https://example.com.br",
  "name": "Desafio Saude Feminina",
  "publisher": { "@id": "https://example.com.br/#organization" }
}
```

### LocalBusiness

```json
{
  "@type": "LocalBusiness",
  "@id": "https://example.com.br/#localbusiness",
  "name": "Desafio Saude Feminina",
  "url": "https://example.com.br",
  "telephone": "+55XXXXXXXXXXX",
  "address": { "addressLocality": "Brasil", "addressCountry": "BR" },
  "priceRange": "$$"
}
```

### Validador

Testar em: https://search.google.com/test/rich-results

---

## Sitemap

Gerado estaticamente via `src/app/sitemap.ts`.

| URL                                      | Prioridade | Frequencia |
|------------------------------------------|------------|------------|
| `https://example.com.br`                 | 1.0        | monthly    |
| `https://example.com.br/politica-de-privacidade` | 0.3 | yearly     |
| `https://example.com.br/termos-de-uso`   | 0.3        | yearly     |

---

## Robots

Gerado estaticamente via `src/app/robots.ts`.

```txt
User-agent: *
Allow: /
Disallow: /_next/
Disallow: /api/

Sitemap: https://example.com.br/sitemap.xml
```

---

## Performance SEO

- Toda metadata e **server-side** — nao ha JavaScript do cliente para gerar tags.
- Nenhuma dependencia extra foi adicionada (`next-seo`, `next-sitemap`, etc.).
- `robots.ts` e `sitemap.ts` sao compilados para arquivos estaticos no build.
- JSON-LD e injetado como HTML estatico, sem hidratacao no cliente.
- Compativel com `output: 'export'` do Next.js.

---

## Tarefas para Producao

- [ ] Substituir `https://example.com.br` pelo dominio real
- [ ] Criar `/public/og-image.jpg` (1200x630px, formato JPEG, <100KB)
- [ ] Substituir `+55XXXXXXXXXXX` pelo telefone real
- [ ] Criar paginas `/politica-de-privacidade` e `/termos-de-uso`
- [ ] Atualizar `favicon.svg` com o icone real da marca
- [ ] Atualizar `apple-touch-icon.png` com o icone real
- [ ] Testar rich results no Google Search Console
- [ ] Submeter sitemap no Google Search Console
- [ ] Verificar OpenGraph preview em https://opengraph.xyz
- [ ] Verificar Twitter Card preview em https://cards-dev.twitter.com/validator
