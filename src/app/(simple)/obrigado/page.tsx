import type { Metadata } from 'next'
import ObrigadoClient from './ObrigadoClient'

export const metadata: Metadata = {
  title: 'Inscricao Confirmada | Desafio 21 dias por voce',
  description:
    'Sua inscricao foi confirmada! Entre no grupo exclusivo do WhatsApp e comece sua transformacao.',
}

export default function ObrigadoPage() {
  return <ObrigadoClient />
}
