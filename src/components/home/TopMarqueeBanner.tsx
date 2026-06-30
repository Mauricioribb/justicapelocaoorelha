"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "APOIO PARA MÃES ATÍPICAS — CHEGA DE ABANDONO",
  "QUEM CUIDA TAMBÉM PRECISA DE CUIDADO",
  "ASSINE E FAÇA PARTE DESTA LUTA",
  "UM SALÁRIO MÍNIMO PARA MÃES CUIDADORAS",
  "MAIS TERAPIAS E ATENDIMENTO ESPECIALIZADO",
  "INCLUSÃO ESCOLAR DE VERDADE",
  "APOIO PSICOLÓGICO GRATUITO PARA MÃES ATÍPICAS",
  "NENHUMA MÃE DEVE LUTAR SOZINHA",
  "JUNTAS SOMOS MAIS FORTES",
  "POLÍTICAS PÚBLICAS PARA MÃES ATÍPICAS E SUAS FAMÍLIAS",
  "SUA ASSINATURA FAZ A DIFERENÇA",
];

const PHRASE_DURATION_MS = 3800;

export function TopMarqueeBanner() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % PHRASES.length);
      setAnimKey((current) => current + 1);
    }, PHRASE_DURATION_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-20 flex min-h-16 items-center justify-center overflow-hidden bg-[#4a9ab5] px-3 py-2.5 shadow-[0_2px_8px_rgba(30,10,60,0.2)] md:min-h-10 md:px-4">
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-[linear-gradient(90deg,transparent_0%,#e4a80e_30%,#ffffff_50%,#e4a80e_70%,transparent_100%)]"
        aria-hidden
      />
      <p
        key={animKey}
        aria-live="polite"
        className="animate-banner-zoom-out block w-full max-w-4xl px-2 text-center text-[0.9rem] font-bold uppercase leading-snug tracking-[0.12em] text-white md:inline-block md:w-auto md:px-5 md:text-sm md:leading-normal md:tracking-[0.12em]"
      >
        {PHRASES[index]}
      </p>
    </div>
  );
}
