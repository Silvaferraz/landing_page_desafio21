# Animation System

## Arquitetura

O sistema de animacoes utiliza **Framer Motion** como biblioteca oficial e segue uma arquitetura de tres camadas:

```
src/lib/animations.ts          → Variantes centralizadas e reutilizaveis
src/components/ui/AnimatedSection.tsx  → Animacao individual por scroll
src/components/ui/StaggerContainer.tsx → Container com stagger para listas
src/components/ui/StaggerItem.tsx      → Item animado dentro de StaggerContainer
```

### Fluxo de dados

1. `src/lib/animations.ts` define todas as variantes de animacao (fade-up, fade-left, etc.)
2. `AnimatedSection` consome as variantes e aplica animacao ao entrar no viewport
3. `StaggerContainer` define o container que gerencia o stagger
4. `StaggerItem` consome as variantes individuais dentro do stagger

### Regras de easing

Todas as animacoes usam o easing customizado: `[0.16, 1, 0.3, 1]` (cubic-bezier suave).

---

## Componentes

### AnimatedSection

Wrapper que anima o conteudo ao entrar no viewport.

#### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `children` | `React.ReactNode` | obrigatorio | Conteudo a ser animado |
| `className` | `string` | `''` | Classes adicionais |
| `variant` | `AnimationVariant` | `'fade-up'` | Tipo de animacao |
| `delay` | `number` | `0` | Delay em segundos antes da animacao |
| `duration` | `number` | `undefined` | Duracao customizada (usa o default da variante se omitido) |
| `threshold` | `number` | `0.1` | Porcentagem do elemento visivel para disparar (0-1) |
| `once` | `boolean` | `true` | Se true, anima apenas uma vez |

#### Exemplos

```tsx
<AnimatedSection variant="fade-up">
  <h2>Conteudo animado subindo</h2>
</AnimatedSection>

<AnimatedSection variant="fade-left" delay={0.3} threshold={0.2}>
  <GlassCard>Card com entrada pela esquerda</GlassCard>
</AnimatedSection>

<AnimatedSection variant="fade-scale" once={false}>
  <p>Anima repetidamente ao scrollar</p>
</AnimatedSection>
```

---

### StaggerContainer

Container que controla a animacao em cadeia (stagger) de seus filhos `StaggerItem`.

#### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `children` | `React.ReactNode` | obrigatorio | Deve conter `StaggerItem`(s) |
| `className` | `string` | `''` | Classes adicionais |
| `staggerDelay` | `number` | `0.1` | Delay entre cada item (segundos) |
| `delayChildren` | `number` | `0.2` | Delay antes do primeiro item |
| `once` | `boolean` | `true` | Se true, anima apenas uma vez |

#### Exemplos

```tsx
<StaggerContainer staggerDelay={0.15}>
  <StaggerItem variant="fade-up">
    <p>Item 1</p>
  </StaggerItem>
  <StaggerItem variant="fade-up">
    <p>Item 2</p>
  </StaggerItem>
  <StaggerItem variant="fade-up">
    <p>Item 3</p>
  </StaggerItem>
</StaggerContainer>
```

---

### StaggerItem

Item filho dentro de `StaggerContainer`. Cada item herda o stagger do container e aplica sua propria variante.

#### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `children` | `React.ReactNode` | obrigatorio | Conteudo do item |
| `className` | `string` | `''` | Classes adicionais |
| `variant` | `AnimationVariant` | `'fade-up'` | Tipo de animacao individual |

#### Exemplos

```tsx
<StaggerItem variant="fade-right">
  <GlassCard>Card animado da direita</GlassCard>
</StaggerItem>
```

---

## Variantes

### fade-up
```ts
hidden: { opacity: 0, y: 40 }
visible: { opacity: 1, y: 0 }
```
Entrada suave de baixo para cima. Uso padrao para secoes e cards.

### fade-left
```ts
hidden: { opacity: 0, x: -40 }
visible: { opacity: 1, x: 0 }
```
Entrada da esquerda para a direita. Ideal para imagens ou cards do lado esquerdo.

### fade-right
```ts
hidden: { opacity: 0, x: 40 }
visible: { opacity: 1, x: 0 }
```
Entrada da direita para a esquerda. Ideal para imagens ou cards do lado direito.

### fade-scale
```ts
hidden: { opacity: 0, scale: 0.9 }
visible: { opacity: 1, scale: 1 }
```
Entrada com escala. Para destaque visual ou CTAs secundarios.

### fade-in
```ts
hidden: { opacity: 0 }
visible: { opacity: 1 }
```
Apenas opacidade. Para elementos que nao devem se mover.

---

## Performance

### Boas praticas

- **Usar `transform` e `opacity`**: Todas as variantes usam apenas `opacity`, `y`, `x` e `scale` — propriedades que a GPU acelera.
- **Evitar layout shift**: Nenhuma variante modifica `width`, `height`, `margin` ou `padding` durante a animacao.
- **LCP seguro**: Elementos acima do fold (hero) devem ter `once={true}` e nao devem depender de animacao para exibicao inicial.
- **`will-change`**: O Framer Motion gerencia automaticamente `will-change: transform` e `will-change: opacity` durante as animacoes.

### Prefers Reduced Motion

Todos os componentes respeitam `prefers-reduced-motion: reduce`:

- `useReducedMotion()` do Framer Motion detecta a preferencia do usuario
- Quando ativo, as animacoes sao desabilitadas (opacidade 1 fixa)
- O conteudo permanece visivel sem animacao

### Viewport detection

- `whileInView` com `viewport={{ once: true, amount: 0.1 }}` garante que a animacao dispare apenas quando o elemento esta visivel
- `once: true` evita re-animacoes ao scrollar para cima/baixo, reduzindo trabalho da GPU
- `threshold` customizavel via prop permite controle fino de quando a animacao inicia

---

## Integracao com Framer Motion

O sistema usa exclusivamente APIs do Framer Motion:

| API | Uso |
|-----|-----|
| `motion.div` | Componente animado base |
| `variants` | Objeto com estados `hidden` e `visible` |
| `initial` | Estado inicial da animacao |
| `whileInView` | Dispara animacao quando elemento entra no viewport |
| `viewport` | Configuracao de viewport (once, amount) |
| `useReducedMotion` | Deteccao de preferencia do usuario |
| `staggerChildren` | Delay incremental entre elementos filhos |

Nao ha dependencia de `react-intersection-observer` — o Framer Motion gerencia o Intersection Observer internamente.

---

## Casos de uso previstos

| Secao | Componente | Variante |
|-------|-----------|----------|
| HeroSection | `AnimatedSection` | `fade-up` (elementos individuais) |
| SpecialistsSection | `StaggerContainer` + `StaggerItem` | `fade-up` com stagger |
| TimelineSection | `AnimatedSection` | `fade-left` / `fade-right` (alternado) |
| ForWhoSection | `StaggerContainer` + `StaggerItem` | `fade-up` com stagger |
| CTASection | `AnimatedSection` | `fade-scale` |

Estes casos serao implementados em suas respectivas fases (Fase 6 a Fase 10).
