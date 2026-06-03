# Security Audit — Landing Page Desafio Feminino de Saúde

**Date:** 2026-06-03
**Scope:** Full codebase, dependencies, build output, configuration
**Methodology:** Static analysis + build output inspection + dependency audit

---

## Summary

| Category               | CRITICAL | HIGH | MEDIUM | LOW | Total |
|------------------------|----------|------|--------|-----|-------|
| Secrets & Credentials  | 0        | 0    | 0      | 1   | 1     |
| XSS                    | 0        | 0    | 1      | 0   | 1     |
| Dependencies           | 0        | 1    | 1      | 0   | 2     |
| Build Output           | 0        | 0    | 1      | 0   | 1     |
| HTTP Headers           | 0        | 1    | 0      | 2   | 3     |
| Analytics & Privacy    | 0        | 0    | 0      | 1   | 1     |
| File Exposure          | 0        | 0    | 1      | 0   | 1     |
| **Total**              | **0**    | **2** | **4**  | **4** | **10** |

---

## 1. Secrets & Credentials

### S1 — `.gitignore` permite commit de `.env` (LOW)
**File:** `.gitignore:26`
**Risk:** Apenas `.env*.local` é ignorado. `.env`, `.env.development`, `.env.production` podem ser commitados.
**Impact:** Se um arquivo `.env` for criado com credenciais reais e commitado, segredos ficarão expostos no histórico do Git.
**Recommendation:** Adicionar `.env` e `.env*.local` às regras de gitignore.
```gitignore
.env
.env*.local
```

---

## 2. XSS (Cross-Site Scripting)

### X1 — `dangerouslySetInnerHTML` para JSON-LD (MEDIUM)
**File:** `src/app/layout.tsx:130`
**Risk:** Conteúdo injetado via `dangerouslySetInnerHTML`. Embora atualmente seja JSON estático gerado em build-time, modificações futuras que incluam dados dinâmicos poderiam introduzir XSS.
**Impact:** Atualmente seguro, porém o padrão estabelece precedente para uso do `dangerouslySetInnerHTML` em outros lugares.
**Recommendation:**
1. Manter o JSON-LD exclusivamente com dados estáticos definidos em constantes no módulo.
2. Adicionar comentário no código alertando que modificações devem manter conteúdo estático.
3. Considerar escape via `JSON.stringify` + entidades HTML para dados dinâmicos no futuro.

### X2 — SVGs na pasta `public/` (LOW)
**Files:** `public/images/*.svg`
**Risk:** SVGs podem conter `<script>` ou manipuladores de evento (`onload`, `onclick`). Foram inspecionados e não contêm XSS vectors.
**Impact:** Nenhum — os SVGs atuais são seguros.
**Recommendation:** Manter verificação periódica de SVGs, especialmente se novos arquivos forem adicionados.

---

## 3. Dependências

### D1 — Next.js 14.2.35: DoS via Image Optimizer (HIGH)
**Source:** `npm audit`
**Advisory:** GHSA-9g9p-9gw9-jx7f
**Risk:** Next.js self-hosted applications vulnerable to Denial of Service via Image Optimizer `remotePatterns` configuration.
**Impact:** Atacante pode explorar o Image Optimization pipeline para causar DoS. **Mitigado** no projeto atual porque:
- `output: 'export'` gera páginas estáticas — não há servidor em produção.
- `images.unoptimized: true` — Image Optimization está desativado.
**Effective severity for this project:** LOW (devido às mitigações).
**Recommendation:** Monitorar atualizações do Next.js. A correção definitiva requer upgrade para Next.js ≥ 14.2.36 ou 15.x.

### D2 — PostCSS: XSS via CSS Stringify (MODERATE)
**Source:** `npm audit`
**Advisory:** GHSA-qx2v-qp2m-jg93
**Risk:** PostCSS permite injeção de `</style>` não escapado na saída CSS, possibilitando XSS.
**Impact:** Baixo — o PostCSS é usado apenas em build-time para compilar Tailwind. O CSS final é estático.
**Recommendation:** Atualizar `postcss` para ≥ 8.5.10 via `npm update postcss`.

---

## 4. Build Output

### B1 — `index.txt` gerado na exportação estática (MEDIUM)
**File:** `out/index.txt` (26 KB)
**Risk:** Next.js gera um arquivo `.txt` com o conteúdo textual da página. Este arquivo contém todo o texto do site (headings, descrições, calls-to-action).
**Impact:** Baixo — é conteúdo público da landing page. Não contém dados sensíveis. Mas é um artefato inesperado que pode conter versões desatualizadas do conteúdo.
**Recommendation:** Nenhuma ação necessária. É comportamento padrão do Next.js para static export.

### B2 — `productionBrowserSourceMaps` não configurado (LOW)
**File:** `next.config.mjs`
**Status:** Default `false` — source maps NÃO são gerados em produção.
**Impact:** Nenhum — o comportamento default já é seguro.
**Recommendation:** Explicitar `productionBrowserSourceMaps: false` na configuração para documentar a intenção.

---

## 5. HTTP Security Headers

