"use client";

/**
 * Card de perfil reutilizável — copie este arquivo + endorser-profile-data.ts para outros projetos.
 *
 * Requisitos:
 * - React 18+
 * - Tailwind CSS (classes abaixo)
 * - Imagem do perfil em public/ (ex.: /img/marcelo-ortega.png)
 *
 * Uso:
 *   import { EndorserProfileCard } from "@/components/portable/EndorserProfileCard";
 *   import { MARCELO_ORTEGA_PROFILE } from "@/lib/endorser-profile-data";
 *   <EndorserProfileCard {...MARCELO_ORTEGA_PROFILE} embedded />
 */

import Image from "next/image";
import { useState } from "react";
import type { EndorserProfile } from "@/lib/endorser-profile-data";

export type { EndorserProfile } from "@/lib/endorser-profile-data";
export { MARCELO_ORTEGA_PROFILE } from "@/lib/endorser-profile-data";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function EndorserProfileCard({
  name,
  role,
  movement,
  connectLabel = "Conecte-se com a gente!",
  imageSrc,
  imageAlt,
  instagramUrl,
  initials = "??",
  embedded = false,
  className = "",
}: EndorserProfile & {
  embedded?: boolean;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const alt = imageAlt ?? name;

  return (
    <div
      className={`rounded-[10px] border border-white/10 bg-black/[0.06] px-4 py-3 text-left md:p-4 ${
        embedded ? "mx-auto w-full max-w-none" : "mx-auto mt-6 max-w-2xl md:max-w-3xl"
      } ${className}`}
    >
      <div className="flex justify-center md:justify-start">
        <div className="inline-flex max-w-full items-start gap-2 text-left md:flex md:w-full md:items-center md:gap-4">
          <div className="relative h-[45px] w-[45px] shrink-0 md:h-[51px] md:w-[51px]">
            <div
              className="absolute inset-0 rounded-full bg-[#FF7900]/25 blur-md"
              aria-hidden
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#FF7900] shadow-[0_0_14px_rgba(255,121,0,0.35)]">
              {!imageError ? (
                <Image
                  src={imageSrc}
                  alt={alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 45px, 51px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0D2A4C] text-sm font-bold text-[#ffa900] md:text-base">
                  {initials}
                </div>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-0.5 text-left md:flex-1 md:gap-1">
            <div className="flex w-full flex-col items-start gap-0.5 md:flex-row md:flex-wrap md:items-center md:gap-2.5">
              <p className="text-left text-base font-bold leading-tight text-white md:text-base">
                {name}
              </p>
              <span className="text-left text-[11px] font-medium leading-snug text-white/80 md:inline-block md:w-fit md:shrink-0 md:rounded-full md:border md:border-[#FF7900]/55 md:bg-[#FF7900]/15 md:px-2.5 md:py-0.5 md:text-[11px]">
                {role}
              </span>
            </div>
            <div
              className="my-1 h-px w-full bg-white/20 md:hidden"
              aria-hidden
            />
            <div className="flex w-full flex-col items-start gap-0.5 text-xs text-white/75 md:flex-row md:flex-wrap md:items-center md:gap-x-1.5 md:gap-y-1 md:text-xs">
              <p className="text-left font-medium text-white/90">{movement}</p>
              {instagramUrl && (
                <div className="flex items-center justify-start gap-1 md:contents">
                  <span className="hidden text-white/40 md:inline" aria-hidden>
                    —
                  </span>
                  <span className="text-left text-[11px] font-normal text-white/90 md:text-[11px]">
                    {connectLabel}
                  </span>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[#ffa900] transition hover:bg-[#FF7900]/15 hover:text-[#ffc04d] md:h-[22px] md:w-[22px]"
                    aria-label={`Instagram de ${name}`}
                  >
                    <InstagramIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
