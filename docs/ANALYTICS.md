# Analytics — Fase 11

## Arquitetura

```
src/lib/analytics.ts          → Funcoes centralizadas de tracking
src/components/analytics/
  GTMScript.tsx               → Google Tag Manager (via @next/third-parties)
  MetaPixel.tsx               → Meta Pixel (script dinamico)
  ScrollTracker.tsx           → Scroll depth (25/50/75/100%)
```

### Fluxo de dados

```
CTA click → trackCTA() / trackWhatsApp()
                ↓
         analytics.ts
                ↓
    [consentimento negado?] → aborta (nada enviado)
    [consentimento concedido?] → envia para:
        ├── dataLayer (GTM)
        ├── gtag (GA4)
        └── fbq (Meta Pixel)
```

## Eventos Implementados

| Evento | Funcao | Parametros | Disparo |
|--------|--------|-----------|---------|
| `page_view` | `trackPageView()` | — | (preparado para layout) |
| `scroll_depth` | `trackScrollDepth(n)` | `{ depth: 25/50/75/100 }` | ScrollTracker |
| `click_cta` | `trackCTA(label)` | `{ cta_label: string }` | CTAs mapeados |
| `click_whatsapp` | `trackWhatsApp(label?)` | `{ cta_label: string }` | CTAs WhatsApp |

## Nomenclatura de Eventos

### click_cta — labels padrao

| Label | Origem | Local |
|-------|--------|-------|
| `hero-cta-principal` | CTA "Quero Participar" | HeroSection |
| `hero-cta-secundario` | CTA "Saiba Mais" | HeroSection |
| `navbar-cta` | CTA do menu desktop | Navbar |
| `navbar-cta-mobile` | CTA do menu mobile | Navbar |
| `cta-final` | CTA "Quero Garantir Minha Vaga" | CTASection |

### click_whatsapp — labels padrao

| Label | Origem |
|-------|--------|
| `hero-cta-principal` | CTA principal da Hero (redireciona para WhatsApp) |
| `cta-final` | CTA final da pagina (redireciona para WhatsApp) |

## Componentes Rastreados

| Componente | Eventos | Metodo |
|-----------|---------|--------|
| **HeroSection** | `click_whatsapp`, `click_cta` | `onClick` no CTAButton |
| **Navbar** | `click_cta` | `onClick` no CTAButton |
| **CTASection** | `click_whatsapp` | `onClick` no CTAButton |
| **ScrollTracker** | `scroll_depth` | `useEffect` + scroll listener |

## Integracao Futura com LGPD (Fase 12)

### Consentimento

Em `src/lib/analytics.ts`:

```typescript
let consentChecker: ConsentChecker = () => false

export function setConsentChecker(checker: ConsentChecker) {
  consentChecker = checker
}
```

Por padrao, `consentChecker` retorna `false` — nenhum dado e enviado.

**Na Fase 12**, o `CookieConsentContext` chamara:

```typescript
import { setConsentChecker } from '@/lib/analytics'
import { getConsent } from '@/context/CookieConsentContext'

setConsentChecker(() => getConsent())
```

### Scripts condicionais

`GTMScript` e `MetaPixel` recebem `consent={false}` no layout por enquanto:

```tsx
<GTMScript consent={false} />
<MetaPixel consent={false} />
```

Na Fase 12, passarao `consent` vindo do `CookieConsentContext`.

`ScrollTracker` **nao depende de consentimento** por ser uma metrica de engajamento nao pessoal (pode ser tratada como analytics first-party).

## GA4

- Preparado via `window.gtag()`
- Chamado internamente por `trackEvent()` quando consentimento e concedido
- Nao ha script do GA4 carregado diretamente — GTM gerencia o carregamento

## GTM

- Componente: `GTMScript.tsx` usando `@next/third-parties/google` `<GoogleTagManager>`
- Container ID: `GTM-XXXXXXX` (placeholder)
- Todos os eventos sao empurrados para `dataLayer`

## Meta Pixel

- Componente: `MetaPixel.tsx` com injeção dinâmica de script
- Pixel ID: `1234567890` (placeholder)
- Dispara `PageView` na inicializacao e `trackCustom` em cada `trackEvent`

## Pendências para Fase 12

- [ ] Integrar `setConsentChecker` com `CookieConsentContext`
- [ ] Passar `consent` real para `GTMScript` e `MetaPixel`
- [ ] Substituir IDs placeholder (GTM, Pixel) pelos reais do cliente
- [ ] Implementar `CookieBanner` e `CookieModal`
- [ ] Implementar `CookieConsentContext`
- [ ] Definir logging de depuracao para ambiente de desenvolvimento
