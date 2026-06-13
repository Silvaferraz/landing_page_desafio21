export interface TimelineItem {
  id: string
  week: string
  title: string
  description: string
}

export const timelineData: TimelineItem[] = [
  {
    id: 'etapa-1',
    week: 'Semana 1',
    title: 'Ativação',
    description:
      'Treinos leves de adaptação, conteúdos motivacionais e integração do grupo.',
  },
  {
    id: 'etapa-2',
    week: 'Semana 2',
    title: 'Evolução',
    description:
      'Aumento progressivo da intensidade, lives com especialistas convidados da área da saúde e bem estar (nutricionistas, terapeutas e outros) convidados e sorteios.',
  },
  {
    id: 'etapa-3',
    week: 'Semana 3',
    title: 'Consolidação',
    description:
      'Treinos desafiadores, celebração de conquistas e encerramento com evento especial.',
  },
  {
    id: 'etapa-4',
    week: 'Durante o desafio',
    title: 'O que você recebe',
    description:
      'Treinos em vídeo + Lives semanais com convidados + Grupo Exclusivo no whatsapp + Materiais educativos + Sorteios e Brindes dos parceiros',
  },
]

export interface ForWhoItem {
  id: string
  title: string
  description: string
  icon: string
}

export const forWhoData: ForWhoItem[] = [
  {
    id: 'para-quem-1',
    title: 'Deseja entender seu corpo e suas necessidades',
    description:
      'Para mulheres que querem aprender a ouvir seu corpo, entender seus sinais e necessidades para cuidar da saúde de forma mais consciente e eficaz.',
    icon: '/images/icone1.webp',
  },
  {
    id: 'para-quem-2',
    title: 'Quem quer Equilibrio Hormonal',
    description:
      'Para mulheres que enfrentam desregulações hormonais e buscam uma abordagem integrativa com acompanhamento especializado.',
    icon: '/images/icone2.webp',
  },
  {
    id: 'para-quem-3',
    title: 'Mulheres sem tempo para si mesmas',
    description:
      'Se a rotina corrida te impede de cuidar da saúde e você precisa de um programa que se adapte ao seu estilo de vida.',
    icon: '/images/icone3.webp',
  },
  {
    id: 'para-quem-4',
    title: 'Quem busca Resultados Duradouros',
    description:
      'Para quem ja está cansada de soluções temporárias e quer uma transformação real que se mantenha a longo prazo.',
    icon: '/images/icone4.webp',
  },
]

export const ctaConfig = {
  totalSpots: 50,
  filledSpots: 42,
  whatsappLink: 'https://chat.whatsapp.com/LTtLly0QSHzGQl5Gqclsf2?s=cl&p=i&ilr=2',
  selenaLink: 'https://wa.me/5555999501617',
}

export const siteConfig = {
  name: 'Desafio 21 dias por você',
  domain: 'https://desafio21dias-psi.vercel.app',
  responsible: 'Selena Rossi',
  logo: '/images/logo6.webp',
}

export interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  active: boolean
  maxUses?: number
  usedCount?: number
}

export const coupons: Coupon[] = [
  {
    code: 'DESAFIO10',
    discount: 10,
    type: 'percentage',
    active: true,

  },
  {
    code: 'DESAFIO21',
    discount: 21,
    type: 'percentage',
    active: true,
    maxUses: 10,
  },
]

export const paymentConfig = {
  price: 69.90,
  productName: 'Desafio 21 Dias por Você',
  mercadoPagoLink: process.env.NEXT_PUBLIC_MERCADO_PAGO_LINK || '',
  mercadoPagoPublicKey: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || '',
}

export interface Specialist {
  id: string
  name: string
  specialty: string
  bio: string
  image: string
  instagram: string
  whatsapp: string
  logo: string
  width: number
  height: number
  objectPosition: string
  badges: string[]
}

export const specialists: Specialist[] = [
  {
    id: 'specialist-1',
    name: 'Selena Rossi',
    specialty: 'Personal Trainer',
    bio: 'Personal Trainer graduada pela UFSM e Especialista em Saúde da Mulher, Biomecânica e Reabilitação Musculoesquelética. Com mais de 5 anos de experiência, ajudei várias mulheres a alcançarem seus objetivos de saúde e bem-estar com programas personalizados e acompanhamento dedicado.',
    image: '/images/selenaRossi2.webp',
    instagram: 'https://www.instagram.com/selenarossi_personal/',
    whatsapp: 'https://wa.me/5555999501617',
    logo: '/images/logo_selenaRossi.webp',
    width: 90,
    height: 90,
    objectPosition: '1%',
    badges: ['CREF 038077-G/RS', 'Saúde da Mulher'],
  },
  {
    id: 'specialist-2',
    name: 'Rafael Falk',
    specialty: 'Nutricionista',
    bio: 'Nutricionista graduado pela UFN especializando-se em Nutrição Esportiva e Estética. Trabalha com planos personalizados para melhorar desempenho, saúde e composição corporal, sempre com embasamento científico.',
    image: '/images/rafaelFalk.webp',
    instagram: 'https://www.instagram.com/rafa.falk/',
    whatsapp: 'https://wa.me/5555996326861',
    logo: '/images/logo_rafaelFalk.webp',
    width: 110,
    height: 110,
    objectPosition: '70%',
    badges: ['CRN 18284D', 'Nutrição Esportiva'],
  },
]
