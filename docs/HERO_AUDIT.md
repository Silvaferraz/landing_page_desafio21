# Hero Section Audit — Fase 6

## 1. Aderencia ao DESIGN_SYSTEM.md

| Requisito | Status | Observacao |
|-----------|--------|------------|
| `bg-gradient-hero` no background | ✅ | Layer 1 usa corretamente |
| Paleta de cores (deep-blue, sky-blue, neon-green) | ✅ | Todas as cores sao do design system |
| Gradient-cta no CTA primario | ✅ | CTAButton `variant="primary"` usa `bg-gradient-cta` |
| Tipografia H1 (`font-aileron font-black`, clamp) | ✅ | `heading-1` aplica os tokens corretos |
| Tipografia corpo (`font-century font-normal`, `text-white/80`) | ✅ | `body-text` aplicado corretamente |
| Labels (`font-century font-bold text-sm uppercase tracking-widest`) | ✅ | Badge e CTA usam `label-text` / font-century |
| Glassmorphism na prova social | ✅ | Classe `.glass` no div de prova social |
| Touch targets >= 48px | ✅ | `.touch-target` no CTAButton garante 48px |
| Responsividade mobile-first | ✅ | Mobile coluna unica, `md:grid-cols-2` para desktop |
| Stagger/animacoes com easing [0.16,1,0.3,1] | ✅ | AnimatedSection usa o easing padrao |

**Nao conformidades:**

| Item | Gravidade | Descricao |
|------|-----------|-----------|
| `bg-gradient-hero/40` na linha 87 | 🔴 **BUG** | Tailwind nao suporta modificador de opacidade `/40` em `backgroundImage` customizado. O `bg-gradient-hero` e um valor raw `linear-gradient(...)`, e o `/40` gera `--tw-bg-opacity: 0.4` que nao e referenciado pelo gradient. O glow atras da imagem fica em opacidade cheia (mais forte que o esperado). Corrigir com `opacity-40` em um wrapper ou redefinindo o gradient com alfa menor. |
| Contraste `body-text` sobre `gradient-hero` | 🟡 **ALERTA** | `text-white/80` sobre as porcoes mais claras do gradient-hero (proximas a `#67AFFF`) pode resultar em razao de contraste ~3:1 — abaixo do minimo 4.5:1 para texto normal (WCAG AA). O worst case e no terco inferior da section e dentro do elemento `.glass` (que aplica `backdrop-filter` sobre o gradiente, clareando ainda mais o fundo). |
| Foco visivel de teclado nos CTAs | 🟡 **ALERTA** | CTAButton nao tem `focus-visible:ring` ou similar. Tailwind remove `outline` no preflight. Usuarios de navegacao por teclado nao veem indicacao de foco nos botoes. |

---

## 2. Aderencia ao HERO.md

| Item | Status | Observacao |
|------|--------|------------|
| 5 camadas visuais | ✅ | Layer 1 (bg), 2 (texto), 3 (glow), 4 (conteudo), 5 (imagem) |
| Layout mobile coluna unica | ✅ | Grid 1 coluna em mobile |
| Layout desktop 2 colunas | ✅ | `md:grid-cols-2` |
| `pt-24` para navbar fixa | ✅ | Grid tem `pt-24` |
| `max-w-7xl` via Container | ✅ | Container usa `max-w-7xl` |
| `next/image` com `priority` | ✅ | Imagem hero com `priority` |
| `aspect-[3/4]` com `fill` | ✅ | Parent `aspect-[3/4]`, imagem `fill` |
| Animacoes com delays escalonados | ✅ | Badge 0.1, H1 0.2, p 0.3, CTAs 0.4, social 0.5, imagem 0.3 fade-right |
| `<h1>` semantico | ✅ | Primeiro heading da pagina |
| `alt` text na imagem | ✅ | `alt="Mulher saudavel e confiante"` |
| `id="hero"` na section | ✅ | Navbar ancora `#hero` corretamente |

**Nao conformidades:** Nenhuma. HERO.md esta preciso.

---

## 3. Qualidade Visual

### Pontos fortes
- Arquitetura de 5 camadas cria profundidade visual premium/editorial
- Stagger de animacoes guia o olhar do usuario em fluxo natural (badge → titulo → descricao → CTA → prova social)
- Glassmorphism na prova social adiciona textura e contraste com o fundo gradiente
- Paleta de cores consistente e fiel ao design system
- CTA neon-green se destaca fortemente sobre o fundo escuro (alta conversao visual)
- Badge "VAGAS LIMITADAS" em neon-green cria urgencia sem poluir visualmente

