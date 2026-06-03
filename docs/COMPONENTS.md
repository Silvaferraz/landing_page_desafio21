# Components - Design System

## Container

### Objetivo
Wrapper responsivo que centraliza o conteudo com padding horizontal progressivo conforme o breakpoint.

### Props
| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `children` | `React.ReactNode` | obrigatorio | Conteudo interno |
| `className` | `string` | `''` | Classes adicionais |
| `as` | `'div' \| 'section' \| 'article' \| 'main'` | `'div'` | Tag HTML do elemento |

### Variantes
Nao possui variantes. O padding segue o sistema definido no Design System:
- `px-4` (mobile)
- `sm:px-6`
- `md:px-8`
- `lg:px-16`
- `xl:px-24`
- `max-w-7xl`

### Regras de uso
- Envolver cada secao com Container para manter consistencia horizontal.
- Usar `as` semantico quando o container representar uma secao (`section`, `main`).

### Exemplos
```tsx
<Container as="section">
  <h1>Conteudo centralizado</h1>
</Container>
```

### Restricoes
- Nao usar dentro de elementos que ja possuem padding proprio.
- Nao aninhar Containers (um dentro do outro).

---

## GlassCard

### Objetivo
Container com efeito glassmorphism para destacar blocos de conteudo sobre gradientes.

### Props
| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `children` | `React.ReactNode` | obrigatorio | Conteudo interno |
| `className` | `string` | `''` | Classes adicionais |
| `variant` | `'glass' \| 'glass-light'` | `'glass'` | Intensidade do vidro |

### Variantes
- `glass`: Fundo mais translucido (`bg-white/[0.07]`). Uso padrao.
- `glass-light`: Fundo levemente mais claro (`bg-white/[0.12]`). Para destaque adicional.

### Regras de uso
- Preferir `glass` (padrao) para cards genericos.
- Usar `glass-light` apenas quando o card precisa de mais contraste.
- Garantir padding interno adequado (ja incluso `p-6 md:p-8`).

### Exemplos
```tsx
<GlassCard variant="glass-light">
  <h3>Titulo do Card</h3>
  <p>Conteudo com efeito vidro</p>
</GlassCard>
```

### Restricoes
- Nao usar fora de areas com fundo gradiente (perde o efeito).
- Evitar conteudo muito denso que dificulte a leitura.

---

## SectionTitle

### Objetivo
Titulo padrao de secao com heading H1/H2 e subtitulo opcional.

### Props
| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `title` | `string` | obrigatorio | Titulo principal |
| `subtitle` | `string` | `undefined` | Subtitulo opcional |
| `className` | `string` | `''` | Classes adicionais |
| `align` | `'left' \| 'center'` | `'center'` | Alinhamento do titulo |

### Variantes
- `center`: Titulo centralizado com `mx-auto` no subtitulo.
- `left`: Titulo alinhado a esquerda.

### Regras de uso
- Usar H1 apenas uma vez por pagina (hero).
- Usar H2 para todas as demais secoes via este componente.
- Subtitulo deve ser conciso (< 200 caracteres).

### Exemplos
```tsx
<SectionTitle
  title="Para Quem é Este Desafio"
  subtitle="Se você se identificou com pelo menos um item abaixo, esse desafio foi feito para você"
  align="center"
/>
```

### Restricoes
- Nao passar HTML como `title` ou `subtitle` (apenas string).
- Nao usar `align="left"` como padrao sem necessidade.

---

## Badge

### Objetivo
Tag rotuladora para status, categorias ou destaque de informacao.

### Props
| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `children` | `React.ReactNode` | obrigatorio | Texto do badge |
| `className` | `string` | `''` | Classes adicionais |
| `variant` | `'default' \| 'primary' \| 'accent'` | `'default'` | Esquema de cor |

### Variantes
- `default`: Fundo branco translucido com texto branco.
- `primary`: Fundo azul escuro com texto sky-blue.
- `accent`: Fundo neon-green translucido com texto neon-green.

