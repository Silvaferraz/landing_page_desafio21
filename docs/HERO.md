# Hero Section — Fase 6

## Estrutura (5 camadas visuais)

| Camada | Elemento | Descricao |
|--------|----------|-----------|
| 1 | Background gradient | `bg-gradient-hero` preenche toda a section |
| 2 | Texto decorativo gigante | `SAÚDE` em `font-aileron font-black` com `opacity-[0.03]` |
| 3 | Glow orbs | Circulos com `blur-[120px]` em `bg-sky-blue` e `bg-deep-blue` |
| 4 | Conteudo principal | Badge, H1, descricao, CTAs, prova social |
| 5 | Imagem hero | `next/image` com glow radial atras |

## Layout

- **Mobile**: coluna unica (conteudo > imagem), `pt-24` para compensar navbar fixa
- **Tablet/Desktop**: grid `md:grid-cols-2`, conteudo a esquerda, imagem a direita
- **Ultra-wide**: `max-w-7xl` do Container limita a largura

## Performance

- `next/image` com `priority` e `sizes` definido para LCP otimizado
- `aspect-[3/4]` com `fill` para evitar CLS
- `unoptimized: true` mantido (projeto usa `output: 'export'`)

## Animacoes

Todas as entradas usam `AnimatedSection` com `variant="fade-up"` e delays escalonados:
- Badge: 0.1s
- H1: 0.2s
- Paragrafo: 0.3s
- CTAs: 0.4s
- Prova social: 0.5s
- Imagem: `variant="fade-right"` delay 0.3s

## Acessibilidade

- `<h1>` semantico como primeiro heading da pagina
- `alt` text descritivo na imagem
- Touch targets >= 48px (via classe `.touch-target` do CTAButton)
- Navegacao por teclado preservada (links nativos `<a>`)

## Placeholders

- `public/images/hero-person.svg` — placeholder visual ate o asset final `.webp`
- Substituir por `hero-person.webp` quando disponivel (atualizar src em HeroSection.tsx)

## Dependencias

- Navbar ancora `#hero` — section usa `id="hero"`
- Container, CTAButton, Badge, AnimatedSection — todos existentes
