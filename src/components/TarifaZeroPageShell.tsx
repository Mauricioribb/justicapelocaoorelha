import Image from "next/image";
import Link from "next/link";
import { CaoOrelhaPageFrame } from "@/components/CaoOrelhaPageFrame";

export function TarifaZeroPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CaoOrelhaPageFrame>
      <div className="mx-auto max-w-[1140px] px-4 py-8 md:py-[70px]">
        <div className="flex flex-col items-center">
          <Link href="/" className="-mb-2 transition hover:opacity-90 md:-mb-4">
            <Image
              src="/img/logo-caoorelha.png"
              alt="Justiça pelo Cão Orelha — Início"
              width={700}
              height={396}
              priority
              className="mx-auto h-auto w-full max-w-[288px] md:max-w-[500px]"
            />
          </Link>
          {children}
        </div>
      </div>
    </CaoOrelhaPageFrame>
  );
}