### Regras de uso
- Texto deve ser curto (1-3 palavras).
- Usar `variant="accent"` para chamadas de acao ou destaque principal.
- Usar `variant="primary"` para informacoes secundarias.

### Exemplos
```tsx
<Badge variant="accent">VAGAS LIMITADAS</Badge>
<Badge variant="primary">EMAGRECIMENTO</Badge>
<Badge>INICIANTE</Badge>
```

### Restricoes
- Nao usar para botoes ou links (apenas informacao).
- Nao usar mais de 3 badges juntos sem espaçamento.

---

## CTAButton

### Objetivo
Botao de chamada para acao principal (WhatsApp). Usado em hero, navbar, sticky e secao CTA.

### Props
| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `children` | `React.ReactNode` | obrigatorio | Texto do botao |
| `href` | `string` | `'#'` | Link de destino |
| `className` | `string` | `''` | Classes adicionais |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Estilo visual |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Tamanho do botao |

### Variantes
- `primary`: Gradiente verde com texto preto. Uso principal em CTAs.
- `secondary`: Fundo translucido com borda. Para contextos secundarios.
- `outline`: Borda neon-green sem fundo. Para CTAs alternativos.

### Tamanhos
- `small`: `px-6 py-3 text-sm`. Para espacos compactos (navbar).
- `default`: `px-8 py-4 text-base`. Uso padrao.
- `large`: `px-10 py-5 text-lg`. Para hero e secao CTA.

### Regras de uso
- `href` deve apontar para link do WhatsApp com UTM quando disponivel.
- Sempre usar `variant="primary" size="large"` no hero e secao CTA.
- Usar `size="small"` para caber na navbar.
- Garantir touch target minimo de 48px (ja incluso via `touch-target`).

### Exemplos
```tsx
<CTAButton href="https://wa.me/5511999999999" variant="primary" size="large">
  Quero Participar
</CTAButton>

<CTAButton variant="secondary" size="small">
  Saiba Mais
</CTAButton>
```

### Restricoes
- Nao usar `variant="outline"` para o CTA principal de conversao.
- Nao substituir `href` por onClick sem manter acesso via teclado.
- Tracking de clique deve ser adicionado na Fase 11 (Analytics).

---

## SocialButton

### Objetivo
Botao de link para rede social (Instagram das especialistas).

### Props
| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `href` | `string` | obrigatorio | URL da rede social |
| `label` | `string` | obrigatorio | Texto visivel e aria-label |
| `className` | `string` | `''` | Classes adicionais |

### Variantes
Nao possui variantes. Sempre usa `glass` como base visual.

### Regras de uso
- `href` deve ser URL completa (ex: `https://instagram.com/usuario`).
- `label` funciona como texto do link e `aria-label` para acessibilidade.
- Abre em nova aba (`target="_blank"`) com `rel="noopener noreferrer"`.

### Exemplos
```tsx
<SocialButton
  href="https://instagram.com/especialista"
  label="@especialista"
/>
```

### Restricoes
- Nao usar para acoes que nao sejam navegacao externa.
- Nao omitir `label` (obrigatorio para acessibilidade).

---

## StickyCTA

### Objetivo
CTA fixo na parte inferior da tela em mobile, ativado apos 300px de scroll.

### Props
| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `href` | `string` | `'#'` | Link do WhatsApp |
| `label` | `string` | `'Quero Participar'` | Texto do botao |
| `className` | `string` | `''` | Classes adicionais |

### Variantes
Nao possui variantes. Sempre usa `btn-cta` como estilo.

### Regras de uso
- Renderizar apenas em mobile via `md:hidden` (ja incluso).
- Scroll position monitorado via `useEffect` com `passive: true`.
- Aparece com transicao suave (`translate-y` + `duration-300`).

### Exemplos
```tsx
<StickyCTA href="https://wa.me/5511999999999" label="Quero Participar" />
```

### Restricoes
- Componente client-side (`'use client'`).
- Nao usar em desktop (escondido via `md:hidden`).
- Tracking de clique deve ser adicionado na Fase 11 (Analytics).
- Nao usar mais de uma instancia por pagina.
