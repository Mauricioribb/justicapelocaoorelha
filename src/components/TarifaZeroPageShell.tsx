import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export function TarifaZeroPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-[#080301] to-[#006BAD] font-[family-name:var(--font-roboto)] text-white">
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

        <div className="relative z-10 mx-auto max-w-[1140px] px-4 py-8 md:py-14">
          <div className="flex flex-col items-center">
            <Link href="/" className="transition hover:opacity-90">
              <div className="rounded-full bg-white px-8 py-3 md:px-[50px] md:py-[30px]">
                <Image
                  src="/img/tarifazero-logo.png"
                  alt="Tarifa Zero Já — Início"
                  width={500}
                  height={164}
                  priority
                  className="h-auto w-full max-w-[200px] md:max-w-[320px]"
                />
              </div>
            </Link>
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
