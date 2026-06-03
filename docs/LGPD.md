# LGPD — Consentimento de Cookies

## Arquitetura

```
layout.tsx (Server Component)
  └── CookieConsentProvider (client)
        ├── Navbar, Main, Footer
        ├── ConsentAnalyticsGate
        │     ├── GTMScript    ← analytics || marketing
        │     ├── MetaPixel    ← marketing
        │     ├── ScrollTracker (sempre renderizado, eventos condicionados)
        │     └── ClickTracker (sempre renderizado, eventos condicionados)
        ├── CookieBanner      ← exibido apenas se status === 'pending'
        └── CookieModal        ← exibido apenas se isModalOpen === true
```

### Fluxo de consentimento

1. Usuário visita o site pela primeira vez.
2. `CookieConsentProvider` carrega `localStorage.getItem('cookie-consent')`.
3. Se não houver preferência salva, `consent.status === 'pending'`.
4. **CookieBanner** é exibido com três opções:
   - **Aceitar Todos** → `acceptAll()` → `{ status: 'accepted', analytics: true, marketing: true }`
   - **Recusar** → `rejectAll()` → `{ status: 'rejected', analytics: false, marketing: false }`
   - **Personalizar** → `openModal()` → exibe CookieModal
5. **CookieModal** permite configuração granular:
   - Cookies Necessários → sempre ativos (toggle desabilitado)
   - Cookies Analytics → controla GA4 e GTM
   - Cookies Marketing → controla Meta Pixel
   - "Salvar Preferências" → `savePreferences(analytics, marketing)`
6. A preferência é persistida em `localStorage` e restaurada automaticamente em visitas futuras.
7. O banner não é exibido novamente se `status !== 'pending'`.

### Integração Analytics

| Script                  | Condição para carregar              |
| ----------------------- | ----------------------------------- |
| GTM (GoogleTagManager)  | `analytics === true` OU `marketing === true` |
| Meta Pixel              | `marketing === true`                |
| ScrollTracker           | Sempre renderizado (eventos condicionados ao consentimento) |
| ClickTracker            | Sempre renderizado (eventos condicionados ao consentimento) |

#### Gatilhos no `analytics.ts`

- `setConsentChecker(checker)` → conecta `analyticsChecker`, usado por `trackEvent()` para liberar `dataLayer` e `gtag`.
- `setMarketingConsentChecker(checker)` → conecta `marketingChecker`, usado por `trackEvent()` para liberar `fbq`.
- `CookieConsentProvider` chama ambos automaticamente sempre que o estado de consentimento é alterado.

### Persistência

- Chave: `cookie-consent`
- Formato: `{ status: 'pending'|'accepted'|'rejected', analytics: boolean, marketing: boolean }`
- Meio: `localStorage`
- Restauração automática: `useEffect` no `CookieConsentProvider` lê e hidrata o estado na montagem.

### Acessibilidade

- **CookieBanner**: `role="dialog"`, `aria-label="Aviso de cookies"`, foco visível com `focus-visible`.
- **CookieModal**: `role="dialog"`, `aria-modal="true"`, `aria-label="Preferencias de cookies"`.
  - Focus trap: navegação por Tab mantém o foco dentro do modal.
  - Escape fecha o modal.
  - Clique no backdrop fecha o modal.
- **Toggles**: `role="switch"`, `aria-checked`, `aria-label` descritivo.
- **Contraste**: botões usam `bg-neon-green` + `text-dark-blue` (contraste ~7:1), outlines com `focus-visible:outline-neon-green`.

### Dependências

- `src/context/CookieConsentContext.tsx` — contexto + provider + `ConsentAnalyticsGate`
- `src/components/lgpd/CookieBanner.tsx` — banner de aviso
- `src/components/lgpd/CookieModal.tsx` — modal de preferências granulares
- `src/lib/analytics.ts` — `setConsentChecker`, `setMarketingConsentChecker`

### Testes manuais recomendados

1. **Primeira visita**: banner aparece, nenhum script de terceiros carrega.
2. **Aceitar Todos**: banner some, GTM + Meta Pixel carregam, eventos são disparados.
3. **Recusar**: banner some, nenhum script de terceiros carrega, eventos são bloqueados.
4. **Personalizar → apenas Analytics**: GTM carrega, Meta Pixel não carrega.
5. **Personalizar → apenas Marketing**: GTM + Meta Pixel carregam, eventos analytics são bloqueados (apenas fbq dispara).
6. **Recarregar página**: preferência restaurada do localStorage, banner não reaparece.
7. **Limpar localStorage**: banner reaparece.
