# Integracao Mercado Pago - Guia Pratico

## Duas Formas de Integrar

### Forma 1: Link de Pagamento (Sem Programacao — Recomendado)

Criar um link de pagamento diretamente no painel do Mercado Pago e usar no site.

#### Passo a Passo

**Pelo celular (app Mercado Pago):**
1. Abra o app Mercado Pago
2. Toque em **"Cobrar"**
3. Digite o valor: **R$ 97,00**
4. Adicione descricao: "Desafio 21 Dias por Voce"
5. Toque em **"Gerar link"**
6. Copie o link gerado (algo como `https://mpago.la/XXXXX`)

**Pelo computador:**
1. Acesse https://www.mercadopago.com.br
2. Va em **"Cobrar"** > **"Link de pagamento"**
3. Preencha valor e descricao
4. Clique em **"Gerar link"**
5. Copie o link

#### Configurar no Site

1. Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_MERCADO_PAGO_LINK=https://mpago.la/SEU_LINK_AQUI
```

2. Pronto! O botao "Pagar com PIX" no `/checkout` ja vai redirecionar para o link.

---

### Forma 2: Checkout Pro com SDK (Precisa de Servidor)

Se quiser gerar a preferencia dinamicamente (com nome do produto, valor, etc.), precisa:
1. Remover `output: 'export'` do `next.config.mjs`
2. Instalar SDK: `npm install mercadopago`
3. Criar API Route para criar preferencia

#### Instalar SDK

```bash
npm install mercadopago
```

#### Criar API Route

**`src/app/api/mercadopago/create-preference/route.ts`**:

```typescript
import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const { title, price, quantity } = await req.json()

    const preference = new Preference(client)
    const result = await preference.create({
      body: {
        items: [
          {
            title,
            quantity,
            unit_price: price,
            currency_id: 'BRL',
          },
        ],
        payment_methods: {
          excluded_payment_types: [],
          installments: 1,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/erro`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pendente`,
        },
        auto_return: 'approved',
      },
    })

    return NextResponse.json({
      initPoint: result.init_point,
      preferenceId: result.id,
    })
  } catch (error) {
    console.error('Erro ao criar preferencia:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 },
    )
  }
}
```

#### Credenciais

1. Acesse https://www.mercadopago.com.br/developers/panel
2. Crie uma **nova aplicacao**
   - Nome: "Desafio 21 Dias"
   - Tipo: "Pagamentos online"
   - Produto: "Checkout Pro"
3. Copie o **Access Token** (producao ou teste)
4. Adicione ao `.env.local`:

```env
MERCADO_PAGO_ACCESS_TOKEN=APP_USB-XXXXXXXXX
MERCADO_PAGO_PUBLIC_KEY=APP_USb-XXXXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Cartoes de Teste (sandbox)

| Bandeira   | Numero                 | CVV | Validade  |
|------------|------------------------|-----|-----------|
| Mastercard | 5031 4332 1540 6351    | 123 | 11/2025   |
| Visa       | 4235 6477 2802 5682    | 123 | 11/2025   |
| Amex       | 3754 4323 5400 0001    | 123 | 11/2025   |

#### Ambiente de Teste

Para testar sem dinheiro real:
1. No painel do Mercado Pago, va em **"Suas integracoes"** > **"Testes"**
2. Use as **credenciais de teste** (comecam com `TEST-`)
3. Use os **cartoes de teste** acima
4. Para PIX em teste: o QR Code gerado pode ser pago com os cartoes de teste

## Variaveis de Ambiente

| Variavel | Forma 1 (Link) | Forma 2 (SDK) |
|----------|---------------|---------------|
| `NEXT_PUBLIC_MERCADO_PAGO_LINK` | Obrigatorio | Opcional |
| `MERCADO_PAGO_ACCESS_TOKEN` | — | Obrigatorio |
| `MERCADO_PAGO_PUBLIC_KEY` | — | Opcional |
| `NEXT_PUBLIC_SITE_URL` | — | Obrigatorio |

## Fluxo Completo

```
Pagina Inicial
  │  CTA "Quero Participar"
  ▼
/inscricao (video explicativo)
  │  Botao "Me Inscrever"
  ▼
/checkout (resumo do pedido)
  │  Botao "Pagar com PIX"
  ▼
Mercado Pago (Link de Pagamento ou Checkout Pro)
  │  Pagamento via PIX
  ▼
Confirmacao (cliente recebe acesso)
```

## Links Uteis

- [Painel do Desenvolvedor](https://www.mercadopago.com.br/developers/panel)
- [SDK Node.js (npm)](https://www.npmjs.com/package/mercadopago)
- [Documentacao Checkout Pro](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/overview)
- [API de Preferencias](https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post)
