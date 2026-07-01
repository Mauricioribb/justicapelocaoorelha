function ChevronIcon({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`shrink-0 text-[#E46C17] ${compact ? "h-4 w-4" : "h-5 w-5"}`}
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z" />
    </svg>
  );
}

function IconList({
  items,
  compact = false,
}: {
  items: string[];
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "space-y-2" : "space-y-3"}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-left md:gap-2.5">
          <ChevronIcon compact={compact} />
          <span
            className={
              compact
                ? "text-base leading-relaxed text-white md:text-[14px] md:leading-snug"
                : "text-base leading-relaxed text-white md:text-[1.1rem]"
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[10px] bg-black/65 p-5 md:p-6">
      <h3 className="text-center text-xl font-semibold text-white md:text-[19px]">
        {title}
      </h3>
      <div className="my-4 border-t border-dashed border-[#FF7900]/80 md:my-3" />
      <div className="space-y-4 text-left text-[15px] leading-relaxed text-white md:space-y-3 md:text-[14px] md:leading-snug">
        {children}
      </div>
    </div>
  );
}

const O_QUE_MUDA = [
  "Mais acesso ao emprego e à renda",
  "Mais estudantes frequentando escolas e universidades",
  "Mais movimento no comércio local",
  "Menos carros nas ruas e menos trânsito",
  "Mais dignidade para quem mais precisa",
];

const QUEM_PAGA = [
  "Orçamento público já existente;",
  "Fundos municipais de mobilidade;",
  "Receitas como multas, publicidade e contribuições específicas.",
];

const QUEM_BENEFICIA = [
  "Trabalhadores que dependem do transporte diariamente;",
  "Estudantes",
  "Pessoas de baixa renda;",
  "Pequenos comerciantes.",
];

export function TarifaZeroIntro() {
  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-[1140px] space-y-6 px-2 text-center">
        <p className="mx-auto max-w-[750px] text-xl leading-snug text-white md:text-[27px] md:leading-[32px]">
          <strong>Se você depende de ônibus para trabalhar</strong>, estudar ou
          acessar serviços básicos, essa luta também é sua.
        </p>

        <div className="w-full space-y-1">
          <h2 className="text-lg font-semibold text-white md:text-[34.5px]">
            POR QUE DEFENDER A
          </h2>
          <h2 className="text-[40px] font-extrabold leading-none tracking-tight text-[#E46C17] md:whitespace-nowrap md:text-[clamp(2.25rem,7.875vw,5.8125rem)] md:tracking-[-0.03em]">
            TARIFA ZERO?
          </h2>
        </div>

        <div className="mx-auto max-w-[750px] space-y-4 text-base leading-relaxed text-white md:text-[16.5px]">
          <p>
            Hoje, milhares de pessoas enfrentam uma escolha injusta:{" "}
            <strong>pagar a passagem ou garantir necessidades básicas.</strong>
          </p>
          <p>
            O transporte público, embora seja um direito social previsto na
            Constituição, ainda funciona como uma barreira econômica que limita
            o acesso à cidade.
          </p>
          <p>
            <strong>A Tarifa Zero muda essa lógica.</strong>
          </p>
        </div>

        <p className="mx-auto max-w-[750px] text-xl leading-snug text-white md:text-[22.5px] md:leading-[29px]">
          Ela garante que{" "}
          <strong>
            ninguém fique impedido de trabalhar, estudar ou se deslocar por falta
            de dinheiro.
          </strong>
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[700px] rounded-[10px] bg-black/55 px-5 py-8 md:px-[50px] md:py-[50px]">
        <h2 className="text-center text-xl font-semibold text-white md:text-[25px]">
          <span className="text-[#E46C17]">O QUE MUDA</span> COM A TARIFA ZERO?
        </h2>
        <div className="mt-6">
          <IconList items={O_QUE_MUDA} />
        </div>
        <p className="mt-6 text-center text-base text-white md:text-[23px] md:leading-[30px]">
          Não se trata apenas de transporte.
        </p>
        <h3 className="mt-2 text-center text-lg font-semibold leading-snug text-[#FF8026] md:text-[27px] md:leading-[36px]">
          Trata-se de acesso à cidade e igualdade de oportunidades.
        </h3>
      </div>
    </>
  );
}

export function TarifaZeroFooter() {
  return (
    <>
      <div className="mx-auto mt-10 grid max-w-[1300px] gap-5 md:grid-cols-3">
        <InfoCard title="QUEM PAGA A CONTA?">
          <p>
            O transporte público <strong>já é subsidiado pelo poder público</strong>.
          </p>
          <p>
            A diferença é simples:
            <br />
            em vez de cobrar diretamente do cidadão, o sistema pode ser financiado
            por:
          </p>
          <IconList items={QUEM_PAGA} compact />
          <p>
            Ou seja:{" "}
            <strong>é uma decisão política, não uma impossibilidade financeira.</strong>
          </p>
        </InfoCard>

        <InfoCard title="A TARIFA ZERO FUNCIONA?">
          <p className="text-3xl md:text-[32px] md:leading-none">Sim.</p>
          <p>
            Diversas cidades brasileiras já adotaram modelos de gratuidade,
            demonstrando que é possível ampliar o acesso e melhorar a mobilidade
            urbana.
          </p>
          <p>
            Além disso, experiências locais mostram aumento na circulação de
            pessoas e fortalecimento da economia.
          </p>
        </InfoCard>

        <InfoCard title="QUEM SE BENEFICIA?">
          <p>
            <strong>Todos.</strong>
          </p>
          <p>Mas principalmente:</p>
          <IconList items={QUEM_BENEFICIA} compact />
          <p>
            A cidade inteira ganha quando mais pessoas podem circular livremente.
          </p>
        </InfoCard>
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1140px] space-y-3 px-2 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-[55px] md:leading-none md:tracking-[-3.3px]">
          <span className="text-[#E46C17]">ASSINE</span> PARA APOIAR A{" "}
          <span className="text-[#E46C17]">TARIFA ZERO</span>
        </h2>
        <h3 className="text-lg font-extrabold leading-snug text-white md:whitespace-nowrap md:text-[clamp(1.125rem,3vw,2.4375rem)] md:leading-tight md:tracking-[-0.04em]">
          Transporte <span className="text-[#E46C17]">não é privilégio.</span> É
          direito.
        </h3>
      </div>
    </>
  );
}
