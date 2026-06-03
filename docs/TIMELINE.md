# Timeline Section — Fase 8

## Arquitetura da Secao

```
TimelineSection
├── Background: bg-gradient-section + glow orbs
├── Container (max-w-7xl)
│   ├── Cabecalho (AnimatedSection fade-up)
│   │   ├── Badge "SUA JORNADA"
│   │   ├── h2 "Como Funciona o Programa"
│   │   └── p (descricao)
│   └── Timeline area (relative, ref for scroll tracking)
│       ├── Animated line (absolute, full height)
│       │   ├── Background track (white/10)
│       │   └── Fill (motion.div com scaleY, gradient sky-blue → neon-green)
│       └── StaggerContainer
│           └── StaggerItem × 4
│               └── TimelineRow
│                   ├── Marker (motion.div with spring scale)
│                   └── GlassCard
│                       ├── Badge (variant="primary", week label)
│                       ├── h3 (title)
│                       └── p (description)
```

## Estrategia de Scroll (Linha Animada)

A linha da timeline e preenchida progressivamente usando `useScroll` + `useTransform` do Framer Motion, sem solucoes fake:

```typescript
const itemsRef = useRef<HTMLDivElement>(null)

const { scrollYProgress } = useScroll({
  target: itemsRef,
  offset: ['start end', 'end start'],
})

const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
```

**Comportamento:**
- `offset: ['start end', 'end start']` — o progresso vai de 0 (topo da timeline no fim do viewport) a 1 (fim da timeline no topo do viewport)
- `[0.1, 0.9]` → `[0, 1]` — mapeia 10%-90% do scroll para 0%-100% do preenchimento, garantindo que a linha comeca a preencher quando a secao entra e completa antes de sair
- `scaleY` com `transformOrigin: 'top'` — a linha cresce de cima para baixo

## Estrutura dos Dados

Definida em `src/lib/constants.ts`:

```typescript
interface TimelineItem {
  id: string
  week: string
  title: string
  description: string
}
```

4 etapas (12 semanas):
1. **Semanas 1-2** — Avaliacao e Fundacao
2. **Semanas 3-6** — Transformacao Ativa
3. **Semanas 7-10** — Consolidacao de Habitos
4. **Semanas 11-12** — Resultado e Mantencao

## Responsividade

| Breakpoint | Layout | Linha | Marker |
|------------|--------|-------|--------|
| Mobile (<768px) | `flex-row` (24px marker col + card) | `left-[12px]` (alinhada ao centro do marker) | `w-[24px]` column |
| Desktop (≥768px) | `grid-cols-[1fr_auto_1fr]` alternado | `left-1/2 -translate-x-px` (centro da tela) | Center column |

### Desktop Alternado
- **Even (0, 2):** card na coluna 1 (esquerda), marker na coluna 2 (centro), vazio na coluna 3
- **Odd (1, 3):** vazio na coluna 1, marker na coluna 2 (centro), card na coluna 3 (direita)

## Animacoes Utilizadas

| Elemento | Componente | Variante | Detalhes |
|----------|-----------|----------|----------|
| Cabecalho | `AnimatedSection` | `fade-up` delay 0.1s | Entrada suave do topo da secao |
| Lista de itens | `StaggerContainer` | `staggerChildren: 0.1` | Parent com stagger |
| Cada item | `StaggerItem` | `fade-up` + stagger delay | Opacity 0→1, Y 30→0 |
| Marcador | `motion.div` inline | `spring scale` | `stiffness: 300, damping: 15` |
| Linha | `motion.div` + `useScroll` | `scaleY` | Preenchimento progressivo |

### Marcadores
Cada marcador possui:
- Animacao de escala spring ao entrar no viewport (`initial: scale: 0` → `whileInView: scale: 1`)
- Glow suave via `shadow-lg shadow-sky-blue/30`
- `ring-4 ring-dark-blue` para destaque sobre o fundo escuro
- `relative z-10` para sobrepor a linha

## Decisoes de Performance

| Decisao | Justificativa |
|---------|---------------|
| `useScroll` com ref local | Observa apenas o container da timeline, nao o documento inteiro |
| `once: true` no StaggerContainer | Anima apenas na primeira passagem, sem re-animacao |
| `viewport: { once: true }` | Mesma logica — evita work repetido |
| `scaleY` em vez de animar `height` | GPU-acelerado (compositor), sem reflow |
| SVG placeholders | ~500 bytes cada, zero impacto |
| 3 glow orbs no maximo | Renderizacao leve, `blur` GPU nativo |
| Sem imagens na timeline | Zero CLS, zero fetching |

## Decisoes de Acessibilidade

| Criterio | Implementacao |
|----------|---------------|
| Heading hierarchy | `h2` na secao, `h3` no titulo de cada etapa |
| Badges semanticos | `<span>` com classe `label-text` |
| Contraste WCAG AA | `text-white/90` + overlay de contraste via gradient-section |
| Navegacao por teclado | Cards sao conteudo estatico (GlassCard div), sem barreiras |
| Cor nao unica fonte | Linha tem cor + altura (scaleY), marcadores tem cor + tamanho + anel |
| `prefers-reduced-motion` | `useReducedMotion` tratado pelo AnimatedSection e StaggerContainer |
| Foco visivel | Navegacao por teclado preservada (GlassCard sem elementos focaveis internos — apenas conteudo informacional) |
