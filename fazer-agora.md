# 🔧 Passos para tudo funcionar

## 1. Credenciais do Mercado Pago

No painel do Mercado Pago (https://www.mercadopago.com.br/settings/account/credentials):
1. Pegar o **Access Token** (production)
2. Pegar a **Public Key** (production)

Colocar no arquivo `.env.local`:
```env
MERCADO_PAGO_ACCESS_TOKEN=APP_USb-SEU_ACCESS_TOKEN
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=APP_USb-SUA_PUBLIC_KEY
NEXT_PUBLIC_SITE_URL=https://desafio21dias-psi.vercel.app
```

## 2. Configurar Webhook no Mercado Pago

No painel do Mercado Pago > Notificações > **Webhooks** (o primeiro, NÃO o IPN):
- Clicar em "Adicionar Webhook"
- URL: `https://desafio21dias-psi.vercel.app/api/webhook`
- Evento: marcar **Pagamento (payment)**
- Salvar

Depois de salvar, vai aparecer um campo **"Chave de assinatura secreta"** — copiar ela e adicionar nas variáveis de ambiente:
- `.env.local`: `MERCADO_PAGO_WEBHOOK_SECRET=chave_que_gerou`
- Vercel: `MERCADO_PAGO_WEBHOOK_SECRET`

> ⚠️ Use **Webhooks**, não IPN. Nosso código espera o formato do Webhook. O IPN é o sistema antigo e o formato dos dados é diferente.

## 3. Testar o fluxo completo

Rodar local:
```bash
npm run dev
```

Testar o fluxo:
1. Acessar `/inscricao` → assistir vídeo → clicar "Me Inscrever"
2. Em `/checkout` → aplicar cupom (opcional) → clicar "Pagar com PIX"
3. Mercado Pago abre → pagar (usar cartão de teste do MP no sandbox)
4. Ser redirecionado automaticamente para `/obrigado`
5. Clicar no botão "Entrar no Grupo Exclusivo do WhatsApp"

## 4. Deploy na Vercel

Após testar local, fazer deploy normal na Vercel.
**Atenção:** Adicionar as variáveis de ambiente no dashboard da Vercel:
- `MERCADO_PAGO_ACCESS_TOKEN`
- `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`
- `NEXT_PUBLIC_SITE_URL` (= URL do site na Vercel)
- `NEXT_PUBLIC_MERCADO_PAGO_LINK` (fallback)

## 5. Cupons de desconto

Editar `src/lib/constants.ts` — array `coupons`:
```ts
{ code: 'CUPOM10', discount: 10, type: 'percentage' }  // 10% OFF
{ code: 'CUPOM20', discount: 20, type: 'fixed' }         // R$ 20 OFF
```
- `type: 'percentage'` → desconto percentual
- `type: 'fixed'` → desconto em reais
- `active: false` → desativa o cupom sem deletar

## 6. Link do WhatsApp do grupo

Editar `src/lib/constants.ts` — `ctaConfig.whatsappLink`:
```ts
whatsappLink: 'https://chat.whatsapp.com/SEU_LINK_AQUI'
```
