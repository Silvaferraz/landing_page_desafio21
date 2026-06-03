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
  badges: string[]
}

export const specialists: Specialist[] = [
  {
    id: 'specialist-1',
    name: 'Selena Rossi',
    specialty: 'Nutricionista Clínica',
    bio: 'Especialista em nutrição feminina com mais de 10 anos de experiência. Referência em reeducação alimentar para mulheres que buscam saúde e bem-estar de forma sustentável.',
    image: '/images/specialist-1.svg',
    instagram: 'https://instagram.com/',
    badges: ['CREF 038077-G/RS', 'Pós-graduada'],
  },
  {
    id: 'specialist-2',
    name: 'Dra. Beatriz Santos',
    specialty: 'Endocrinologista',
    bio: 'Médica endocrinologista dedicada ao equilíbrio hormonal feminino. Abordagem integrativa que une ciência e cuidado individualizado para resultados duradouros.',
    image: '/images/specialist-2.svg',
    instagram: 'https://instagram.com/',
    badges: ['CRM 54321', 'RQE 9876'],
  },
  {
    id: 'specialist-3',
    name: 'Dra. Carla Oliveira',
    specialty: 'Psicóloga Comportamental',
    bio: 'Psicóloga especializada em comportamento alimentar e saúde mental da mulher. Ajuda milhares de mulheres a desenvolverem uma relação saudável com o corpo e a comida.',
    image: '/images/specialist-3.svg',
    instagram: 'https://instagram.com/',
    badges: ['CRP 67890', 'Mestre em Psicologia'],
  },
]
