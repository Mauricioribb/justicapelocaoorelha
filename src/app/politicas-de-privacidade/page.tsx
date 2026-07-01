import Link from "next/link";
import { TarifaZeroPageShell } from "@/components/TarifaZeroPageShell";

export const metadata = {
  title: "Política de Privacidade | Tarifa Zero Já",
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
      <h2 className="text-lg font-semibold text-[#080301] md:text-xl">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E46C17]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PoliticasPage() {
  return (
    <TarifaZeroPageShell>
      <article className="mt-8 w-full max-w-[800px] overflow-hidden rounded-[10px] bg-white p-6 text-[#54595F] shadow-[0_0_10px_rgba(0,0,0,0.18)] md:mt-10 md:p-10">
        <div className="space-y-5 text-base leading-relaxed md:text-[15px]">
          <h1 className="text-xl font-semibold text-[#080301] md:text-2xl">
            Política de Privacidade e Proteção de Dados
          </h1>

          <h2 className="text-lg font-semibold text-[#080301] md:text-xl">
            Movimento Projeto de Lei Tarifa Zero Já
          </h2>

          <p>
            O{" "}
            <strong className="font-bold text-[#E46C17]">
              Movimento Projeto de Lei Tarifa Zero Já
            </strong>{" "}
            valoriza a confiança depositada por cada cidadão ao apoiar nossa causa.
            Esta Política de Privacidade descreve como coletamos, utilizamos e
            protegemos seus dados pessoais, em conformidade com a Lei Geral de
            Proteção de Dados (Lei nº 13.709/2018 – LGPD).
          </p>

          <Section title="1. Coleta de Dados">
            <p>
              Ao assinar nossa petição ou manifestar apoio ao projeto de lei,
              coletamos apenas os dados necessários para validar sua participação
              e garantir a legitimidade do pleito junto aos órgãos públicos e
              instâncias de decisão, tais como:
            </p>
            <List
              items={[
                "Nome completo;",
                "E-mail e telefone de contato;",
                "Cidade e Estado (para fins de estatística regional e pressão legislativa);",
                "Título de Eleitor ou CPF (conforme exigência de protocolos específicos de projetos de lei de iniciativa popular).",
              ]}
            />
          </Section>

          <Section title="2. Finalidade do Tratamento">
            <p>Seus dados serão utilizados exclusivamente para:</p>
            <List
              items={[
                "Legitimação do Abaixo-Assinado: Comprovar aos vereadores, deputados e representantes do Executivo o apoio popular real à implementação da Tarifa Zero no transporte público.",
                "Comunicação e Atualizações: Enviar informações sobre o andamento do projeto, convocações para mobilizações, audiências públicas e outras ações relacionadas ao direito à mobilidade urbana.",
                "Ranking de Engajamento: Contabilizar numericamente o apoio por região para direcionar estratégias de pressão política, sem expor dados sensíveis publicamente.",
              ]}
            />
          </Section>

          <Section title="3. Compartilhamento de Dados">
            <p>
              O Movimento compromete-se a não vender, alugar ou ceder seus dados a
              terceiros para fins comerciais ou publicitários. O compartilhamento
              ocorrerá apenas:
            </p>
            <List
              items={[
                "Com o Poder Legislativo ou Executivo, mediante a entrega formal do abaixo-assinado para instrução e protocolo do projeto de lei de iniciativa popular.",
                "Caso haja obrigação legal ou judicial específica.",
              ]}
            />
          </Section>

          <Section title="4. Segurança e Retenção">
            <p>
              Implementamos medidas técnicas e organizativas para proteger seus dados
              contra acessos não autorizados ou uso indevido. Os dados serão mantidos
              em nossa base enquanto a mobilização pelo Projeto de Lei Tarifa Zero
              Já estiver ativa ou até que você solicite formalmente a exclusão de
              suas informações.
            </p>
          </Section>

          <Section title="5. Seus Direitos">
            <p>De acordo com a LGPD, você tem o direito de, a qualquer momento:</p>
            <List
              items={[
                "Confirmar a existência do tratamento de seus dados;",
                "Acessar, corrigir ou atualizar suas informações;",
                "Revogar seu consentimento e solicitar a exclusão de seus dados de nossa base de mobilização.",
              ]}
            />
          </Section>

          <Section title="6. Consentimento">
            <p>
              Ao clicar em “Assinar” ou “Enviar”, você declara estar ciente desta
              Política e autoriza o Movimento a utilizar seus dados para os fins aqui
              descritos, incluindo o recebimento de comunicações sobre a luta pelo
              transporte público gratuito e de qualidade.
            </p>
          </Section>

          <div className="pt-2 text-center">
            <Link
              href="/#assinar"
              className="inline-flex items-center justify-center rounded-xl bg-[#FF7900] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#e56d00]"
            >
              Voltar ao abaixo-assinado
            </Link>
          </div>
        </div>
      </article>
    </TarifaZeroPageShell>
  );
}
