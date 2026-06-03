# Layout Global

## Arquitetura do Layout

O layout segue a arquitetura definida em `docs/ARCHITECTURE.md` com a seguinte estrutura no `layout.tsx`:

```
<html>
  <body>
    <Navbar />          ← fixo no topo, glassmorphism ao scroll
    <main>
      {children}        ← conteudo da pagina (page.tsx)
    </main>
    <Footer />          ← fixo no final, links legais e copyright
  </body>
</html>
```

### Fluxo de renderizacao

1. `layout.tsx` (Server Component) carrega fontes, define metadata e viewport
2. `Navbar` (Client Component) renderiza navegacao com estado de scroll
3. `children` recebe o conteudo de `page.tsx` (ou sub-rotas)
4. `Footer` (Server Component) renderiza links institucionais e legais

---

## Estrutura do layout.tsx

| Responsabilidade | Implementacao |
|---|---|
| Fontes locais | `localFont` com `aileron-heavy.woff2`, `century-gothic.woff2`, `century-gothic-bold.woff2` |
| Metadata | `title.default`, `title.template`, `description`, `metadataBase` |
| Viewport | `device-width`, `initial-scale=1`, `themeColor: #0B008A` |
| Icons | `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png` |
| Providers | Nenhum por enquanto (LGPD sera adicionado na Fase 12) |
| Layout | `Navbar` + `<main>` + `Footer` |

### Metadata implementada

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com.br'),
  title: {
    default: '[Nome do Desafio] | [Beneficio Principal] para Mulheres',
    template: '%s | [Nome do Desafio]',
  },
  description: '[Descricao de 150-160 caracteres]',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0B008A',
  width: 'device-width',
  initialScale: 1,
}
```

### Nao implementado nesta fase

Estes itens pertencem a Fase 13 (SEO Final):
- OpenGraph completo
- Twitter Cards
- JSON-LD
- `robots.txt`
- `sitemap.xml`

---

## Navbar

### Objetivo
Navegacao principal fixa no topo com comportamento:
- **Topo**: fundo transparente
- **Ao scroll** (> 50px): glassmorphism com `backdrop-blur-glass` e borda sutil

### Props
Nao possui props externas. Utiliza `siteConfig.name` de `src/lib/constants.ts`.

### Estrutura
```
<header fixed>
  <Container>
    <Logo>                        ← link para #hero
    <nav desktop>                 ← hidden no mobile
      <links>                     ← NAV_LINKS definidos internamente
      <CTAButton size="small">    ← CTA principal
    <button hamburger>            ← visible apenas no mobile
  </Container>
  <mobile menu>                   ← slide down quando hamburger ativo
    <links>
    <CTAButton fullWidth>
```

### NAV_LINKS

| Label | Anchor |
|---|---|
| Home | `#hero` |
| Especialistas | `#especialistas` |
| Cronograma | `#cronograma` |
| Para Quem É | `#para-quem-e` |

Os anchors serao ativados quando as secoes forem criadas (Fase 6 em diante).

### Estado de scroll

```ts
const [scrolled, setScrolled] = useState(false)
// scrollY > 50 → scrolled = true
```

### Mobile menu

- Acionado por hamburger button com `aria-label` e `aria-expanded`
- Fecha ao clicar em qualquer link
- Fecha automaticamente em `resize` para >= 768px
- `body overflow: hidden` quando aberto (impede scroll do fundo)

### Acessibilidade

- `aria-label` no hamburger (alterna entre "Abrir menu" e "Fechar menu")
- `aria-expanded` reflete estado do menu
- `role="navigation"` implicito via `<nav>`
- Touch targets minimos de 48px
- Foco visivel em todos os links e botoes

### Componentes utilizados

- `Container` de `src/components/ui/Container.tsx`
- `CTAButton` de `src/components/ui/CTAButton.tsx` (variant=primary, size=small)
- `siteConfig` de `src/lib/constants.ts`

---

## Footer

### Objetivo
Rodape com identidade visual, links institucionais, links legais e copyright.

### Props
Nao possui props externas. Utiliza `siteConfig.name` de `src/lib/constants.ts`.

### Estrutura
```
<footer>
  <Container>
    <flex row (md) / column (mobile)>
      <Logo>                      ← siteConfig.name
      <nav>
        <Politica de Privacidade> ← link para /politica-de-privacidade
        <Termos de Uso>           ← link para /termos-de-uso
        <Preferencias de Cookies> ← placeholder (LGPD Fase 12)
    <copyright>                   ← ano atual + nome
```

### Copyright

- Usa `new Date().getFullYear()` para ano automatico
- Formato: `© 2026 [Nome do Desafio]. Todos os direitos reservados.`

### Preparacao para LGPD

O item "Preferencias de Cookies" esta presente como placeholder (`text-white/30 cursor-not-allowed`). Na Fase 12 (LGPD), este elemento sera substituido por um link funcional que abre o `CookieModal`.

### Componentes utilizados

- `Container` de `src/components/ui/Container.tsx`
- `siteConfig` de `src/lib/constants.ts`

---

## Decisoes arquiteturais

| Decisao | Justificativa |
|---|---|
| Navbar como `fixed` | Permite transicao de fundo transparente → glassmorphism. `sticky` nao oferece controle fino de background |
| Navbar como Client Component | Necessario `useState` e `useEffect` para scroll e menu mobile |
| Footer como Server Component | Sem interatividade, renderizacao estatica via export |
| `<main>` no layout.tsx | Semantica correta, evita repeticao em cada pagina |
| `body` com `bg-dark-blue text-white` | Cor base do projeto, evita flash de cor errada |
| Metadata em `layout.tsx` | Centralizada, todas as paginas herdam automaticamente |
| Links de navegacao como anchors | Scroll suave via CSS (`scroll-behavior: smooth`), secoes futuras usarao `id` correspondente |
