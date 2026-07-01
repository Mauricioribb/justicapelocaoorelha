import Link from "next/link";
import { TarifaZeroPageShell } from "@/components/TarifaZeroPageShell";

export const metadata = {
  title: "Sobre Nós | Justiça pelo Cão Orelha",
};

const PILARES = [
  {
    title: "Justiça e Rigor:",
    text: "Exigir a aplicação estrita das leis vigentes contra crimes de crueldade.",
  },
  {
    title: "Transparência e Fiscalização:",
    text: "Criar mecanismos que permitam à sociedade acompanhar a resolução de casos de maus-tratos.",
  },
  {
    title: "Educação e Respeito:",
    text: "Promover a conscientização sobre os direitos dos animais como seres sencientes.",
  },
  {
    title: "Mudança Legislativa:",
    text: "Apoiar a criação de normas municipais e estaduais que endureçam as penas e facilitem a denúncia.",
  },
];

export default function SobreNosPage() {
  return (
    <TarifaZeroPageShell>
      <article className="mt-8 w-full max-w-[800px] overflow-hidden rounded-[10px] border border-white/20 bg-black/55 p-6 md:mt-10 md:p-10">
        <div className="space-y-5 text-base leading-relaxed text-white md:text-[15px]">
          <h1 className="text-xl font-semibold text-white md:text-2xl">
            Sobre Nós: Movimento Pelo Projeto de Lei Cão Orelha
          </h1>

          <p>
            O{" "}
            <strong className="font-bold text-[#ffa900]">
              Movimento pelo Projeto de Lei Cão Orelha
            </strong>{" "}
            é uma mobilização cidadã, apartidária e sem fins lucrativos, que
            nasceu da indignação coletiva diante da crueldade e da impunidade.
            Inspirados pela história do Cão Orelha, unimos forças para
            transformar a comoção em ação legislativa concreta, garantindo que
            nenhum crime contra os animais fique sem a devida resposta da
            justiça.
          </p>

          <p>
            Acreditamos que o respeito à vida animal é um reflexo do grau de
            civilidade de uma sociedade. Embora existam avanços, a realidade
            ainda mostra animais sofrendo maus-tratos em silêncio, enquanto as
            leis atuais muitas vezes carecem de aplicação rigorosa ou de
            mecanismos que garantam a punição efetiva do agressor.
          </p>

          <h2 className="text-lg font-semibold text-white md:text-xl">
            Nossa Missão
          </h2>

          <p>
            Nossa iniciativa surge da necessidade urgente de fortalecer a rede
            de proteção animal, fundamentada em quatro pilares essenciais:
          </p>

          <ul className="space-y-4">
            {PILARES.map((item) => (
              <li key={item.title}>
                <p>
                  <strong className="font-bold text-[#ffa900]">
                    {item.title}
                  </strong>{" "}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-white md:text-xl">
            Como Atuamos
          </h2>

          <p>
            Através deste abaixo-assinado, buscamos demonstrar aos nossos
            representantes no Poder Legislativo que a proteção animal é uma
            prioridade da população. O engajamento registrado aqui serve como
            base para o encaminhamento oficial do{" "}
            <strong className="font-bold text-[#ffa900]">
              Projeto de Lei Cão Orelha
            </strong>
            , pressionando vereadores e deputados a agirem em favor daqueles que
            não têm voz.
          </p>

          <p>
            Nosso compromisso é com a ética, a legalidade e a vida. Cada
            assinatura é um basta à impunidade e um passo em direção a um futuro
            onde o Cão Orelha e tantos outros sejam lembrados não pela dor, mas
            pela mudança que inspiraram.
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
