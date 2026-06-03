# Architecture - Landing Page Desafio Feminino de Saude

## Arquitetura completa
- Framework: Next.js 14 App Router com TypeScript.
- Estilo: Tailwind CSS com tokens customizados.
- Animacoes: Framer Motion com react-intersection-observer.
- Deploy: Export estatico (output: export) com trailingSlash.
- Analytics: GA4, Meta Pixel e opcional GTM, todos condicionados por consentimento LGPD.

## Estrutura de pastas
```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    politica-de-privacidade/
      page.tsx
    termos-de-uso/
      page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      HeroSection.tsx
      SpecialistsSection.tsx
      TimelineSection.tsx
      ForWhoSection.tsx
      CTASection.tsx
    ui/
      CTAButton.tsx
      GlassCard.tsx
      SocialButton.tsx
      AnimatedSection.tsx
      StickyCTA.tsx
    analytics/
      MetaPixel.tsx
      GTMScript.tsx
    lgpd/
      CookieBanner.tsx
      CookieModal.tsx
  context/
    CookieConsentContext.tsx
  lib/
    analytics.ts
    constants.ts
  fonts/
    aileron-heavy.woff2
    century-gothic.woff2
    century-gothic-bold.woff2
public/
  images/
    hero-bg.webp
    hero-person.webp
    specialist-1.webp
    specialist-2.webp
    specialist-3.webp
    for-who.webp
    og-image.jpg
  favicon.svg
  favicon-32x32.png
  apple-touch-icon.png
  site.webmanifest
  robots.txt
```

## Fluxo dos componentes
1. `src/app/layout.tsx`
   - Define fontes locais e metadata.
   - Envolve a aplicacao com `CookieConsentProvider`.
   - Renderiza scripts de analytics com base no consentimento.
2. `src/app/page.tsx`
   - Injeta JSON-LD do evento.
   - Compoe as secoes: Hero, Especialistas, Cronograma, Para Quem E, CTA.
3. `components/layout/Navbar.tsx`
   - Navegacao por anchor IDs e CTA no menu.
4. `components/ui/CTAButton.tsx`
   - Dispara `trackWhatsAppClick` e abre link com UTM.
5. `components/lgpd/CookieBanner.tsx` e `CookieModal.tsx`
   - Controlam consentimento e atualizam storage.

## Dependencias entre modulos
- `CTAButton` -> `lib/analytics.ts` (tracking de eventos).
- `MetaPixel` e `GTMScript` -> `context/CookieConsentContext.tsx` (consentimento).
- Secoes -> `lib/constants.ts` (dados fixos de especialistas e timeline).
- `AnimatedSection` -> `react-intersection-observer` + `framer-motion`.
- `layout.tsx` -> `@next/third-parties/google` (GA4), `MetaPixel`, `GTMScript`.
