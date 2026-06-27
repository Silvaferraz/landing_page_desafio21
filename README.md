# Desafio 21 Dias por Você

Landing page de alta conversão para o **Desafio 21 Dias por Você**, um programa intensivo de 3 semanas para mulheres que desejam recuperar o controle da saúde com acompanhamento especializado. Criado pela personal trainer **Selena Rossi**.

## Stack

| Categoria | Tecnologia |
|-----------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| **Estilização** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Animação** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Pagamento** | [Mercado Pago](https://www.mercadopago.com.br/) (SDK React + Node) |
| **Banco KV** | [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (Redis) |
| **Analytics** | Google Analytics 4 + Meta Pixel |
| **Fontes** | Locais (Aileron Heavy + Century Gothic) via `next/font/local` |
| **Formatação** | ESLint (Next.js core-web-vitals) |
| **Otimização** | Sharp (imagens em AVIF/WebP) |
| **Deploy** | [Vercel](https://vercel.com) (static export + serverless) |

## Estrutura do Projeto

```
src/
├── app/
│   ├── (home)/                 # Rotas com layout principal (Navbar + Footer)
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Layout com Navbar, Footer, StickyCTA
│   │   ├── politica-de-privacidade/page.tsx
│   │   └── termos-de-uso/page.tsx
│   ├── (simple)/               # Rotas com layout limpo (sem Navbar/Footer)
│   │   ├── checkout/page.tsx   # Página de pagamento (PIX + Cartão)
│   │   ├── inscricao/page.tsx  # Página de inscrição com vídeo
│   │   ├── obrigado/           # Página pós-pagamento
│   │   └── layout.tsx
│   ├── api/
│   │   ├── create-pix/         # Gera cobrança PIX no Mercado Pago
│   │   ├── create-preference/  # Cria preferência de pagamento (redirect)
│   │   ├── check-payment/      # Polling de status do pagamento
│   │   ├── process-card-payment/ # Processa pagamento com cartão
│   │   ├── validate-coupon/    # Valida cupom de desconto
│   │   ├── use-coupon/         # Incrementa uso do cupom
│   │   └── webhook/            # Webhook de notificações MP
│   ├── globals.css             # Tailwind + classes utilitárias
│   ├── layout.tsx              # Root layout (fontes, SEO, LGPD)
│   ├── robots.ts               # Configuração SEO robots.txt
│   └── sitemap.ts              # Gerador de sitemap.xml
├── components/
│   ├── analytics/              # Google Analytics, Meta Pixel, trackers
│   ├── layout/                 # Navbar e Footer
│   ├── lgpd/                   # Cookie banner, modal, botão de preferências
│   ├── sections/               # Seções da landing page
│   └── ui/                     # Componentes reutilizáveis
├── context/                    # CookieConsentContext
├── fonts/                      # Fontes locais (woff2)
└── lib/                        # Utilitários, constantes, analytics, animações
```

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page principal com hero, especialistas, timeline, para quem é, CTA |
| `/inscricao` | Página de inscrição com vídeo do YouTube explicativo |
| `/checkout` | Checkout com pagamento via PIX ou cartão de crédito (Mercado Pago) |
| `/obrigado` | Confirmação de pagamento com link do grupo exclusivo do WhatsApp |
| `/politica-de-privacidade` | Política de privacidade (LGPD) |
| `/termos-de-uso` | Termos de uso |

## Funcionalidades

### Mercado Pago (Pagamentos)
- **PIX**: Gera QR Code dinâmico via API. Polling a cada 3s para detectar aprovação e redirecionar automaticamente.
- **Cartão**: Checkout transparente com `CardPayment` do `@mercadopago/sdk-react`. Suporte a parcelamento em até 6x.
- **Cupons**: Sistema de cupons com desconto percentual ou fixo, limite de usos, validado server-side.
- **Webhook**: Endpoint `/api/webhook` com verificação de assinatura HMAC-SHA256. Incrementa uso de cupom automaticamente ao aprovar pagamento.

### LGPD / Consentimento de Cookies
- Banner de cookies com aceitar/rejeitar/preferências personalizadas.
- Consentimento categorizado em **analytics** (GA4, scroll/click tracking) e **marketing** (Meta Pixel).
- Armazenamento em `localStorage`. Componentes de tracking só carregam após consentimento.

### Analytics
- **Google Analytics 4**: Via `@next/third-parties/google`.
- **Meta Pixel**: Script carregado condicionalmente com consentimento.
- **Eventos customizados**: `trackEvent()` unificado para dataLayer, gtag e fbq.
- **Scroll tracking**: Dispara eventos em 25%, 50%, 75%, 100%.
- **Click tracking**: Captura cliques em elementos com atributo `data-cta`.

### SEO
- Metadados completos (Open Graph, Twitter Cards, JSON-LD structured data).
- Sitemap automático (`/sitemap.xml`), robots.txt.
- Fontes locais pré-carregadas para melhor performance.
- Imagens otimizadas (WebP/AVIF) com lazy loading.

### Design System
- **Cores**: Deep Blue `#0B008A`, Neon Green `#99FF00`, Sky Blue `#67AFFF`
- **Fontes**: Aileron Heavy (títulos grandes), Century Gothic (corpo/textos)
- **Efeitos**: Glassmorphism, gradientes, sombras neon
- **Animações**: Framer Motion com variantes (fadeUp, fadeLeft, fadeRight, fadeScale, stagger)

## Fluxo do Usuário

```
Landing Page → Inscrição (vídeo) → Checkout (PIX/Cartão) → Obrigado → WhatsApp
```

1. Usuário acessa a landing page e conhece o programa
2. Clica em "Quero Participar" → `/inscricao`
3. Assistir vídeo explicativo → clica "Me Inscrever" → `/checkout`
4. Aplica cupom (opcional), escolhe PIX ou cartão e paga
5. PIX: escaneia QR Code ou copia código → pagamento detectado → redireciona
6. Cartão: formulário embutido → processamento → redireciona
7. `/obrigado`: botão para entrar no grupo exclusivo do WhatsApp

## Scripts

```bash
npm run dev      # Iniciar servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Iniciar servidor de produção
npm run lint     # Verificar lint (Next.js)
```

### Otimização de Imagens

```bash
node scripts/optimize-images.mjs
```

Usa Sharp para redimensionar, comprimir (WebP/JPEG quality 80) e gerar imagens faltantes (favicon, og-image).

## Configuração de Conteúdo

Todas as constantes editáveis em `src/lib/constants.ts`:

- **`timelineData`**: Etapas do desafio (ativação, evolução, consolidação)
- **`forWhoData`**: Público-alvo com ícones
- **`specialists`**: Especialistas (Selena Rossi - Personal, Rafael Falk - Nutricionista)
- **`coupons`**: Cupons de desconto (código, valor, tipo, limite de usos)
- **`paymentConfig`**: Preço, nome do produto, chaves MP
- **`ctaConfig`**: Total de vagas, link do WhatsApp, link da Selena
- **`siteConfig`**: Nome do site, domínio, responsável, logo

## API Routes

| Rota | Método | Descrição |
|------|--------|-----------|
| `/api/create-pix` | POST | Gera cobrança PIX via Mercado Pago |
| `/api/create-preference` | POST | Cria preferência de pagamento (redirect Checkout Pro) |
| `/api/process-card-payment` | POST | Processa pagamento com cartão (tokenize) |
| `/api/check-payment` | GET | Verifica status de um pagamento por ID |
| `/api/validate-coupon` | POST | Valida cupom e retorna preço com desconto |
| `/api/use-coupon` | POST | Incrementa contador de uso do cupom |
| `/api/webhook` | POST | Webhook Mercado Pago (notificações de pagamento) |

## Deploy

O deploy é feito na **Vercel**. Adicionar todas as variáveis de ambiente no dashboard da Vercel.

> ⚠️ O webhook do Mercado Pago precisa ser configurado no painel MP com a URL `https://SEU_DOMINIO/api/webhook`, evento **Pagamento (payment)**. A chave de assinatura secreta gerada deve ser adicionada como `MERCADO_PAGO_WEBHOOK_SECRET`.
