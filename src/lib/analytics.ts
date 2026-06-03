/**
 * Analytics — camada centralizada de tracking
 *
 * Consentimento categorizado:
 * - analyticsChecker → controla dataLayer, gtag e eventos em geral
 * - marketingChecker → controla exclusivamente Meta Pixel (fbq)
 *
 * Fase 12: CookieConsentContext conecta ambos via setConsentChecker()
 * e setMarketingConsentChecker().
 */

type ConsentChecker = () => boolean

let analyticsChecker: ConsentChecker = () => false
let marketingChecker: ConsentChecker = () => false

export function setConsentChecker(checker: ConsentChecker) {
  analyticsChecker = checker
}

export function setMarketingConsentChecker(checker: ConsentChecker) {
  marketingChecker = checker
}

export function getConsent(): boolean {
  return analyticsChecker()
}

export function getMarketingConsent(): boolean {
  return marketingChecker()
}

/** Dispara evento para dataLayer, GA4 e Meta Pixel (cada um condicionado ao seu consentimento) */
export function trackEvent(
  action: string,
  params?: Record<string, unknown>,
) {
  if (!getConsent()) return

  try {
    window.dataLayer?.push({ event: action, ...params })
  } catch {
    /* safe */
  }

  try {
    window.gtag?.('event', action, params)
  } catch {
    /* safe */
  }

  if (getMarketingConsent()) {
    try {
      window.fbq?.('trackCustom', action, params)
    } catch {
      /* safe */
    }
  }
}

/** Tracking de clique em CTA */
export function trackCTA(label: string) {
  trackEvent('click_cta', { cta_label: label })
}

/** Tracking de clique no WhatsApp */
export function trackWhatsApp(label?: string) {
  trackEvent('click_whatsapp', { cta_label: label ?? 'whatsapp' })
}

/** Tracking de profundidade de scroll */
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', { depth })
}

/** Tracking de page view (chamado no layout ao montar) */
export function trackPageView() {
  trackEvent('page_view', {})
}
