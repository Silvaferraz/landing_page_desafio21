# Specialists Section — Fase 7

## Arquitetura da Secao

```
SpecialistsSection
├── Background: bg-gradient-section + glow orbs
├── Container (max-w-7xl)
│   ├── Cabecalho (AnimatedSection fade-up)
│   │   ├── Badge "NOSSO TIME" (variant="accent")
│   │   ├── h2 "Especialistas que Cuidam de Voce"
│   │   └── p (descricao)
│   └── Lista de cards (max-w-4xl centralizado)
│       └── SpecialistCard (repetido para cada especialista)
│           ├── GlassCard (glass + rounded-2xl)
│           ├── Imagem (next/image, aspect-[4/5])
│           ├── Badges de credibilidade (variant="primary")
│           ├── h3 (nome)
│           ├── label-text (especialidade)
│           ├── body-text (mini bio)
│           └── Link Instagram (icone + texto)
```

## Layout Alternado

| Card | Mobile | Desktop |
|------|--------|---------|
| 1 (Dra. Ana Silva) | `flex-col` (imagem > conteudo) | `md:flex-row` (imagem esquerda, conteudo direita) |
| 2 (Dra. Beatriz Santos) | `flex-col` | `md:flex-row-reverse` (imagem direita, conteudo esquerda) |
| 3 (Dra. Carla Oliveira) | `flex-col` | `md:flex-row` (imagem esquerda, conteudo direita) |

- Alternancia baseada em `index % 2 === 0`
- `max-w-4xl` centralizado para leitura confortavel em telas largas

## Dados

Os dados dos especialistas estao em `src/lib/constants.ts` com a interface `Specialist`:

```typescript
interface Specialist {
  id: string
  name: string
  specialty: string
  bio: string
  image: string
  instagram: string
  badges: string[]
}
```

3 especialistas placeholder (nutricionista, endocrinologista, psicologa).
Substituir por dados reais quando fornecidos.

## Animacoes (Fase 4)

| Elemento | Variante | Delay |
|----------|----------|-------|
| Cabecalho da secao | `fade-up` | 0.1s |
| Card 1 | `fade-up` | 0.15s |
| Card 2 | `fade-up` | 0.30s |
| Card 3 | `fade-up` | 0.45s |

- Todas usam `AnimatedSection` com `once: true` (padrao)
- Easing `[0.16, 1, 0.3, 1]` (padrao do sistema)
- `useReducedMotion` respeitado (AnimatedSection trata internamente)

## Acessibilidade

| Criterio | Implementacao |
|----------|---------------|
| Heading hierarchy | `h2` na secao, `h3` no nome de cada especialista |
| Alt text | `alt="Foto da {nome} — {especialidade}"` |
| Instagram link | `aria-label="Instagram da {nome}"` |
| Focus visivel | `focus-visible:ring-2 focus-visible:ring-neon-green` no link |
| Contraste WCAG AA | `text-white/90` no body-text (valor calibrado para gradient-section) |
| Touch targets | Links com `inline-flex` + `gap-2` garantem area >= 48px |

## Decisoes de Performance

| Decisao | Justificativa |
|---------|---------------|
| `next/image` com `fill` | CLS zero, dimensoes controladas por `aspect-[4/5]` |
| `sizes="(max-width: 768px) 100vw, 260px"` | Otimiza fetching — imagem cheia em mobile, 260px em desktop |
| Sem `priority` | Secao abaixo da dobra — `loading="lazy"` (padrao do next/image) |
| SVG placeholder | ~500 bytes, carregamento instantaneo |
| `max-w-4xl` nos cards | Evita linhas de texto muito longas, melhora legibilidade sem sacrificar performance |
| GlassCard sem `backdrop-filter` excessivo | Apenas 3 cards com glass — sem impacto mensuravel |

## Consistencia Visual com a Hero

- Mesmo `Container` (max-w-7xl) e padding responsivo
- `bg-gradient-section` como complemento ao `bg-gradient-hero`
- Glow orbs nas mesmas cores (sky-blue, deep-blue) com blur identico
- `heading-2` para titulo da secao (mesma familia que `heading-1` da hero)
- `label-text` e `body-text` consistentes
- Badge com `variant="accent"` para o label "NOSSO TIME" (mesmo estilo de "VAGAS LIMITADAS")
