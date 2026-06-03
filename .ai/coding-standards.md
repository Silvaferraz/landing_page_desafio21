# Coding Standards

## TypeScript e React
- Usar tipagem explicita em props e utilitarios publicos.
- Separar componentes client quando necessario ("use client").
- Evitar logica complexa dentro de JSX.

## Next.js
- Usar Metadata API em `layout.tsx`.
- Usar `next/image` com width e height definidos.
- `output: export` e `trailingSlash: true` como padrao.

## Tailwind
- Mobile-first como default.
- Preferir classes utilitarias e variaveis CSS para cores.
- Usar classes `glass` e `glass-light` para glassmorphism.

## Animacoes
- Framer Motion para animacoes de entrada e scroll.
- Evitar animacoes longas ou repetitivas que impactem performance.

## Acessibilidade
- Alt text sempre presente em imagens.
- Touch targets minimos de 48px.
- Inputs com fonte >= 16px.
