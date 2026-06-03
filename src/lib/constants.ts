export interface TimelineItem {
  id: string
  week: string
  title: string
  description: string
}

export const timelineData: TimelineItem[] = [
  {
    id: 'etapa-1',
    week: 'Semanas 1-2',
    title: 'Avaliacao e Fundacao',
    description:
      'Acompanhamento individualizado com nossa equipe multidisciplinar para entender seu momento, seus objetivos e tracar o plano perfeito para voce.',
  },
  {
    id: 'etapa-2',
    week: 'Semanas 3-6',
    title: 'Transformacao Ativa',
    description:
      'Inicio do protocolo personalizado com ajustes semanais. Acompanhamento proximo para garantir resultados consistentes e seguros.',
  },
  {
    id: 'etapa-3',
    week: 'Semanas 7-10',
    title: 'Consolidacao de Habitos',
    description:
      'Fortalecimento das novas rotinas e habitos saudaveis. Suporte continuo para superar desafios e manter o foco nos resultados.',
  },
  {
    id: 'etapa-4',
    week: 'Semanas 11-12',
    title: 'Resultado e Mantencao',
    description:
      'Avaliacao final dos resultados alcancados e construcao de um plano de mantencao personalizado para garantir que o progresso continue alem do desafio.',
  },
]

export interface ForWhoItem {
  id: string
  title: string
  description: string
}

export const forWhoData: ForWhoItem[] = [
  {
    id: 'para-quem-1',
    title: 'Mulheres que Desejam Emagrecer com Saude',
    description:
      'Se voce ja tentou diversas dietas sem resultados duradouros e busca um metodo que respeite seu corpo e sua rotina.',
  },
  {
    id: 'para-quem-2',
    title: 'Quem Quer Equilibrio Hormonal',
    description:
      'Para mulheres que enfrentam desregulacoes hormonais e buscam uma abordagem integrativa com acompanhamento especializado.',
  },
  {
    id: 'para-quem-3',
    title: 'Mulheres sem Tempo para Si Mesmas',
    description:
      'Se a rotina corrida te impede de cuidar da saude e voce precisa de um programa que se adapte ao seu estilo de vida.',
  },
  {
    id: 'para-quem-4',
    title: 'Quem Busca Resultados Duradouros',
    description:
      'Para quem ja esta cansada de solucoes temporarias e quer uma transformacao real que se mantenha a longo prazo.',
  },
]

export const ctaConfig = {
  totalSpots: 50,
  filledSpots: 42,
  whatsappLink: 'https://chat.whatsapp.com/LTtLly0QSHzGQl5Gqclsf2?s=cl&p=i&ilr=2',
}

export const siteConfig = {
  name: 'Desafio 21 dias por você',
  domain: 'https://example.com.br',
  logo: '/images/logo6.webp',
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
  badges: string[]
}

export const specialists: Specialist[] = [
  {
    id: 'specialist-1',
    name: 'Selena Rossi',
    specialty: 'Personal Trainer',
    bio: 'Personal Trainer graduada pela UFSM e Especialista em Saúde da Mulher, Biomecânica e Reabilitação Musculoesquelética. Com mais de 5 anos de experiência, ajudei várias mulheres a alcançarem seus objetivos de saúde e bem-estar com programas personalizados e acompanhamento dedicado.',
    image: '/images/selenaRossi.webp',
    instagram: 'https://www.instagram.com/selenarossi_personal/',
    whatsapp: 'https://wa.me/5555999501617',
    logo: '/images/logo_selenaRossi.webp',
    width: 90,
    height: 90,
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
    badges: ['CRN 54321', 'Nutrição Esportiva'],
  },
]