### Problemas visuais
- Placeholder SVG (`hero-person.svg`) nao comunica o conceito de "mulher saudavel" — sao apenas formas abstratas geometricas. Impacta negativamente a conexao emocional ate ser substituido por fotografia real.
- `bg-gradient-hero/40` nao reduz a opacidade como esperado — o glow atras da imagem pode estar super-expressivo.
- Contraste do `body-text` nas areas mais claras do gradiente pode tornar a leitura dificil em monitores com calibracao media.

---

## 4. Hierarquia Visual

```
1. Badge "VAGAS LIMITADAS"     → Urgencia (pequeno, cor neon, tracking alto)
2. H1 "Transforme Sua Saude..." → Mensagem principal (maior elemento, bold)
3. Paragrafo                    → Suporte (body-text, 80% opacidade)
4. CTAs                         → Acao (primario destaque, outline secundario)
5. Prova social "+500 mulheres" → Confianca (glass, icones de avatar)
6. Imagem                       → Aspiracao/identificacao
```

✅ Hierarquia bem definida e alinhada com o objetivo de conversao.

**Ressalva:** Em mobile com viewport muito pequena (<640px altura), a imagem pode empurrar o CTA para baixo da dobra. Isso e aceitavel para o contexto, desde que o CTA principal permaneca visivel sem scroll na maioria dos dispositivos.

---

## 5. Responsividade

| Breakpoint | Comportamento | Avaliacao |
|------------|--------------|-----------|
| Mobile (<768px) | Coluna unica, conteudo + imagem empilhados | ✅ Layout funcional. `pt-24` suficiente (~96px). Conteudo + imagem podem exceder viewport gerando scroll, mas CTA fica acima da dobra. |
| Tablet (768-1024px) | Grid 2 colunas, `gap-16` | ✅ Layout confortavel. Imagem `max-w-[400px]` proporcional. |
| Desktop (1024-1536px) | Grid 2 colunas, `gap-24` | ✅ Layout premium com whitespace generoso. Imagem `lg:max-w-[500px]` bem dimensionada. |
| Ultra-wide (>1536px) | Limitado por `max-w-7xl` do Container | ✅ Container mantem layout centralizado e legivel. |

⚠️ Em viewports entre 768-900px, o espacamento `pt-24` no grid pode criar um gap superior excessivo quando combinado com o `min-h-screen flex items-center` do container. O conteudo fica visualmente deslocado para baixo.

---

## 6. Acessibilidade

| Criterio | Status | Detalhe |
|----------|--------|---------|
| `<h1>` semantico | ✅ | Unico H1 na pagina, primeiro heading |
| `alt` text na imagem | ✅ | Descritivo e contextual |
| Skip-to-content link | ✅ | Presente no `layout.tsx`, ancora `#main-content` |
| Touch targets >= 48px | ✅ | `.touch-target` no CTAButton |
| Navegacao por teclado | ✅ | Links nativos `<a>` com href |
| Contraste body-text sobre gradient-hero | 🟡 **ALERTA** | `text-white/80` (rgba(255,255,255,0.8)) sobre porcoes claras do gradiente pode cair abaixo de 4.5:1. |
| Foco visivel em botoes | 🟡 **ALERTA** | CTAButton sem `focus-visible:ring` ou `focus:outline`. Tailwind remove outline. |
| HTML semantico | ✅ | Section, h1, p, a — sem uso excessivo de ARIA |
| Ordem de tabulacao | ✅ | DOM segue ordem visual (conteudo → imagem) |

---

## 7. Performance

| Aspecto | Status | Detalhe |
|---------|--------|---------|
| LCP — imagem com `priority` | ✅ | Hero person image com `priority` no next/image |
| LCP — `sizes` definido | ✅ | `sizes="(max-width: 768px) 100vw, 50vw"` |
| CLS — dimensoes fixas | ✅ | `aspect-[3/4]` + `fill` → sem layout shift |
| CLS — fontes display swap | ✅ | `display: swap` e `preload: true` nas fontes |
| JavaScript total (First Load) | 128 kB total, 87.4 kB shared | Dentro do esperado para Next.js + Framer Motion |
| Imagem SVG placeholder | ✅ | SVG e leve (~500 bytes), carregamento instantaneo |
| backdrop-filter na prova social | ⚠️ | `backdrop-filter: blur(16px)` e computacionalmente moderado. Apenas 1 instancia no hero, sem impacto perceptivel. |
| Animacoes Framer Motion | ⚠️ | Scroll-driven com `whileInView`. 6 instancias de AnimatedSection. Bundle do framer-motion (~35KB) incluso no First Load JS. |

---

## 8. Core Web Vitals (estimativa)

| Metrica | Estimativa | Justificativa |
|---------|-----------|---------------|
| **LCP** | ~0.8–1.2s | Hero SVG e leve, `priority` ativado, fontes preload. Nenhum bloqueador. |
| **CLS** | **0** | `aspect-[3/4]` garante dimensoes fixas. Fontes com `swap`. Layout estatico sem shifts. |
| **INP** | <50ms | Sem handlers JS pesados. CTAButton e CSS-only. Framer Motion apenas em scroll (observers sao leves). |
| **TBT** | <50ms | Sem scripts longos ou third-party no hero. |

