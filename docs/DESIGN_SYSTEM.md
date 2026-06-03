# Design System - Landing Page Desafio Feminino de Saude

## Cores
- deep-blue: #0B008A
- dark-blue: #06004A
- neon-green: #99FF00
- sky-blue: #67AFFF
- glass-white: rgba(255,255,255,0.07)

Gradientes
- gradient-main: linear-gradient(135deg, #0B008A 0%, #1a0099 40%, #67AFFF 100%)
- gradient-hero: linear-gradient(180deg, rgba(11,0,138,0.92) 0%, rgba(103,175,255,0.75) 100%)
- gradient-section: linear-gradient(180deg, #0B008A 0%, #2a1aaa 50%, #67AFFF 100%)
- gradient-cta: linear-gradient(135deg, #99FF00 0%, #7acc00 100%)

## Tipografia
- Titulo H1/H2: font-aileron font-black
- Subtitulo H3/H4: font-century font-bold
- Corpo: font-century font-normal
- Labels: font-century font-bold text-sm uppercase tracking-widest
- Tamanho responsivo via clamp: text-[clamp(32px,6vw,72px)]

## Espacamentos
- Padding responsivo: px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24
- Touch targets minimos: min-h-[48px] min-w-[48px]
- Separacao de secoes: py-16 md:py-24

## Glassmorphism
- Background: rgba(255,255,255,0.07)
- Border: rgba(255,255,255,0.15)
- Shadow: 0 8px 32px rgba(11,0,138,0.25)
- Classe base: .glass e .glass-light

## Regras de animacao
- Entrada por scroll com easing [0.16, 1, 0.3, 1].
- Variantes: fade-up, fade-left, fade-right, fade-scale, fade-in.
- Stagger para listas com delay incremental (0.1s).
- CTA com animacao pulse-cta e hover scale.

## Responsividade
- Mobile-first como default; adicionar md: e lg: para desktop.
- Hero com layout em coluna no mobile e em linha no desktop.
- Timeline em coluna unica no mobile; alternada no desktop.
- Imagens sempre com width/height para evitar CLS.
