import Image from "next/image";
import { Footer } from "@/components/Footer";
import { FormularioAssinatura } from "@/components/FormularioAssinatura";
import { TarifaZeroFooter, TarifaZeroIntro } from "@/components/home/TarifaZeroSections";
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

export default async function HomePage({ searchParams }: HomeProps) {
  const params = await searchParams;
  const estadoPadrao = params.estado?.toUpperCase() ?? "CE";
  const cidadePadrao = params.cidade ? decodeURIComponent(params.cidade) : "";
  const appConfig = await getAppConfig();
  const mostrarPlacar = appConfig.mostrar_placar ?? true;

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-b from-[#080301] to-[#006BAD] font-[family-name:var(--font-roboto)] text-white">
        <div className="absolute inset-0 opacity-[0.16]">
          <Image
            src="/img/fundo2b-scaled.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1140px] px-4 py-8 md:py-[70px]">
          <div className="flex flex-col items-center">
            <div className="-mb-4 overflow-visible rounded-full bg-white px-5 py-2 md:-mb-[15px] md:px-[43px] md:py-[12px]">
              <Image
                src="/img/tarifazero-logo.png"
                alt="Tarifa Zero Já"
                width={845}
                height={277}
                priority
                className="h-auto w-full max-w-[213px] origin-center md:max-w-[422px] md:scale-[0.65]"
              />
            </div>

            <div className="mt-6 w-full max-w-[1140px] space-y-0 px-2 text-center md:mt-8">
              <h2 className="text-2xl font-semibold text-white md:text-[32px]">
                TRANSPORTE <span className="font-black text-[#E46C17]">GRATUITO</span>{" "}
                PARA TODOS
              </h2>
              <h2 className="mt-4 text-[20px] font-semibold text-white md:mt-5 md:text-[48px]">
                Você é a favor da
              </h2>
              <h2 className="-mt-1 text-[41px] font-semibold uppercase leading-none text-white md:text-[113px]">
                <span className="hero-title-animated-border font-black">
                  Tarifa Zero
                </span>
              </h2>
              <h2 className="-mt-2 text-[14px] font-black uppercase leading-tight tracking-tight md:mt-0 md:whitespace-nowrap md:text-[clamp(0.72rem,2.05vw,1.6rem)] md:tracking-[0.04em]">
                <span className="text-white">no transporte público </span>
                <span className="text-[#E46C17]">da nossa cidade?</span>
              </h2>
            </div>

            <section
              id="assinar"
              className="mt-8 w-full max-w-[700px] space-y-4 md:mt-10"
            >
              <div
                id="abaixo-assinado-form"
                className="rounded-[10px] border-[3px] border-[#FF8F00] bg-[#00518E]/55 p-4 md:p-6"
              >
                <FormularioAssinatura
                  estadoPadrao={estadoPadrao}
                  cidadePadrao={cidadePadrao}
                  embedded
                  brand
                />
              </div>
              <EndorserProfileCard {...MARCELO_ORTEGA_PROFILE} embedded />
            </section>

            <TarifaZeroIntro />

            {mostrarPlacar && (
              <section className="mt-10 w-full md:mt-12">
                <PlacarCidades />
              </section>
            )}

            <TarifaZeroFooter />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
