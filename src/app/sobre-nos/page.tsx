import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Sobre Nós | Pais pelos filhos na Escola",
};

const GARANTIAS = [
  "A proteção da infância",
  "O respeito à idade e ao desenvolvimento das crianças",
  "A transparência sobre conteúdos e abordagens sensíveis",
  "O direito dos pais de serem informados e ouvidos",
  "A participação ativa da família na formação dos filhos",
];

function CheckIcon() {
  return (
    <svg
      className="mt-1 h-5 w-5 shrink-0 text-[#FF7900]"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

export default function SobreNosPage() {
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
                  Conheça o movimento
                </p>
                <h1 className="mt-2 text-3xl font-bold md:text-4xl">Sobre Nós</h1>
              </header>

              <div className="space-y-5 px-6 py-8 text-base leading-relaxed text-white/90 md:px-10 md:py-10 md:text-lg">
                <p>
                  O <strong className="text-white">SOS – PAIS, PROTEJAM SEUS FILHOS NA ESCOLA</strong>{" "}
                  é uma mobilização cidadã, apartidária e sem fins lucrativos, criada
                  para fortalecer a participação das famílias nas decisões que envolvem
                  a educação e o desenvolvimento das crianças dentro do ambiente
                  escolar.
                </p>

                <p>
                  Acreditamos que a educação é um dever compartilhado entre o Estado e
                  a família, conforme estabelece a Constituição Federal. No entanto,
                  muitos pais e mães têm sido excluídos de decisões sobre temas
                  sensíveis apresentados nas escolas, sem aviso prévio, sem
                  transparência e sem diálogo.
                </p>

                <div>
                  <p className="mb-4 font-medium text-white">
                    Nossa iniciativa nasce da necessidade de reaproximar a família da
                    escola, garantindo:
                  </p>
                  <ul className="space-y-3">
                    {GARANTIAS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#0D2A4C]/50 px-3 py-2.5"
                      >
                        <CheckIcon />
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p>
                  Por meio deste abaixo-assinado, buscamos apoiar a criação da{" "}
                  <strong className="text-white">
                    Lei Municipal de Transparência e do Conselho de Pais
                  </strong>
                  , instrumentos que permitem diálogo, fiscalização e cooperação entre
                  famílias, escolas e poder público.
                </p>

                <p>
                  O ranking de cidades existe para demonstrar, de forma transparente,
                  o engajamento da população local e fortalecer o encaminhamento do
                  projeto aos vereadores e representantes municipais.
                </p>

                <p>
                  Nosso compromisso é com a infância, a família e a educação
                  responsável, sempre pautados pelo respeito, pela legalidade e pela
                  construção coletiva.
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
