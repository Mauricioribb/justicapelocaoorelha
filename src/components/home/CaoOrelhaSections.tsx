function ChevronIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0 text-[#FCBE41]"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z" />
    </svg>
  );
}

const PEDIDOS = [
  "Aplicação rigorosa das leis contra maus-tratos;",
  "Punição efetiva para crimes de crueldade contra animais;",
  "Fortalecimento das leis de proteção animal;",
  "Mais respeito à vida.",
];

const cardClass =
  "rounded-[10px] border border-white/20 bg-black/25 px-5 py-5 md:px-8 md:py-8";

export function CaoOrelhaMovementSection() {
  return (
    <div className={`w-full space-y-4 text-center ${cardClass}`}>
      <h2 className="text-[17px] font-semibold text-white md:whitespace-nowrap md:text-[28px]">
        MOVIMENTO DE PROTEÇÃO ANIMAL
      </h2>
      <h2 className="-mt-1 text-[50px] font-semibold leading-none text-white md:whitespace-nowrap md:text-[72px]">
        <span className="font-black text-[#ffa900]">CÃO ORELHA</span>
      </h2>
      <div className="space-y-4 text-left text-base leading-relaxed text-white md:text-[22px] md:leading-[1.45]">
        <p>
          O caso do <strong>Cão Orelha</strong> chocou milhares de pessoas e
          revelou uma realidade que não pode mais ser ignorada. Todos os dias,
          animais sofrem maus-tratos e muitos casos acabam sem a devida punição.
        </p>
        <p>
          <strong>Este é um movimento de cidadãos</strong> que acreditam que a
          lei deve proteger quem não pode se defender e que a crueldade não
          pode ser tratada como algo normal.
        </p>
      </div>
    </div>
  );
}

export function CaoOrelhaSignaturesSection() {
  return (
    <div className={`w-full ${cardClass}`}>
      <h2 className="text-center text-[25px] font-semibold text-white md:text-[25px]">
        Estamos reunindo{" "}
        <span className="font-black text-[#db9b6f]">assinaturas</span> para
        pedir:
      </h2>

      <ul className="mt-6 space-y-3 md:space-y-3.5">
        {PEDIDOS.map((item) => (
          <li key={item} className="flex items-start gap-3 text-left">
            <ChevronIcon />
            <span className="text-base leading-relaxed text-white md:text-[22px]">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-[17px] leading-snug text-white md:text-[23px] md:leading-[30px]">
        Cada assinatura mostra que a sociedade não aceita mais a impunidade.
      </p>

      <h2 className="mt-4 text-center text-lg font-semibold leading-snug text-[#FFD42E] md:text-[27px] md:leading-[36px]">
        Leva apenas alguns segundos. Sua assinatura ajuda a impedir novos casos
        como o do Cão Orelha.
      </h2>
    </div>
  );
}
