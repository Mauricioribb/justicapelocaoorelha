"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  readConsent,
  saveConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

type DraftPrefs = {
  analytics: boolean;
  marketing: boolean;
};

function Toggle({
  checked,
  disabled,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="min-w-0">
        <p className="font-semibold text-zinc-900">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        } ${checked ? "bg-zinc-900" : "bg-zinc-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}

function PreferencesPanel({
  draft,
  onDraftChange,
  onAcceptAll,
  onRejectOptional,
  onSave,
  onClose,
  showClose,
}: {
  draft: DraftPrefs;
  onDraftChange: (draft: DraftPrefs) => void;
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onSave: () => void;
  onClose?: () => void;
  showClose?: boolean;
}) {
  return (
    <div className="space-y-4">
      <Toggle
        checked
        disabled
        onChange={() => {}}
        label="Cookies necessários"
        description="Essenciais para o funcionamento do site, segurança da área administrativa e para lembrar sua escolha de privacidade. Não podem ser desativados."
      />
      <Toggle
        checked={draft.analytics}
        onChange={(analytics) => onDraftChange({ ...draft, analytics })}
        label="Cookies analíticos"
        description="Ajudam a entender, de forma agregada e anônima, como o site é utilizado, para melhorar páginas e conteúdos. Só são ativados com seu consentimento."
      />
      <Toggle
        checked={draft.marketing}
        onChange={(marketing) => onDraftChange({ ...draft, marketing })}
        label="Cookies de marketing"
        description="Permitem medir campanhas e personalizar comunicações em outros canais. Atualmente não utilizamos este tipo de cookie; a opção fica disponível para transparência futura."
      />

      <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onSave}
          className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-black"
        >
          Salvar preferências
        </button>
        <button
          type="button"
          onClick={onAcceptAll}
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-100"
        >
          Aceitar todos
        </button>
        <button
          type="button"
          onClick={onRejectOptional}
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-100"
        >
          Apenas necessários
        </button>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 sm:ml-auto"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  );
}

export function CookieConsent() {
  const pathname = usePathname();
  const isPainelPro = pathname.startsWith("/painelpro");
  const [portalReady, setPortalReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showLegalDetails, setShowLegalDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<DraftPrefs>({ analytics: false, marketing: false });

  const applyChoice = useCallback((analytics: boolean, marketing: boolean) => {
    saveConsent(analytics, marketing);
    setVisible(false);
    setShowDetails(false);
    setShowLegalDetails(false);
  }, []);

  const loadDraftFromStored = useCallback((stored: CookieConsentChoice | null) => {
    setDraft({
      analytics: stored?.analytics ?? false,
      marketing: stored?.marketing ?? false,
    });
  }, []);

  useEffect(() => {
    setPortalReady(true);
    const stored = readConsent();
    if (!stored) {
      setVisible(true);
    }
    loadDraftFromStored(stored);

    const onOpen = () => {
      loadDraftFromStored(readConsent());
      setShowLegalDetails(false);
      setShowDetails(true);
      setVisible(true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
  }, [loadDraftFromStored]);

  if (isPainelPro || !portalReady || !visible) return null;

  return createPortal(
    <div
      className="fixed inset-x-0 bottom-0 z-[9998] p-2 sm:p-3"
      role="region"
      aria-label="Consentimento de cookies"
    >
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.15)] sm:rounded-2xl">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-zinc-900 to-transparent" aria-hidden />

        <div className="p-3 sm:p-4 md:p-5">
          <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-900 sm:text-[10px]">
                Privacidade e cookies
              </p>
              <h2 className="mt-0.5 text-sm font-bold text-zinc-900 sm:text-base md:text-lg">
                Respeitamos a sua privacidade
              </h2>
              <p className="mt-1 text-xs leading-snug text-zinc-600 sm:text-sm">
                Este site utiliza cookies. Escolha como deseja continuar.
              </p>
              {!showLegalDetails ? (
                <button
                  type="button"
                  onClick={() => setShowLegalDetails(true)}
                  className="mt-1 text-xs font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-2 hover:decoration-zinc-900 sm:text-sm"
                >
                  Saiba mais
                </button>
              ) : (
                <div className="mt-2 space-y-1.5">
                  <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm">
                    Utilizamos cookies e tecnologias similares em conformidade com a{" "}
                    <strong className="font-semibold text-zinc-900">
                      Lei Geral de Proteção de Dados (LGPD)
                    </strong>
                    . Os cookies <strong className="text-zinc-900">necessários</strong> garantem
                    o funcionamento do site. Cookies{" "}
                    <strong className="text-zinc-900">analíticos</strong> e de{" "}
                    <strong className="text-zinc-900">marketing</strong> só são utilizados se você
                    consentir. Você pode alterar sua escolha a qualquer momento. Consulte nossa{" "}
                    <Link
                      href="/politicas-de-privacidade"
                      className="font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-2 hover:decoration-zinc-900"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </p>
                  <p className="text-[11px] leading-snug text-zinc-500 sm:text-xs">
                    Controlador: mobilização Pais pelos filhos na Escola. Base legal do consentimento
                    opcional: art. 7º, I, da LGPD. Você pode revogar o consentimento quando quiser.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowLegalDetails(false)}
                    className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 sm:text-xs"
                  >
                    Ocultar detalhes
                  </button>
                </div>
              )}
            </div>

            {!showDetails && (
              <div className="grid shrink-0 grid-cols-3 gap-1.5 sm:gap-2 lg:flex lg:w-auto lg:flex-col lg:items-stretch xl:flex-row">
                <button
                  type="button"
                  onClick={() => applyChoice(false, false)}
                  className="whitespace-nowrap rounded-lg border border-zinc-300 px-1.5 py-1.5 text-[10px] font-semibold leading-tight text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-100 sm:px-3 sm:py-2 sm:text-xs md:text-sm"
                >
                  Apenas necessários
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="whitespace-nowrap rounded-lg border border-zinc-300 px-1.5 py-1.5 text-[10px] font-semibold leading-tight text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-100 sm:px-3 sm:py-2 sm:text-xs md:text-sm"
                >
                  Personalizar
                </button>
                <button
                  type="button"
                  onClick={() => applyChoice(true, true)}
                  className="whitespace-nowrap rounded-lg bg-zinc-900 px-1.5 py-1.5 text-[10px] font-bold uppercase leading-tight tracking-wide text-white shadow-sm transition hover:bg-black sm:px-3 sm:py-2 sm:text-xs md:text-sm"
                >
                  Aceitar todos
                </button>
              </div>
            )}
          </div>

          {showDetails && (
            <div className="mt-3 border-t border-zinc-200 pt-3 sm:mt-4 sm:pt-4">
              <PreferencesPanel
                draft={draft}
                onDraftChange={setDraft}
                onAcceptAll={() => applyChoice(true, true)}
                onRejectOptional={() => applyChoice(false, false)}
                onSave={() => applyChoice(draft.analytics, draft.marketing)}
                onClose={() => {
                  if (readConsent()) setVisible(false);
                  setShowDetails(false);
                  setShowLegalDetails(false);
                }}
                showClose={!!readConsent()}
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
