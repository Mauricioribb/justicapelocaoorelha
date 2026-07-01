import Link from "next/link";
import { TarifaZeroPageShell } from "@/components/TarifaZeroPageShell";

export const metadata = {
  title: "Sobre Nós | Tarifa Zero Já",
};

const PILARES = [
  {
    title: "Justiça Social:",
    text: "Garantir que o transporte público seja um serviço gratuito e universal, financiado de forma solidária.",
  },
  {
    title: "Transparência e Fiscalização:",
    text: "Criar mecanismos que permitam à sociedade auditar os contratos de transporte e a gestão dos recursos públicos.",
  },
  {
    title: "Mobilidade Sustentável:",
    text: "Promover o uso do transporte coletivo para reduzir a poluição e melhorar a qualidade de vida nos centros urbanos.",
  },
  {
    title: "Mudança Legislativa:",
    text: "Apoiar a criação de normas municipais e estaduais que institucionalizem o fundo da Tarifa Zero e assegurem sua viabilidade.",
  },
];

export default function SobreNosPage() {
  return (
    <TarifaZeroPageShell>
      <article className="mt-8 w-full max-w-[800px] overflow-hidden rounded-[10px] bg-white p-6 text-[#54595F] shadow-[0_0_10px_rgba(0,0,0,0.18)] md:mt-10 md:p-10">
        <div className="space-y-5 text-base leading-relaxed md:text-[15px]">
          <h1 className="text-xl font-semibold text-[#080301] md:text-2xl">
            Sobre Nós: Movimento Pelo Projeto de Lei Tarifa Zero Já
          </h1>

          <p>
            O{" "}
            <strong className="font-bold text-[#E46C17]">
              Movimento pelo Projeto de Lei Tarifa Zero Já
            </strong>{" "}
            é uma mobilização cidadã, apartidária e sem fins lucrativos, que
            nasceu da indignação coletiva diante da exclusão social e das
            barreiras à mobilidade urbana. Inspirados pela necessidade de um
            transporte público verdadeiramente acessível, unimos forças para
            transformar a demanda popular em ação legislativa concreta,
            garantindo que o direito de ir e vir não dependa da condição
            financeira do cidadão.
          </p>

          <p>
            Acreditamos que o acesso ao transporte é um{" "}
            <strong className="font-bold text-[#E46C17]">
              direito fundamental
            </strong>{" "}
            e a chave para o exercício da cidadania. Embora o transporte seja um
            serviço essencial, a realidade atual impõe tarifas abusivas que
            segregam a população, enquanto os mecanismos de financiamento
            público carecem de transparência e eficiência social.
          </p>

          <h2 className="text-lg font-semibold text-[#080301] md:text-xl">
            Nossa Missão
          </h2>

          <p>
            Nossa iniciativa surge da necessidade urgente de democratizar o
            acesso à cidade, fundamentada em quatro pilares essenciais:
          </p>

          <ul className="space-y-4">
            {PILARES.map((item) => (
              <li key={item.title}>
                <p>
                  <strong className="font-bold text-[#E46C17]">
                    {item.title}
                  </strong>{" "}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-[#080301] md:text-xl">
            Como Atuamos
          </h2>

          <p>
            Através deste abaixo-assinado, buscamos demonstrar aos nossos
            representantes no Poder Legislativo que a{" "}
            <strong className="font-bold text-[#E46C17]">Tarifa Zero</strong> é
            uma prioridade da população. O engajamento registrado aqui serve como
            base para o encaminhamento oficial do Projeto de Lei, pressionando
            vereadores e deputados a agirem em favor de uma cidade sem catracas.
          </p>

          <p>
            Nosso compromisso é com a ética, a igualdade e o direito à cidade.
            Cada assinatura é um basta à exclusão e um passo em direção a um
            futuro onde o deslocamento seja um direito garantido, e não uma
            mercadoria.
          </p>

          <p>
            <strong className="font-bold text-[#E46C17]">Tarifa Zero Já!</strong>
          </p>

          <div className="pt-2 text-center">
            <Link
              href="/#assinar"
              className="inline-flex items-center justify-center rounded-xl bg-[#FF7900] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#e56d00]"
            >
              Assinar agora
            </Link>
          </div>
        </div>
      </article>
    </TarifaZeroPageShell>
  );
}