### H1 — CSP (Content Security Policy) ausente (HIGH)
**File:** `next.config.mjs`
**Risk:** Nenhuma Content Security Policy definida. Um atacante que consiga injetar um script poderia executá-lo sem restrições.
**Impact:** Sem CSP, ataques XSS têm maior chance de sucesso.
**Recommendation:** Adicionar CSP headers no servidor de hospedagem (CDN/nginx/hosting). Para static export, configurar no nível do servidor:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'
```
**Nota:** Para sites que usarão GTM e Meta Pixel, será necessário ajustar:
```http
script-src 'self' https://www.googletagmanager.com https://connect.facebook.net;
img-src 'self' data: https://www.facebook.com https://www.google.com.br;
connect-src 'self' https://www.google-analytics.com;
```

### H2 — X-Frame-Options / frame-ancestors ausente (LOW)
**File:** `next.config.mjs`
**Risk:** A página pode ser embutida em iframes de terceiros (clickjacking).
**Impact:** Baixo para landing page, mas relevante se houver formulários ou páginas de checkout no futuro.
**Recommendation:** Adicionar ao servidor:
```http
X-Frame-Options: DENY
# ou via CSP
Content-Security-Policy: frame-ancestors 'none';
```

### H3 — Referrer-Policy ausente (LOW)
**File:** `next.config.mjs`
**Risk:** Informações de referência podem vazar para sites externos (ex: ao clicar no link do Instagram).
**Impact:** Baixo — os links externos já usam `rel="noopener noreferrer"`, mas o header de referrer ainda pode vazar a URL completa.
**Recommendation:** Adicionar ao servidor:
```http
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 6. Analytics & Privacy

### A1 — IDs de rastreamento expostos no código-fonte (LOW)
**Files:** `src/components/analytics/GTMScript.tsx:5`, `src/components/analytics/MetaPixel.tsx:5`
**Risk:** `GTM-XXXXXXX` e `1234567890` são placeholders e não representam risco. Porém, quando substituídos por IDs reais, estarão visíveis no JavaScript compilado e acessíveis a qualquer visitante.
**Impact:** Inerente a qualquer script de analytics client-side — não mitigável sem abordagens server-side. Os IDs são públicos por natureza.
**Recommendation:** Garantir que IDs reais sigam o mesmo padrão de placeholders e sejam configurados via variáveis de ambiente no futuro.

### A2 — `localStorage` com dados de consentimento (LOW)
**File:** `src/context/CookieConsentContext.tsx`
**Risk:** `localStorage` contém `{ status, analytics, marketing }` — apenas preferências booleanas. Nenhum PII (Personally Identifiable Information) é armazenado.
**Impact:** Nenhum dado sensível coletado.
**Recommendation:** Manter escopo mínimo atual. Não adicionar novos campos ao objeto `CookieConsent` sem revisão de privacidade.

---

## 7. File Exposure

### F1 — Pasta `public/` exposta integralmente (MEDIUM)
**Files:** `public/images/*.svg`, `public/favicon.svg`
**Risk:** A pasta `public/` é servida diretamente sem qualquer controle de acesso. Qualquer arquivo colocado aqui é acessível publicamente.
**Impact:** Atualmente contém apenas SVGs de placeholder e favicon — sem risco. Porém, é comum que backups, documentos ou arquivos temporários acabem em `public/`.
**Recommendation:**
1. Adicionar regra no `.gitignore` para ignorar arquivos de backup na pasta `public/`:
  ```gitignore
  public/**/*.bak
  public/**/*.tmp
  ```
2. Revisar periodicamente o conteúdo de `public/` para garantir que nenhum documento interno esteja presente.

---

## 8. LGPD & Privacy

### P1 — Rastreamento antes do consentimento (LOW)
**Risk:** Todos os scripts de terceiros são estritamente condicionados ao consentimento do usuário via `CookieConsentProvider`. Sem vazamento de dados antes do consentimento.
**Status:** ✅ Conforme — implementação correta com default `consent: false`.
**Recommendation:** Manter a verificação de consentimento em todas as funções de tracking.

### P2 — Dados coletados via analytics (LOW)
**Risk:** Quando consentido, GA4 e Meta Pixel coletam dados padrão de navegação (IP, user-agent, página visitada, cliques). Nenhum dado pessoal adicional (nome, email, telefone) é coletado pelo código do projeto.
**Impact:** Limitado aos dados padrão das plataformas de analytics.
**Recommendation:** Incluir na Política de Privacidade a lista de dados coletados por GA4 e Meta Pixel.

---

## Appendix A: Dependency Vulnerabilities

| Package | Version | Severity | Advisory | Fix Available |
|---------|---------|----------|----------|---------------|
| next | 14.2.35 | HIGH | GHSA-9g9p-9gw9-jx7f (DoS Image Opt) | 14.2.36+ / 15.x |
| postcss | 8.5.15 | MODERATE | GHSA-qx2v-qp2m-jg93 (XSS CSS) | 8.5.10+ |

**Note:** Ambas as vulnerabilidades são mitigadas no contexto do projeto (static export sem servidor, PostCSS apenas em build-time).

---

## Appendix B: Checklist de Segurança para Produção

- [ ] Adicionar `.env` ao `.gitignore`
- [ ] Configurar CSP no servidor de hospedagem
- [ ] Configurar X-Frame-Options: DENY
- [ ] Configurar Referrer-Policy: strict-origin-when-cross-origin
- [ ] Configurar Permissions-Policy (geolocation=(), microphone=(), camera=())
- [ ] Configurar X-Content-Type-Options: nosniff
- [ ] Adicionar `productionBrowserSourceMaps: false` explícito
- [ ] Substituir placeholders de analytics por IDs reais via variáveis de ambiente
- [ ] Verificar conteúdo de `public/` antes do deploy
- [ ] Incluir política de privacidade detalhando GA4 e Meta Pixel
- [ ] Remover `index.txt` do build se não for necessário
- [ ] Testar redirect HTTP → HTTPS no servidor
- [ ] Validar HSTS (Strict-Transport-Security) no servidor
