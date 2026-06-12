import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import { siteConfig, ctaConfig, specialists } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos de Uso do Desafio 21 dias por você — condições gerais para participação no programa de saúde e bem-estar feminino.',
}

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-dark-blue pt-32 pb-16 md:pt-40 md:pb-24">
      <Container as="article" className="prose-custom max-w-3xl">
        <h1 className="heading-1 mb-2">Termos de Uso</h1>
        <p className="body-text mb-10 text-white/50">
          Última atualização: junho de 2026
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="heading-3 mb-3">1. Aceitação dos termos</h2>
            <p className="body-text text-white/80">
              Ao acessar o site e/ou participar do{' '}
              <strong>{siteConfig.name}</strong>, você declara ter lido,
              compreendido e aceitado integralmente os presentes Termos de Uso.
              Caso não concorde com qualquer condição aqui estabelecida, você
              não deve utilizar o site ou se inscrever no programa.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">2. O serviço</h2>
            <p className="body-text text-white/80">
              O {siteConfig.name} é um programa online de 21 dias voltado à
              saúde e bem-estar feminino, coordenado pelos profissionais:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              {specialists.map((s) => (
                <li key={s.id}>
                  <strong>{s.name}</strong> — {s.specialty} ({s.badges.join(', ')})
                </li>
              ))}
            </ul>
            <p className="body-text mt-4 text-white/80">
              O programa inclui acesso a treinos em vídeo, lives semanais,
              grupo exclusivo no WhatsApp, materiais educativos e sorteios,
              conforme descrito no site.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">3. Inscrição e participação</h2>
            <p className="body-text text-white/80">
              Para se inscrever, você deve clicar no botão de CTA (WhatsApp) e
              seguir as instruções fornecidas. Ao se inscrever, você declara
              que:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>Tem 18 anos ou mais, ou está devidamente autorizada por seu responsável legal.</li>
              <li>
                As informações fornecidas são verdadeiras e atualizadas.
              </li>
              <li>
                Está ciente de que o programa não substitui acompanhamento
                médico, nutricional ou psicológico individualizado.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="heading-3 mb-3">4. Isenção de responsabilidade</h2>
            <p className="body-text text-white/80">
              O {siteConfig.name} é um programa de bem-estar geral e não se
              destina a diagnosticar, tratar, curar ou prevenir qualquer doença
              ou condição médica. Consulte um profissional de saúde qualificado
              antes de iniciar qualquer programa de exercícios ou mudanças
              alimentares.
            </p>
            <p className="body-text mt-4 text-white/80">
              Os resultados variam de pessoa para pessoa e dependem de fatores
              como comprometimento, regularidade, condições de saúde
              pré-existentes e estilo de vida. Não garantimos resultados
              específicos de emagrecimento, ganho de massa muscular ou qualquer
              outro benefício.
            </p>
            <p className="body-text mt-4 text-white/80">
              Os profissionais responsáveis pelo programa são credenciados em
              suas respectivas áreas (CREF e CRN), mas o acompanhamento remoto
              via WhatsApp não substitui consultas presenciais ou
              individualizadas.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">5. Propriedade intelectual</h2>
            <p className="body-text text-white/80">
              Todo o conteúdo disponibilizado no site e no programa (textos,
              imagens, vídeos, logos, materiais educativos) é de propriedade dos
              organizadores ou licenciado para uso. É proibida a reprodução,
              distribuição, modificação ou comercialização de qualquer conteúdo
              sem autorização prévia por escrito.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">6. Conduta do usuário</h2>
            <p className="body-text text-white/80">
              Ao participar do grupo exclusivo no WhatsApp, você se compromete
              a manter uma conduta respeitosa e colaborativa. Não é permitido:
            </p>
            <ul className="body-text mt-3 list-disc pl-6 text-white/80">
              <li>Compartilhar conteúdo ofensivo, discriminatório ou ilegal.</li>
              <li>Divulgar materiais do programa para terceiros não inscritos.</li>
              <li>Enviar mensagens não solicitadas (spam) ou conteúdo comercial.</li>
              <li>
                Compartilhar dados pessoais de outros participantes sem
                autorização.
              </li>
            </ul>
            <p className="body-text mt-4 text-white/80">
              O descumprimento destas regras poderá resultar na remoção do
              participante do grupo sem reembolso.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">7. Cancelamento e reembolso</h2>
            <p className="body-text text-white/80">
              O participante tem direito de solicitar cancelamento e reembolso
              em até 7 dias após a inscrição, conforme previsto no Código de
              Defesa do Consumidor (Lei nº 8.078/90), desde que não tenha
              acessado o conteúdo programático. Após esse período, não haverá
              reembolso.
            </p>
            <p className="body-text mt-4 text-white/80">
              Para solicitar cancelamento, entre em contato via WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">8. Comunicações</h2>
            <p className="body-text text-white/80">
              Ao se inscrever, você autoriza o recebimento de comunicações
              relacionadas ao programa via WhatsApp e e-mail. Você pode
              solicitar a exclusão de listas de transmissão a qualquer momento.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">9. Disposições gerais</h2>
            <p className="body-text text-white/80">
              Estes Termos de Uso são regidos pela legislação brasileira. Fica
              eleito o foro da comarca de Santa Maria, RS, para dirimir
              quaisquer controvérsias decorrentes destes termos.
            </p>
            <p className="body-text mt-4 text-white/80">
              Caso qualquer disposição destes Termos seja considerada inválida
              ou inexequível, as demais disposições permanecerão em pleno vigor.
            </p>
            <p className="body-text mt-4 text-white/80">
              Estes Termos podem ser alterados a qualquer momento, mediante
              comunicação aos participantes e/ou publicação no site.
            </p>
          </div>

          <div>
            <h2 className="heading-3 mb-3">10. Contato</h2>
            <p className="body-text text-white/80">
              Para dúvidas sobre estes Termos de Uso, entre em contato:
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
                <strong>Organizadores:</strong> {specialists.map((s) => s.name).join(' e ')}
              </li>
            </ul>
          </div>
        </section>
      </Container>
    </div>
  )
}
