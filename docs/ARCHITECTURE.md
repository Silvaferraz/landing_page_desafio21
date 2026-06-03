# Architecture - Landing Page Desafio Feminino de Saude

## Arquitetura completa
- Framework: Next.js 14 App Router com TypeScript.
- Estilo: Tailwind CSS com tokens customizados.
- Animacoes: Framer Motion com `useScroll`, `useTransform` e variantes de entrada.
- Deploy: Export estatico (`output: 'export'`) com `trailingSlash`.
- Analytics: GA4 (via GTM), Meta Pixel e GTM, todos condicionados por consentimento LGPD categorizado.
- Consentimento: Categorias `analytics` e `marketing` com persistencia em `localStorage`.

## Estrutura de pastas
```
src/
  app/
    layout.tsx              # Server Component — metadata, fonts, providers
    page.tsx                # Server Component — composicao de secoes
    globals.css             # Tailwind + classes utilitarias customizadas
    robots.ts               # Static route — robots.txt
    sitemap.ts              # Static route — sitemap.xml
  context/
    CookieConsentContext.tsx # Provider + context + ConsentAnalyticsGate
  lib/
    analytics.ts            # Eventos centralizados (trackEvent, trackCTA, etc.)
    constants.ts            # Dados fixos (especialistas, timeline, config)
    animations.ts           # Variantes de animacao Framer Motion
  fonts/
    aileron-heavy.woff2
    century-gothic.woff2
    century-gothic-bold.woff2
  components/
    layout/
      Navbar.tsx            # Client Component — navegacao fixa com mobile menu
      Footer.tsx            # Server Component — links + CookiePreferencesButton
    sections/
      HeroSection.tsx       # Server Component — hero com CTA e prova social
      SpecialistsSection.tsx # Server Component — cards de especialistas
      TimelineSection.tsx   # Client Component — linha do tempo animada (useScroll)
      ForWhoSection.tsx     # Server Component — grid de publico-alvo
      CTASection.tsx        # Client Component — CTA final com barra de vagas
    ui/
      Container.tsx         # Layout wrapper responsivo
      CTAButton.tsx         # Botao CTA com variantes de estilo
      GlassCard.tsx         # Card com efeito glassmorphism
      Badge.tsx             # Tag/badge com variantes de cor
      AnimatedSection.tsx   # Wrapper de animacao de entrada por scroll
      StaggerContainer.tsx  # Container para animacao em lista (stagger)
      StaggerItem.tsx       # Item animado dentro de StaggerContainer
    analytics/
      GTMScript.tsx         # Client Component — Google Tag Manager (consent gate)
      MetaPixel.tsx         # Client Component — Meta Pixel (consent gate)
      ScrollTracker.tsx     # Client Component — scroll depth tracking (throttled)
      ClickTracker.tsx      # Client Component — event delegation para CTAs
    lgpd/
      CookieBanner.tsx      # Client Component — banner LGPD (3 botoes)
      CookieModal.tsx       # Client Component — modal granular com focus trap
      CookiePreferencesButton.tsx  # Client Component — reabertura do modal
public/
  images/
    hero-person.svg
    specialist-1.svg
    specialist-2.svg
    specialist-3.svg
    for-who.svg
  favicon.svg
  favicon-32x32.png
  apple-touch-icon.png
```

## Fluxo dos componentes

1. `src/app/layout.tsx` (Server Component)
   - Define fontes locais e metadata (incluindo OpenGraph, Twitter Cards, JSON-LD).
   - Envolve a aplicacao com `CookieConsentProvider`.
   - Renderiza `ConsentAnalyticsGate` (scripts de analytics condicionados ao consentimento).

2. `src/app/page.tsx` (Server Component)
   - Compoe as secoes: Hero, Especialistas, Cronograma, Para Quem E, CTA.

3. `src/context/CookieConsentContext.tsx`
   - Gerencia estado de consentimento (`pending` / `accepted` / `rejected`) com categorias `analytics` e `marketing`.
   - Persiste em `localStorage` com validacao runtime do JSON.
   - Conecta `setConsentChecker()` e `setMarketingConsentChecker()` ao modulo de analytics.
   - Exporta `ConsentAnalyticsGate` que renderiza os scripts de tracking com base nas categorias consentidas e dispara `trackPageView()` na primeira decisao.

4. `components/analytics/` — Scripts condicionados por consentimento:
   - `GTMScript` — carrega GTM se `analytics || marketing`.
   - `MetaPixel` — carrega se `marketing`.
   - `ScrollTracker` — rastreia profundidade de scroll com throttle (requestAnimationFrame).
   - `ClickTracker` — event delegation em `[data-cta]` para `trackCTA` / `trackWhatsApp`.

5. `components/lgpd/`
   - `CookieBanner` — exibido apenas em `status === 'pending'`.
   - `CookieModal` — configuracao granular com focus trap.
   - `CookiePreferencesButton` — botao no Footer para reabrir o modal.

6. `components/ui/` — Componentes atomicos reutilizaveis.

## Dependencias entre modulos
- `lib/analytics.ts` — modulo central, sem dependencias de componentes.
- `CookieConsentContext` — depende de `lib/analytics.ts` e componentes de analytics.
- `HeroSection`, `SpecialistsSection`, `ForWhoSection` — Server Components (sem hooks).
- `TimelineSection`, `CTASection`, `Navbar` — Client Components (hooks do Framer Motion / React).
- `Footer` — Server Component que inclui `CookiePreferencesButton` (Client Component).

## Limites Server / Client

| Componente          | Tipo    | Motivo                                         |
|---------------------|---------|-------------------------------------------------|
| layout.tsx          | Server  | Metadata, fonts, estrutura HTML                 |
| page.tsx            | Server  | Composicao pura de componentes                  |
| Navbar.tsx          | Client  | useState/useEffect para scroll, menu, focus trap|
| HeroSection.tsx     | Server  | Sem interatividade                              |
| SpecialistsSection  | Server  | Sem interatividade                              |
| TimelineSection     | Client  | useScroll/useTransform do Framer Motion         |
| ForWhoSection       | Server  | Sem interatividade                              |
| CTASection          | Client  | motion.div (barra de vagas animada)             |
| Footer.tsx          | Server  | Sem interatividade (inclui CookiePreferencesButton) |
| CTAButton.tsx       | Server  | Renderiza <a> puro                              |
| AnimatedSection     | Client  | motion.div + useReducedMotion                   |
| ConsentAnalyticsGate| Client  | useContext + useEffect                          |
