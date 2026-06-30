import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidade | Pais pelos filhos na Escola",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-[#ffa900] md:text-xl">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm md:text-base">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF7900]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PoliticasPage() {
  return (
    <>
      <div className="relative min-h-[70vh] overflow-hidden bg-[#0D2A4C] font-[family-name:var(--font-roboto)] text-white">
        <div className="absolute inset-0 opacity-[0.05]">
          <Image
            src="/img/9320666.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1140px] px-4 py-8 md:py-14">
          <div className="flex flex-col items-center">
            <Link href="/" className="transition hover:opacity-90">
              <Image
                src="/img/logo-pais-pelos-filhos-naescola.png"
                alt="Pais pelos filhos na Escola"
                width={500}
                height={164}
                priority
                className="h-auto w-full max-w-[288px] md:max-w-[420px]"
              />
            </Link>

            <article className="mt-8 w-full max-w-[800px] overflow-hidden rounded-2xl border border-gray-400/50 bg-[#132f52] md:mt-10">
              <header className="border-b border-gray-400/30 px-6 py-6 text-center md:px-10 md:py-8">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF7900]">
                  Transparência e LGPD
                </p>
                <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                  Política de Privacidade
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 md:text-base">
                  Abaixo-Assinado: SOS – PAIS, PROTEJAM SEUS FILHOS NA ESCOLA
                </p>
              </header>

              <div className="space-y-8 px-6 py-8 text-base leading-relaxed text-white/90 md:px-10 md:py-10 md:text-lg">
                <div className="space-y-4">
                  <p>
                    Esta Política de Privacidade descreve como os dados pessoais dos
                    cidadãos são coletados, utilizados, armazenados e protegidos no
                    âmbito do abaixo-assinado{" "}
                    <strong className="text-white">
                      “SOS – PAIS, PROTEJAM SEUS FILHOS NA ESCOLA”
                    </strong>
                    , que tem como objetivo apoiar a criação da Lei Municipal de
                    Transparência e do Conselho de Pais nas cidades brasileiras.
                  </p>
                  <p>
                    Ao assinar este abaixo-assinado, você concorda com os termos desta
                    Política.
                  </p>
                </div>

                <Section title="1. Quais dados coletamos">
                  <p>
                    Coletamos apenas os dados estritamente necessários para validar a
                    assinatura e fortalecer a mobilização social:
                  </p>
                  <List
                    items={[
                      "Nome completo",
                      "Número de WhatsApp",
                      "Estado",
                      "Cidade",
                    ]}
                  />
                  <p>
                    Não coletamos dados sensíveis, como informações financeiras,
                    religiosas, políticas partidárias, de saúde ou dados de crianças.
                  </p>
                </Section>

                <Section title="2. Finalidade da coleta">
                  <p>Os dados são utilizados para:</p>
                  <List
                    items={[
                      "Validar assinaturas e evitar duplicidades",
                      "Contabilizar assinaturas por cidade e estado",
                      "Exibir rankings públicos de cidades sem divulgar dados pessoais",
                    ]}
                  />
                  <p>Entrar em contato com o assinante para:</p>
                  <List
                    items={[
                      "Enviar atualizações sobre o andamento da iniciativa",
                      "Informar ações relacionadas à criação da Lei Municipal de Transparência",
                      "Divulgar conteúdos informativos ligados à defesa da infância e participação dos pais na educação",
                    ]}
                  />
                  <p>Os dados não serão utilizados para fins comerciais.</p>
                </Section>

                <Section title="3. Consentimento">
                  <p>Ao marcar a opção:</p>
                  <blockquote className="rounded-lg border border-white/10 bg-[#0D2A4C]/50 px-4 py-3 text-sm italic text-white/85 md:text-base">
                    “Ao assinar, autorizo os responsáveis por este abaixo-assinado a
                    entrarem em contato comigo…”
                  </blockquote>
                  <p>
                    o usuário concede consentimento livre, informado e inequívoco,
                    conforme a Lei Geral de Proteção de Dados (LGPD – Lei nº
                    13.709/2018).
                  </p>
                  <p>O consentimento pode ser revogado a qualquer momento.</p>
                </Section>

                <Section title="4. Compartilhamento de dados">
                  <p>
                    Os dados pessoais não são vendidos, alugados ou compartilhados com
                    terceiros, exceto:
                  </p>
                  <List
                    items={[
                      "Quando necessário para apresentação institucional do projeto a autoridades públicas (sem exposição individual dos dados)",
                      "Quando exigido por lei ou ordem judicial",
                    ]}
                  />
                  <p>
                    Em nenhuma hipótese o número de WhatsApp ou o nome completo do
                    assinante será exibido publicamente.
                  </p>
                </Section>

                <Section title="5. Exibição pública de informações">
                  <p>
                    As seguintes informações podem ser exibidas publicamente, de forma
                    agrupada e estatística:
                  </p>
                  <List
                    items={["Nome da cidade", "Estado", "Quantidade total de assinaturas"]}
                  />
                  <p>
                    Nenhum dado pessoal identificável será exibido nos rankings ou
                    placares.
                  </p>
                </Section>

                <Section title="6. Armazenamento e segurança">
                  <p>
                    Os dados são armazenados em ambiente seguro, com medidas técnicas e
                    administrativas adequadas para proteger contra:
                  </p>
                  <List
                    items={[
                      "Acesso não autorizado",
                      "Vazamento",
                      "Alteração indevida",
                      "Uso indevido",
                    ]}
                  />
                  <p>Somente pessoas autorizadas têm acesso aos dados.</p>
                </Section>

                <Section title="7. Tempo de retenção">
                  <p>Os dados serão mantidos:</p>
                  <List
                    items={[
                      "Enquanto o abaixo-assinado estiver ativo",
                      "Pelo tempo necessário para comprovação da mobilização social",
                      "Ou até solicitação de exclusão pelo titular dos dados",
                    ]}
                  />
                  <p>
                    Após esse período, os dados poderão ser anonimizados ou excluídos.
                  </p>
                </Section>

                <Section title="8. Direitos do titular dos dados">
                  <p>
                    De acordo com a LGPD, o titular pode, a qualquer momento:
                  </p>
                  <List
                    items={[
                      "Confirmar a existência de tratamento de dados",
                      "Acessar seus dados",
                      "Corrigir dados incompletos ou desatualizados",
                      "Solicitar a exclusão dos dados",
                      "Revogar o consentimento",
                      "Solicitar informações sobre o uso dos dados",
                    ]}
                  />
                </Section>

                <Section title="9. Solicitações e contato">
                  <p>
                    Para exercer seus direitos ou esclarecer dúvidas sobre esta
                    Política de Privacidade, o titular pode entrar em contato pelo
                    canal oficial informado na página do abaixo-assinado.
                  </p>
                </Section>

                <Section title="10. Atualizações desta política">
                  <p>
                    Esta Política de Privacidade pode ser atualizada a qualquer momento
                    para adequação legal ou melhoria da transparência. A versão
                    atualizada estará sempre disponível nesta página.
                  </p>
                </Section>

                <div className="border-t border-gray-400/30 pt-6 text-center">
                  <Link
                    href="/#assinar"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF7900] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#e56d00]"
                  >
                    Voltar ao abaixo-assinado
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
