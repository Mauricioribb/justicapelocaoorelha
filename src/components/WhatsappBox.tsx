import type { BoxWhatsappConfig } from "@/lib/config-types";
import { buildBoxWhatsappUrl } from "@/lib/box-whatsapp";

interface WhatsappBoxProps {
  box: BoxWhatsappConfig;
  nomeSite: string;
}

function WarningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 flex-shrink-0 text-[#ffa900]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsappBox({ box, nomeSite }: WhatsappBoxProps) {
  const url = buildBoxWhatsappUrl(box, nomeSite);

  return (
    <div className="w-full overflow-hidden rounded-[10px] border border-[#ffa900]/40 bg-black/[0.41]">
      <div className="flex items-center gap-3 bg-[#012555] px-4 py-3 md:px-6 md:py-4">
        <WarningIcon />
        <h2 className="text-lg font-bold text-white md:text-xl">{box.titulo}</h2>
      </div>

      <div className="space-y-4 px-4 py-4 md:px-6 md:py-5">
        <div
          className="text-sm leading-relaxed text-white/90 md:text-base [&_b]:font-bold [&_strong]:font-bold [&_em]:italic"
          dangerouslySetInnerHTML={{ __html: box.descricao }}
        />

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#1ebe5d] md:w-auto"
          >
            <WhatsappIcon />
            {box.texto_botao}
          </a>
        ) : (
          <p className="text-sm font-medium text-red-400">
            WhatsApp não configurado. Informe um número válido com DDD no painel
            admin.
          </p>
        )}
      </div>
    </div>
  );
}