---

## 9. Uso das Animacoes da Fase 4

| Requisito | Status | Observacao |
|-----------|--------|------------|
| `AnimatedSection` como unico mecanismo | ✅ | Todas as entradas sao AnimatedSection |
| Variantes registradas em `animations.ts` | ✅ | Apenas `fade-up` e `fade-right` — ambas definidas |
| Easing `[0.16, 1, 0.3, 1]` | ✅ | Usado internamente pelo AnimatedSection |
| `useReducedMotion` respeitado | ✅ | AnimatedSection implementa `useReducedMotion` com fallback opacity-only |
| `once: true` | ✅ | Default do AnimatedSection (anima apenas na primeira aparição) |
| `threshold` adequado | ✅ | 0.1 (padrao) — anima quando 10% do elemento entra na viewport |
| Stagger com delays incrementais | ✅ | 0.1s de incremento entre elementos sequenciais |
| Sem animacoes customizadas inline | ✅ | Nenhum `motion.div` direto, tudo via AnimatedSection |

✅ **Uso exemplar do sistema de animacao da Fase 4.**

---

## 10. Problemas Encontrados (Priorizados)

| # | Problema | Gravidade | Local | Impacto |
|---|----------|-----------|-------|---------|
| 1 | `bg-gradient-hero/40` — opacidade nao aplicada a gradient customizado | 🔴 **BUG** | HeroSection.tsx:87 | Glow atras da imagem fica mais opaco que o previsto. Corrigir com `opacity-40` no wrapper ou `rgba()` manual. |
| 2 | Contraste insuficiente do `body-text` sobre gradient-hero | 🟡 **ACESSIBILIDADE** | HeroSection.tsx:45-49 | Leitura dificil no terco inferior do hero. Texto normal precisa 4.5:1 (WCAG AA). |
| 3 | Foco visivel ausente nos CTAs | 🟡 **ACESSIBILIDADE** | CTAButton.tsx | Usuarios de teclado perdem referencia visual de foco. Adicionar `focus-visible:ring-2 focus-visible:ring-neon-green`. |
| 4 | Placeholder SVG nao representa o conceito visual | 🟡 **QUALIDADE** | hero-person.svg | Substituir por `.webp` real com fotografia de mulher saudavel. |
| 5 | `pt-24` pode criar desbalanceamento em tablets pequenos | ⚠️ **ESTETICA** | HeroSection.tsx:31 | Em viewports 768-900px com grid 2 colunas, o `pt-24` no grid + `flex items-center` pode deslocar o conteudo para baixo. |

---

## 11. Scores Estimados

| Criterio | Score | Faixa |
|----------|-------|-------|
| Qualidade visual | **7.5 / 10** | Boa. Estrutura solida, execution consistente. Placeholder e contraste impedem nota maior. |
| Potencial de conversao | **7 / 10** | Boa hierarquia e CTA destacado. Placeholder de imagem e falta de WhatsApp real reduzem potencial. |
| Lighthouse estimado | **92 / 100** | Perda em Accessibility (contraste, foco) e Performance (Framer JS bundle). CLS 0 garante nota alta. |

---

## 12. Melhorias Recomendadas

### Criticas (antes do deploy)
1. **Corrigir `bg-gradient-hero/40`** — Substituir por `<div className="absolute -inset-4 rounded-full bg-gradient-hero opacity-40 blur-2xl" />` (usar `opacity-40` em um wrapper em vez de modificar o gradient).
2. **Melhorar contraste do body-text** — Trocar `text-white/80` para `text-white/90` ou `text-white` nas areas sobre o gradiente. Ou escurecer o gradiente na parte inferior com um overlay adicional.

### Recomendadas
3. **Adicionar `focus-visible:ring-2 focus-visible:ring-neon-green`** nos CTAs para acessibilidade de teclado.
4. **Substituir placeholder SVG** por fotografia `.webp` real (mulher saudavel, ambiente fitness/natureza) assim que disponivel.
5. **Ajustar `pt-24`** para ser responsivo: `pt-20 md:pt-24` ou usar gap do grid em vez de padding.

---

## 13. Veredito Final

```
┌─────────────────────────────────────────────┐
│                                             │
│           HERO APROVADA                     │
│                                             │
│   Aprovada com 1 bug critico (#1)           │
│   e 2 alertas de acessibilidade (#2, #3).   │
│                                             │
│   Estrutura de 5 camadas, animacoes,        │
│   responsividade e performance estao        │
│   solidos. Corrigir itens #1-3 antes        │
│   do deploy de producao.                    │
│                                             │
└─────────────────────────────────────────────┘
```
