# PRD - Landing Page Desafio Feminino de Saude

## Objetivos do projeto
- Criar uma landing page de alta conversao para um desafio feminino de saude e bem-estar.
- Levar a usuaria a clicar no CTA de entrada no grupo do WhatsApp.
- Transmitir energia, transformacao, credibilidade e comunidade feminina.
- Garantir base solida para trafego pago com analytics e eventos.

## Publico-alvo
- Mulheres interessadas em saude, bem-estar, emagrecimento sustentavel e rotina saudavel.
- Perfil mobile-first, consumo de conteudo via redes sociais e WhatsApp.
- Localidade: [cidade/regiao], se aplicavel.

## Metas de conversao
- Conversao visita -> clique no WhatsApp: 8% a 25%.
- Medicao de cliques no CTA via GA4 evento customizado.
- Medicao de origem de trafego via UTM no GA4.
- Medicao de engajamento e scroll depth.

## Requisitos funcionais
- Pagina unica com seccoes: Hero, Especialistas, Cronograma, Para Quem E, CTA.
- Navbar fixa com comportamento transparente no topo e glassmorphism ao scroll.
- CTA principal em quatro pontos: hero, sticky mobile, navbar e secao CTA.
- Sticky CTA no mobile apos 300px de scroll.
- Timeline com preenchimento de linha por scroll e marcadores animados.
- Cards de especialistas com alternancia de imagem e texto.
- Animacoes de entrada por scroll com Framer Motion.
- Banner LGPD com opcoes aceitar, recusar e personalizar.
- Consentimento condicionando scripts de analytics e marketing.
- Paginas legais: /politica-de-privacidade e /termos-de-uso.
- SEO completo via Metadata API e JSON-LD do evento.
- Imagens otimizadas com next/image e prioridade no hero.

## Requisitos nao funcionais
- Performance: LCP < 2.5s, CLS = 0, INP < 200ms.
- Mobile-first rigoroso, layouts responsivos e touch targets minimos de 48px.
- Acessibilidade: alt text, contraste adequado, fontes >= 16px em inputs.
- SEO: metadata completa, OG image 1200x630, robots.txt e sitemap.xml.
- Conformidade LGPD: scripts somente apos consentimento.
- Deploy estatico com output export e trailingSlash habilitado.
- Sem dependencias extras fora das definidas no escopo.
