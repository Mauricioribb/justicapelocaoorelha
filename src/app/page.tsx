import Image from "next/image";
import { Footer } from "@/components/Footer";
import { FormularioAssinatura } from "@/components/FormularioAssinatura";
import { EndorserProfileCard } from "@/components/portable/EndorserProfileCard";
import { PlacarCidades } from "@/components/PlacarCidades";
import { getAppConfig } from "@/lib/config";
import { MARCELO_ORTEGA_PROFILE } from "@/lib/endorser-profile-data";

interface HomeProps {
  searchParams: Promise<{
    assinar?: string;
    estado?: string;
    cidade?: string;
  }>;
}

const DEFENDEMOS = [
  "A proteção da infância",
  "A transparência sobre temas sensíveis",
  "O respeito à idade e ao desenvolvimento das crianças",
  "A participação dos pais na educação dos filhos",
  "Lei federal que garante a autoridade dos pais na educação dos filhos.",
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

export default async function HomePage({ searchParams }: HomeProps) {
  const params = await searchParams;
  const estadoPadrao = params.estado?.toUpperCase() ?? "SP";
  const cidadePadrao = params.cidade ? decodeURIComponent(params.cidade) : "";
  const appConfig = await getAppConfig();
  const mostrarPlacar = appConfig.mostrar_placar ?? true;

  return (
    <>
      <div className="relative overflow-hidden bg-[#0D2A4C] font-[family-name:var(--font-roboto)] text-white">
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

        <div className="relative z-10 mx-auto max-w-[1140px] px-4 py-8 md:py-[70px]">
          <div className="flex flex-col items-center">
            <Image
              src="/img/logo-pais-pelos-filhos-naescola.png"
              alt="Pais pelos filhos na Escola"
              width={500}
              height={164}
              priority
              className="h-auto w-full max-w-[288px] md:max-w-[500px]"
            />

            <div className="mt-6 w-full max-w-[700px] space-y-3 text-center md:mt-8">
              <h1 className="text-[22px] font-semibold leading-tight md:text-[28px]">
                SEUS FILHOS. SUA RESPONSABILIDADE. SUA VOZ.
              </h1>
              <h2 className="text-base font-normal leading-snug text-white/95 md:text-xl">
                Pais e mães não podem ser excluídos das decisões sobre a educação
              </h2>
            </div>

            <section
              id="assinar"
              className="mt-8 w-full max-w-[700px] space-y-4"
            >
              <div className="rounded-[10px] bg-white/95 p-5 shadow-lg md:p-6">
                <FormularioAssinatura
                  estadoPadrao={estadoPadrao}
                  cidadePadrao={cidadePadrao}
                  embedded
                  brand
                />
              </div>
              <EndorserProfileCard {...MARCELO_ORTEGA_PROFILE} embedded />
            </section>

            <section className="mt-10 w-full max-w-[900px] overflow-hidden rounded-2xl border border-gray-400/50 bg-[#0D2A4C] md:mt-12">
              <div className="border-b border-gray-400/30 px-6 py-8 text-center md:px-10 md:py-10">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF7900]">
                  Mobilização nacional
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#FF7900] md:text-5xl">
                  ABAIXO-ASSINADO
                </h2>
                <h3 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-snug md:text-[24px] lg:text-[29px]">
                  SOS – PAIS,{" "}
                  <span className="text-[#ffa900]">PROTEJAM SEUS FILHOS</span> NA
                  ESCOLA
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                  Assine para defender a autoridade dos pais na educação dos filhos
                  e para combater a doutrinação ideológica nas escolas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 md:divide-x md:divide-gray-400/30">
                <div className="flex flex-col border-b border-gray-400/30 p-6 md:border-b-0 md:p-8">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#FF7900]/40 bg-[#FF7900]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ffa900]">
                    Alerta
                  </div>
                  <h3 className="text-xl font-semibold leading-snug md:text-2xl">
                    <span className="text-[#FF7900]">ATENÇÃO:</span> PAI E MÃE
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                    A Constituição Federal diz que a educação é dever do Estado e da{" "}
                    <em className="font-medium text-white">família</em>. Mas hoje,
                    muitos pais estão sendo excluídos de decisões sobre temas
                    sensíveis apresentados dentro da escola, sem aviso prévio e sem
                    diálogo.
                  </p>
                </div>

                <div className="flex flex-col bg-[#132f52]/50 p-6 md:p-8">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#FF7900]/40 bg-[#FF7900]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ffa900]">
                    Nossa pauta
                  </div>
                  <h3 className="text-xl font-semibold leading-snug md:text-2xl">
                    <span className="text-[#FF7900]">VAMOS AGIR</span> e defender:
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {DEFENDEMOS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#0D2A4C]/40 px-3 py-2.5"
                      >
                        <CheckIcon />
                        <span className="text-sm leading-relaxed md:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {mostrarPlacar && (
              <section className="mt-10 w-full md:mt-12">
                <PlacarCidades />
              </section>
            )}

            <div className="mt-12 w-full max-w-[800px] md:mt-16">
              <div className="cta-animated-border">
                <h2 className="relative z-10 text-[21px] font-semibold leading-snug md:text-[36px]">
                  Diga <span className="text-[#ffa900]">NÃO</span> à{" "}
                  <span className="text-[#ffa900]">ideologia de gênero</span> nas
                  escolas!
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
