import Image from "next/image";
import { CaoOrelhaPageFrame } from "@/components/CaoOrelhaPageFrame";
import { FormularioAssinatura } from "@/components/FormularioAssinatura";
import { EndorserProfileCard } from "@/components/portable/EndorserProfileCard";
import {
  CaoOrelhaMovementSection,
  CaoOrelhaSignaturesSection,
} from "@/components/home/CaoOrelhaSections";
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
  const estadoPadrao = params.estado?.toUpperCase() ?? "SP";
  const cidadePadrao = params.cidade ? decodeURIComponent(params.cidade) : "";
  const appConfig = await getAppConfig();
  const mostrarPlacar = appConfig.mostrar_placar ?? true;

  return (
    <CaoOrelhaPageFrame>
      <div className="mx-auto max-w-[1140px] px-4 py-8 md:py-[70px]">
        <div className="flex flex-col items-center">
            <div className="-mb-4 md:-mb-7">
              <Image
                src="/img/logo-caoorelha.png"
                alt="Justiça pelo Cão Orelha"
                width={700}
                height={396}
                priority
                className="mx-auto h-auto w-full max-w-[288px] md:max-w-[500px]"
              />
            </div>

            <div className="mt-2 w-full space-y-1 text-center">
              <h1 className="text-[25px] font-semibold text-white md:text-[71px]">
                Maus-tratos é crime.
              </h1>
              <h2 className="text-[35px] font-semibold text-white md:text-[96px]">
                <span className="font-black text-[#ffa900]">Prisão já.</span>
              </h2>
            </div>

            <div className="mt-2 flex w-full max-w-[700px] flex-col items-center space-y-4 md:mt-0">
              <section id="assinar" className="w-full">
                <div
                  id="abaixo-assinado-form"
                  className="rounded-[10px] bg-black/[0.41] p-4 md:p-6"
                >
                  <FormularioAssinatura
                    estadoPadrao={estadoPadrao}
                    cidadePadrao={cidadePadrao}
                    embedded
                    brand
                  />
                </div>
              </section>
              <EndorserProfileCard {...MARCELO_ORTEGA_PROFILE} embedded />
            </div>

            <section className="mt-8 w-full md:mt-10">
              <CaoOrelhaMovementSection />
            </section>

            <section className="mt-8 w-full md:mt-10">
              <CaoOrelhaSignaturesSection />
            </section>

            {mostrarPlacar && (
              <section className="mt-10 w-full md:mt-12">
                <PlacarCidades />
              </section>
            )}
          </div>
        </div>
    </CaoOrelhaPageFrame>
  );
}
