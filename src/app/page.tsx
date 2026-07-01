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
            <section
              id="assinar"
              className="w-full max-w-[700px] space-y-4"
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

            {mostrarPlacar && (
              <section className="mt-10 w-full md:mt-12">
                <PlacarCidades />
              </section>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
