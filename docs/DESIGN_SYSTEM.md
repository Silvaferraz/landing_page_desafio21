# Design System - Landing Page Desafio Feminino de Saude

## Cores
| Token        | Valor              | Uso                                    |
|--------------|--------------------|----------------------------------------|
| deep-blue    | `#0B008A`          | Backgrounds, gradientes                |
| dark-blue    | `#06004A`          | Background principal, header           |
| neon-green   | `#99FF00`          | CTAs, destaques, foco                  |
| sky-blue     | `#67AFFF`          | Detalhes, labels, glow orbs            |
| glass-white  | `rgba(255,255,255,0.07)` | Glassmorphism BG              |

### Gradientes
- `gradient-hero`: `linear-gradient(180deg, rgba(11,0,138,0.92), rgba(103,175,255,0.75))`
- `gradient-section`: `linear-gradient(180deg, #0B008A, #2a1aaa, #67AFFF)`
- `gradient-cta`: `linear-gradient(135deg, #99FF00, #7acc00)`

### Acessibilidade de contraste
- `text-white` sobre `bg-dark-blue` — contraste ~15:1 (AAA)
- `text-neon-green` sobre `bg-dark-blue` — contraste ~7:1 (AA)
- `text-white/80` sobre `bg-gradient-hero` — pode falhar AA em areas claras do gradiente; mitigado com overlay de contraste via `bg-gradient-to-b from-transparent via-dark-blue/[0.12] to-dark-blue/[0.22]` no HeroSection

## Tipografia

### Fontes
- **Aileron Heavy** (`800`): titulos H1, H2, nome da marca
- **Century Gothic** (`400`, `700`): subtitulos H3, H4, corpo, labels

### Fallback stack
- `--font-aileron` → `Arial Black` → `sans-serif`
- `--font-century` → `Trebuchet MS` → `sans-serif`

### Classes utilitarias
| Classe        | Font       | Weight | Tamanho (clamp)                          |
|---------------|------------|--------|------------------------------------------|
| `.heading-1`  | aileron    | 900    | `clamp(32px, 6vw, 72px)`                |
| `.heading-2`  | aileron    | 900    | `clamp(28px, 5vw, 56px)`                |
| `.heading-3`  | century    | 700    | `clamp(22px, 3vw, 40px)`                |
| `.heading-4`  | century    | 700    | `clamp(18px, 2.5vw, 28px)`              |
| `.body-text`  | century    | 400    | `text-base md:text-lg`                  |
| `.label-text` | century    | 700    | `text-sm uppercase tracking-widest`     |

## Espacamentos
- Padding responsivo do Container: `px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24`
- Touch targets minimos: `min-h-[48px] min-w-[48px]` (`.touch-target`)
- Separacao entre secoes: `py-16 md:py-24` (`.section-padding`)

## Glassmorphism
| Propriedade  | Valor                                    |
|--------------|------------------------------------------|
| Background   | `rgba(255, 255, 255, 0.07)`              |
| Border       | `rgba(255, 255, 255, 0.15)`              |
| Shadow       | `0 8px 32px rgba(11, 0, 138, 0.25)`     |
| Blur         | `16px` (`backdrop-blur-glass`)           |

Classes:
- `.glass` — opacidade 7%
- `.glass-light` — opacidade 12%

## Regras de animacao
- Entrada por scroll com easing customizado `[0.16, 1, 0.3, 1]` (`easeOut`).
- Variantes disponiveis: `fade-up`, `fade-left`, `fade-right`, `fade-scale`, `fade-in`.
- Stagger para listas com `delayChildren: 0.2` e `staggerChildren: 0.1`.
- CTA com `hover:scale-105` e `hover:shadow-neon`.
- Timeline com `useScroll`/`useTransform` para linha de progresso animada.
- `useReducedMotion()` respeita preferencia do sistema — animacoes desativadas se `prefers-reduced-motion: reduce`.

## Responsividade
- Mobile-first como default; breakpoints `md:` (768px) e `lg:` (1024px).
- Hero: coluna no mobile, grid 2 colunas no desktop.
- Timeline: coluna unica no mobile, alternada (zigzag) no desktop.
- Especialistas: cards em coluna no mobile, alternados (imagem left/right) no desktop.
- Para Quem: grid 1 coluna no mobile, 2 colunas no desktop (imagem + cards).
- Navbar: hamburger menu no mobile, navegacao horizontal no desktop.
- CookieBanner: coluna no mobile, linha no desktop.
- Imagens sempre com `aspect-ratio` e dimensoes definidas para evitar CLS.

## Componentes UI
| Componente        | Props                                       | Variantes                     |
|-------------------|---------------------------------------------|-------------------------------|
| Container         | `children`, `className`, `as`               | `div` (default), `section`    |
| CTAButton         | `children`, `href`, `variant`, `size`       | `primary`, `secondary`, `outline` |
| GlassCard         | `children`, `className`, `variant`          | `glass` (default), `glass-light` |
| Badge             | `children`, `className`, `variant`          | `default`, `primary`, `accent` |
| AnimatedSection   | `children`, `variant`, `delay`, `duration`  | `fade-up`, `fade-left`, etc.  |
| StaggerContainer  | `children`, `className`, `threshold`        | —                             |
| StaggerItem       | `children`, `className`                     | —                             |
