import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import { siteConfig, ctaConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade do Desafio 21 dias por você — saiba como tratamos seus dados pessoais em conformidade com a LGPD.',
}

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-dark-blue pt-32 pb-16 md:pt-40 md:pb-24">
      <Container as="article" className="prose-custom max-w-3xl">
        <h1 className="heading-1 mb-2">Política de Privacidade</h1>
        <p className="body-text mb-10 text-white/50">
          Última atualização: junho de 2026
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="heading-3 mb-3">1. Quem somos</h2>
            <p className="body-text text-white/80">
              O <strong>{siteConfig.name}</strong> é um programa de 21 dias
              voltado à saúde e bem-estar feminino, organizado por Selena Rossi
              (Personal Trainer, CREF 038077-G/RS) e Rafael Falk (Nutricionista,
              CRN 18284D).
            </p>
            <p className="body-text mt-4 text-white/80">
              Esta Política de Privacidade explica como coletamos, usamos,
              armazenamos e protegemos os dados pessoais dos usuários que
              acessam nosso site e participam do desafio, em conformidade com a
              Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e as diretrizes
              da Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">2. Dados que coletamos</h2>
            <p className="body-text text-white/80">
              Podemos coletar os seguintes dados pessoais:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>
                <strong>Dados de identificação:</strong> nome, número de
                WhatsApp, endereço de e-mail.
              </li>
              <li>
                <strong>Dados de navegação:</strong> endereço IP, tipo de
                navegador, tempo de permanência, origem do
                tráfego (UTM), interações com botões e formulários.
              </li>
              <li>
                <strong>Dados de preferências:</strong> preferências de cookies
                (necessários, analytics e marketing), armazenadas localmente no
                seu navegador.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="heading-3 mb-3">3. Como coletamos</h2>
            <p className="body-text text-white/80">
              Os dados são coletados quando você:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>
                Acessa nosso site (dados de navegação e cookies).
              </li>
              <li>
                Clica em botões de CTA (WhatsApp, links externos).
              </li>
              <li>
                Interage com o banner de cookies (preferências de
                consentimento).
              </li>
              <li>
                Entra em contato conosco via WhatsApp ou e-mail.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="heading-3 mb-3">4. Finalidades do tratamento</h2>
            <p className="body-text text-white/80">
              Utilizamos seus dados para:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>
                <strong>Comunicação:</strong> entrar em contato via WhatsApp
                para fornecer informações sobre o desafio.
              </li>
              <li>
                <strong>Marketing:</strong> enviar comunicações sobre o desafio,
                ofertas e conteúdos relacionados (mediante consentimento).
              </li>
              <li>
                <strong>Analytics:</strong> melhorar a experiência do site,
                analisar padrões de uso e otimizar campanhas de tráfego pago
                (mediante consentimento).
              </li>
              <li>
                <strong>Segurança:</strong> prevenir fraudes e garantir a
                integridade do serviço.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="heading-3 mb-3">5. Cookies</h2>
            <p className="body-text text-white/80">
              Utilizamos cookies e tecnologias semelhantes para o funcionamento
              adequado do site e para melhorar sua experiência. Você pode
              gerenciar suas preferências a qualquer momento através do botão
              &ldquo;Preferências de Cookies&rdquo; no rodapé do site.
            </p>
            <p className="body-text mt-4 text-white/80">
              Classificamos os cookies em três categorias:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>
                <strong>Necessários:</strong> essenciais para o funcionamento do
                site. Não podem ser desativados.
              </li>
              <li>
                <strong>Analytics:</strong> utilizados para medir o desempenho
                do site e entender como os usuários interagem com ele (Google
                Analytics 4, Google Tag Manager).
              </li>
              <li>
                <strong>Marketing:</strong> utilizados para campanhas de
                publicidade e remarketing (Meta Pixel).
              </li>
            </ul>
            <p className="body-text mt-4 text-white/80">
              Os cookies das categorias Analytics e Marketing só serão
              ativados após seu consentimento explícito, conforme exigido pela
              LGPD.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">6. Compartilhamento de dados</h2>
            <p className="body-text text-white/80">
              Compartilhamos seus dados apenas com terceiros estritamente
              necessários para a operação do serviço:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>
                <strong>Google LLC</strong> (Google Analytics 4, Google Tag
                Manager) — para análise de audiência, mediante consentimento.
              </li>
              <li>
                <strong>Meta Platforms Inc.</strong> (Meta Pixel) — para
                campanhas de marketing, mediante consentimento.
              </li>
              <li>Não vendemos, alugamos ou transferimos seus dados a terceiros para fins não previstos nesta política.</li>
            </ul>
          </div>

          <div>
            <h2 className="heading-3 mb-3">7. Direitos do titular</h2>
            <p className="body-text text-white/80">
              Com base na LGPD, você tem os seguintes direitos sobre seus dados
              pessoais:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>Confirmar a existência de tratamento de dados.</li>
              <li>Acessar seus dados pessoais.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>
                Solicitar a anonimização, bloqueio ou eliminação de dados
                desnecessários ou tratados em desconformidade com a LGPD.
              </li>
              <li>Solicitar a portabilidade dos dados a outro fornecedor.</li>
              <li>
                Revogar o consentimento a qualquer momento, sem prejuízo da
                legalidade do tratamento realizado antes da revogação.
              </li>
            </ul>
            <p className="body-text mt-4 text-white/80">
              Para exercer seus direitos, entre em contato conosco via WhatsApp
              ou e-mail (informados no final desta página).
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">8. Armazenamento e segurança</h2>
            <p className="body-text text-white/80">
              Seus dados são armazenados em servidores seguros, com medidas
              técnicas e organizacionais adequadas para proteger contra acesso
              não autorizado, destruição, perda ou alteração. As preferências de
              cookies são armazenadas localmente no seu navegador
              (localStorage).
            </p>
            <p className="body-text mt-4 text-white/80">
              Os dados serão mantidos pelo período necessário para cumprir as
              finalidades descritas nesta política, salvo obrigação legal de
              retenção por prazo superior.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">9. Contato</h2>
            <p className="body-text text-white/80">
              Se você tiver dúvidas sobre esta Política de Privacidade ou desejar
              exercer seus direitos como titular, entre em contato:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>
                <strong>WhatsApp:</strong>{' '}
                <a
                  href={ctaConfig.selenaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-blue underline transition-colors hover:text-neon-green"
                >
                  Clique aqui para falar conosco
                </a>
              </li>
              <li>
                <strong>Responsável pelos dados:</strong> Selena Rossi —
                Personal Trainer
              </li>
            </ul>
          </div>

          <div>
            <h2 className="heading-3 mb-3">10. Alterações nesta política</h2>
            <p className="body-text text-white/80">
              Esta política pode ser atualizada periodicamente para refletir
              mudanças nas práticas de tratamento de dados ou na legislação
              aplicável. Recomendamos que você revise esta página regularmente.
              A data da última atualização está indicada no início do documento.
            </p>
          </div>
        </section>
      </Container>
    </div>
  )
}
