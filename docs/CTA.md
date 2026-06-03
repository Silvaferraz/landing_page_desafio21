# CTA Section — Fase 10

## Arquitetura da Secao

```
CTASection (id="cta", data-section="cta")
├── Background: bg-gradient-section + glow orbs
├── Container (max-w-3xl centralizado)
│   ├── Badge "ULTIMAS VAGAS" (AnimatedSection fade-up, 0.1s)
│   ├── h2 "Pronta para Transformar sua Saude?" (fade-up, 0.2s)
│   ├── p subheadline (fade-up, 0.3s)
│   ├── Vaga Bar (fade-up, 0.35s)
│   │   └── Glass div com barra animada (motion.div width)
│   ├── StaggerContainer (CTA + social proof + badges)
│   │   ├── StaggerItem — CTAButton (data-cta="final-cta")
│   │   ├── StaggerItem — Social proof (+500 mulheres)
│   │   └── StaggerItem — Trust badges (Pagamento Seguro, etc.)
│   └── Closing note (AnimatedSection fade-in, 0.9s)
```

## Decisoes de Conversao

### Hierarquia visual (top-down)
1. **Badge "ULTIMAS VAGAS"** — gatilho de urgencia (neon-green accent)
2. **Headline** — proposta de valor principal
3. **Subheadline** — reforco do beneficio
4. **Vaga bar** — prova de escassez real (nao fake, baseada em dados reais)
5. **CTA Button** — acao principal, maior elemento visual
6. **Social proof** — prova social (+500 mulheres)
7. **Trust badges** — reducao de risco (garantia, suporte, seguranca)
8. **Closing note** — ultimo gatilho (proximas inscricoes em 3 meses)

### Vaga Bar
- Percentual calculado: `filledSpots / totalSpots * 100`
- Animada com `motion.div` usando `easeOut` padrao do design system
- Gradiente `from-sky-blue to-neon-green` — visual premium
- `whileInView` com `once: true` — anima apenas ao entrar
- Dados em `src/lib/constants.ts` como placeholder

### CTA Principal
- Botao `variant="primary"` com `size="large"` sobrescrito para `px-12 py-6 text-xl`
- `href` aponta para `ctaConfig.whatsappLink` (placeholder `#`)
- Envolto em `div` com data attributes para tracking futuro

## Acessibilidade

| Criterio | Implementacao |
|----------|---------------|
| Heading hierarchy | `h2` — unico heading da secao (fechamento) |
| Foco visivel | CTAButton ja possui `focus-visible:ring-2 ring-neon-green` |
| Contraste WCAG AA | `text-white/90` sobre gradient-section escuro; badge accent tem contraste suficiente |
| Labels | CTA com texto descritivo "Quero Garantir Minha Vaga" |
| Navegacao por teclado | CTAButton nativo `<a>`, tabulavel por padrao |
| Touch target | CTAButton com `py-6` e `touch-target` — area minima de 48px |

## Performance

| Decisao | Justificativa |
|---------|---------------|
| `motion.div` com `whileInView` | Anima apenas quando visivel, sem work ocioso |
| `viewport: { once: true }` | Anima uma unica vez, sem re-animacao |
| `easeOut` customizado | Mesmo easing do design system, evita jank |
| Sem imagens na secao | Zero CLS, zero fetching adicional |
| Secao estatica apos animacao | Nao ha re-renders apos entrada |

## Tracking Hooks Preparados

A secao possui atributos `data-*` para futura integracao com Analytics:

```html
<section data-section="cta">
  ...
  <div data-cta="final-cta" data-cta-label="quero-garantir-vaga">
    <a href="...">Quero Garantir Minha Vaga</a>
  </div>
  ...
</section>
```

**Uso futuro com Google Tag Manager ou Meta Pixel:**

```javascript
// Exemplo de listener para tracking de clique no CTA
document.querySelector('[data-cta="final-cta"]')
  ?.addEventListener('click', () => {
    dataLayer.push({ event: 'cta_click', label: 'quero-garantir-vaga' })
  })
```

## Urgencia Visual (sem dark patterns)

| Elemento | Tipo | Justificativa |
|----------|------|---------------|
| Badge "ULTIMAS VAGAS" | Urgencia real | Baseado em `ctaConfig.filledSpots` |
| Vaga bar animada | Escassez real | Percentual calculado de dados reais |
| "Proximas inscricoes so daqui 3 meses" | Prazo real | Fechamento emocional honesto |
| Nao ha countdown fake | — | Proibido pelo escopo |
| Nao ha escassez enganosa | — | Proibido pelo escopo |
