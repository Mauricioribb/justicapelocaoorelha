"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HoneypotField } from "@/components/HoneypotField";
import { ESTADOS } from "@/lib/estados";
import { HONEYPOT_FIELD } from "@/lib/honeypot";
import { mascaraWhatsapp } from "@/lib/utils";

interface LightboxData {
  titulo: string;
  texto: string;
  urlCompartilhar: string;
}

interface Props {
  estadoPadrao?: string;
  cidadePadrao?: string;
  embedded?: boolean;
  brand?: boolean;
}

export function FormularioAssinatura({
  estadoPadrao = "SP",
  cidadePadrao = "",
  embedded = false,
  brand = false,
}: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [estado, setEstado] = useState(estadoPadrao);
  const [cidade, setCidade] = useState(cidadePadrao);
  const [cidades, setCidades] = useState<string[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checkingWhatsapp, setCheckingWhatsapp] = useState(false);
  const [whatsappError, setWhatsappError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (estado) {
      loadCidades(estado, cidadePadrao);
    }
  }, [estado, cidadePadrao]);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  async function loadCidades(uf: string, preselect?: string) {
    setLoadingCidades(true);
    try {
      const res = await fetch(`/api/cidades?estado=${uf}`);
      const data = await res.json();
      setCidades(data.cidades ?? []);
      if (preselect && data.cidades?.includes(preselect)) {
        setCidade(preselect);
      } else {
        setCidade("");
      }
    } catch {
      setCidades([]);
    } finally {
      setLoadingCidades(false);
    }
  }

  async function verificarWhatsapp(numero: string) {
    const digits = numero.replace(/\D/g, "");
    if (digits.length < 10) {
      setWhatsappError(null);
      return true;
    }

    setCheckingWhatsapp(true);
    try {
      const res = await fetch(
        `/api/assinaturas?whatsapp=${encodeURIComponent(numero)}`
      );
      const data = await res.json();

      if (!data.valid) {
        setWhatsappError(null);
        return true;
      }

      if (data.exists) {
        setWhatsappError(
          "Este número já foi cadastrado. Use outro WhatsApp para assinar."
        );
        return false;
      }

      setWhatsappError(null);
      return true;
    } catch {
      setWhatsappError(null);
      return true;
    } finally {
      setCheckingWhatsapp(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const form = e.currentTarget;
    const honeypot =
      (form.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)?.value ?? "";

    const whatsappOk = await verificarWhatsapp(whatsapp);
    if (!whatsappOk) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/assinaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          whatsapp,
          estado,
          cidade,
          [HONEYPOT_FIELD]: honeypot,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message ?? "Erro ao assinar." });
        return;
      }

      setLightbox(data.lightbox);
      setNome("");
      setWhatsapp("");
    } catch {
      setMessage({ type: "error", text: "Erro ao enviar. Tente novamente." });
    } finally {
      setSubmitting(false);
    }
  }

  const whatsappShareUrl = lightbox
    ? `https://wa.me/?text=${encodeURIComponent(`Assine este abaixo-assinado: ${lightbox.urlCompartilhar}`)}`
    : "#";

  const labelClass = brand
    ? "mb-1 block text-sm font-medium text-white"
    : "mb-1 block text-sm font-medium text-zinc-700";
  const requiredClass = brand ? "text-[#FF8F00]" : "text-red-500";
  const helperClass = brand
    ? "mt-1 text-xs text-white/70"
    : "mt-1 text-xs text-zinc-500";
  const consentClass = brand
    ? "mt-3 text-center text-xs italic text-white"
    : "mt-3 text-center text-xs italic text-zinc-500";
  const fieldClass = brand
    ? "w-full rounded-lg border border-[#012555]/20 bg-white px-3 py-2.5 text-[#012555] transition focus:border-[#ba8831] focus:outline-none focus:ring-2 focus:ring-[#ba8831]/30 disabled:bg-zinc-50"
    : "w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500";
  const buttonClass = brand
    ? "inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#FF7900] px-3 py-3.5 text-sm font-bold uppercase leading-tight tracking-tight text-white shadow-md transition hover:bg-[#e56d00] hover:shadow-lg disabled:opacity-60 md:gap-2 md:px-6 md:py-4 md:text-lg md:tracking-wide"
    : "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-900 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:from-emerald-800 hover:to-emerald-950 disabled:opacity-60 md:text-base";

  return (
    <>
      <div
        className={
          embedded
            ? ""
            : "rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
        }
        id="abaixo-assinado-form"
      >
        <form onSubmit={handleSubmit} autoComplete="off" className="relative space-y-4">
          <HoneypotField id="aa-hp-cpv" />
          <div>
            <label htmlFor="aa-nome" className={labelClass}>
              Nome completo <span className={requiredClass}>*</span>
            </label>
            <input
              id="aa-nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="aa-whatsapp" className={labelClass}>
              Contato WhatsApp <span className={requiredClass}>*</span>
            </label>
            <input
              id="aa-whatsapp"
              type="tel"
              inputMode="numeric"
              required
              placeholder="(11) 98765-4321"
              maxLength={15}
              autoComplete="tel"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(mascaraWhatsapp(e.target.value));
                setWhatsappError(null);
              }}
              onBlur={() => {
                void verificarWhatsapp(whatsapp);
              }}
              aria-invalid={whatsappError ? true : undefined}
              aria-describedby={whatsappError ? "aa-whatsapp-error" : undefined}
              className={`${fieldClass}${whatsappError ? " border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
            />
            {checkingWhatsapp && (
              <p className={helperClass}>Verificando número...</p>
            )}
            {whatsappError && (
              <p id="aa-whatsapp-error" className="mt-1 text-sm text-red-600">
                {whatsappError}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="aa-estado" className={labelClass}>
                Estado <span className={requiredClass}>*</span>
              </label>
              <select
                id="aa-estado"
                required
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value);
                  setCidade("");
                }}
                className={fieldClass}
              >
                <option value="">Selecione o estado</option>
                {Object.entries(ESTADOS).map(([sigla, nome]) => (
                  <option key={sigla} value={sigla}>
                    {nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="aa-cidade" className={labelClass}>
                Cidade <span className={requiredClass}>*</span>
              </label>
              <select
                id="aa-cidade"
                required
                disabled={!estado || loadingCidades}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className={fieldClass}
              >
                <option value="">Selecione</option>
                {cidades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p className={helperClass}>Selecione sua cidade</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting || checkingWhatsapp || Boolean(whatsappError)}
              className={buttonClass}
            >
              {submitting ? "Enviando..." : "ASSINAR"}
            </button>
            <p className={consentClass}>
              Ao assinar, autorizo os responsáveis por este abaixo-assinado a
              entrarem em contato comigo para enviar informações, atualizações e
              conteúdos relacionados às reivindicações apresentadas.
            </p>
          </div>

          {message && (
            <p
              className={`rounded-lg p-3 text-sm ${
                message.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>

      {lightbox &&
        portalReady &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900/60 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            role="presentation"
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-lightbox-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border-b border-zinc-200 bg-zinc-50 px-6 pb-6 pt-8 text-center md:px-8">
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700"
                  aria-label="Fechar"
                >
                  &times;
                </button>

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-white">
                  <svg
                    className="h-8 w-8 text-zinc-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Assinatura registrada
                </p>
                <h2
                  id="success-lightbox-title"
                  className="mt-2 text-xl font-bold leading-snug text-zinc-900 md:text-2xl"
                >
                  {lightbox.titulo}
                </h2>
              </div>

              <div className="space-y-6 px-6 py-6 md:px-8 md:py-8">
                <p className="text-center text-base leading-relaxed text-zinc-600 md:text-lg">
                  {lightbox.texto}
                </p>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Próximo passo
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">
                    Compartilhe com amigos, familiares e grupos da sua paróquia.
                    Cada nova assinatura fortalece a mobilização pela vida.
                  </p>
                </div>

                <div className="flex justify-center">
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#1ebe5d]"
                  >
                    <svg
                      className="h-5 w-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Compartilhar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
