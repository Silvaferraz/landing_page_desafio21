# For Who Section — Fase 9

## Arquitetura da Secao

```
ForWhoSection
├── Background: bg-gradient-section + glow orbs
├── Container (max-w-7xl)
│   ├── Cabecalho (AnimatedSection fade-up)
│   │   ├── Badge "PARA QUEM E"
│   │   ├── h2 "Este Desafio e para Voce"
│   │   └── p (descricao)
│   └── Grid (md:grid-cols-2)
│       ├── Coluna da Imagem (AnimatedSection fade-left)
│       │   └── next/image (aspect-[5/6], glow atras)
│       └── Coluna dos Cards (StaggerContainer)
│           └── StaggerItem × 4
│               └── ForWhoCard (GlassCard)
│                   ├── Indicador numerico (gradient circle)
│                   ├── h3 (title)
│                   └── p (description)
```

## Decisoes Visuais

### Indicador Numerico
Cada card possui um circulo gradiente `from-sky-blue to-deep-blue` com numero de 01 a 04:

```tsx
<div className="flex h-12 w-12 shrink-0 items-center justify-center 
  rounded-full bg-gradient-to-br from-sky-blue to-deep-blue 
  font-aileron font-black text-lg text-white 
  shadow-lg shadow-sky-blue/30">
  {String(index + 1).padStart(2, '0')}
</div>
```

**Motivacao:** Numeracao progressiva transmite ordem logica e e mais acessivel que icons SVG (leitores de tela interpretam numeros naturalmente). O gradiente e a sombra mantem a estetica premium.

### Layout Grid
- **Mobile:** coluna unica, imagem no topo seguida pelos cards
- **Desktop:** `md:grid-cols-2` — imagem a esquerda (AnimatedSection fade-left), cards a direita (StaggerContainer)

### Aspect Ratio da Imagem
`aspect-[5/6]` — mais larga que `3/4` e mais alta que `4/3`. Proporcao elegante que funciona bem para a imagem de audiencia feminina.

## Animacoes Utilizadas

| Elemento | Componente | Variante | Delay |
|----------|-----------|----------|-------|
| Cabecalho | `AnimatedSection` | `fade-up` | 0.1s |
| Imagem | `AnimatedSection` | `fade-left` | 0.2s |
| Lista de cards | `StaggerContainer` | `staggerChildren: 0.1` | `delayChildren: 0.2` |
| Cada card | `StaggerItem` | `fade-up` (opacity + Y) | Stagger autom. |

### Fluxo de Entrada
1. Cabecalho aparece (fade-up)
2. Imagem desliza da esquerda (fade-left)
3. Cards entram em sequencia com stagger (fade-up)

## Acessibilidade

| Criterio | Implementacao |
|----------|---------------|
| Heading hierarchy | `h2` na secao, `h3` em cada card |
| Indicadores semanticos | Numeros naturais (01-04), interpretados por leitores de tela sem ARIA adicional |
| Alt text na imagem | `alt="Mulheres que o desafio atende"` |
| Contraste WCAG AA | `text-white/90` sobre gradient-section + GlassCard com `bg-white/[0.07]` |
| Toque/target | GlassCard tem `p-6 md:p-8` — areas amplas, sem targets muito pequenos |
| Navegacao por teclado | Cards sem elementos focaveis internos (apenas conteudo informacional) |

## Performance

| Decisao | Justificativa |
|---------|---------------|
| `next/image` com lazy (padrao) | Secao abaixo da dobra — nao precisa de `priority` |
| `sizes="(max-width: 768px) 100vw, 50vw"` | Otimiza fetching da imagem |
| SVG placeholder (~500 bytes) | Carregamento instantaneo, sem impacto |
| `once: true` no StaggerContainer | Anima apenas na primeira passagem |
| Sem dependencias de icones externos | Numeros CSS substituem bibliotecas de icones |
| CLS = 0 | `aspect-[5/6]` + `fill` garantem dimensoes fixas |
