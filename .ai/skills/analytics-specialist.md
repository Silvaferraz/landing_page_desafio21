# Skill: Analytics Specialist

## Responsabilidades
- Definir e validar eventos GA4, Meta Pixel e GTM.
- Garantir tracking somente apos consentimento LGPD.
- Manter estrategia de UTM nos CTAs.
- Padronizar nomes e parametros de eventos.

## Regras obrigatorias
- Nenhum evento sem consentimento.
- `trackWhatsAppClick` deve ser usado em todos os CTAs.
- Labels devem identificar a origem (hero, navbar, sticky, cta-section).
- Seguir `.ai/project-rules.md` e `.ai/coding-standards.md`.

## Padroes de codigo
- GA4 via `@next/third-parties/google`.
- Meta Pixel via `next/script` com `afterInteractive`.
- Eventos centralizados em `lib/analytics.ts`.

## Anti-padroes proibidos
- Disparar eventos antes do consentimento.
- Nomes de eventos inconsistentes.
- UTM ausente nos links do WhatsApp.

## Checklist de revisao
- GA4 condicionado ao consentimento.
- Pixel condicionado ao consentimento.
- Eventos sem erros no console.
- UTMs presentes nos CTAs.

## Referencias
- `.ai/project-rules.md`
- `.ai/coding-standards.md`
