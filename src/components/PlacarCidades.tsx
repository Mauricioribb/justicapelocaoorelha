"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ESTADOS } from "@/lib/estados";

interface PlacarItem {
  posicao: number;
  estado: string;
  cidade: string;
  cidadeSlug: string;
  total: number;
  nivel: number;
  status: string;
  frase: string;
  cta: string;
  ctaLink: string;
  instrucoes?: string;
}

const DEFAULT_INSTRUCOES = "Volte em breve para ver instruções";
const NIVEL_5_CTA = "Parabéns para a cidade!";

const labelClass = "mb-1 block text-sm font-medium text-white/80";
const fieldClass =
  "h-[42px] w-full rounded-lg border border-white/20 bg-white/95 px-3 text-sm text-[#0D2A4C] transition focus:border-[#FF7900] focus:outline-none focus:ring-2 focus:ring-[#FF7900]/30 disabled:bg-white/60";
const filterBtnClass =
  "flex h-[42px] w-full items-center justify-center rounded-lg border border-white/20 px-4 text-sm font-medium text-white transition hover:border-[#FF7900]/50 hover:bg-[#FF7900]/10";
const filterBarClass =
  "mb-4 flex items-end gap-1.5 lg:mb-6 lg:grid lg:grid-cols-4 lg:items-end lg:gap-4";
const filterFieldWrapClass = "min-w-0 basis-[40%] lg:basis-auto";
const filterIconWrapClass = "min-w-0 shrink-0 basis-[10%] lg:basis-auto";
const btnSecondaryClass = filterBtnClass;
const btnPrimaryClass =
  "inline-block rounded-xl bg-[#FF7900] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#e56d00] hover:shadow-lg";

const AUTOPLAY_MS = 4500;

function buildFormLink(estado: string, cidade: string) {
  const params = new URLSearchParams();
  params.set("assinar", "");
  if (estado) params.set("estado", estado.toLowerCase());
  if (cidade) params.set("cidade", cidade);
  return `/?${params.toString()}#abaixo-assinado-form`;
}

function getSlidesPerView(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function PlacarFilterBar({
  skeleton = false,
  estadoFiltro = "",
  cidadeFiltro = "",
  cidades = [],
  filtrado = false,
  viewMode = "carousel",
  onEstadoChange,
  onCidadeChange,
  onLimpar,
  onToggleView,
}: {
  skeleton?: boolean;
  estadoFiltro?: string;
  cidadeFiltro?: string;
  cidades?: string[];
  filtrado?: boolean;
  viewMode?: "carousel" | "grid";
  onEstadoChange?: (value: string) => void;
  onCidadeChange?: (value: string) => void;
  onLimpar?: () => void;
  onToggleView?: () => void;
}) {
  const mobileLabelClass = `${labelClass} max-lg:sr-only`;

  return (
    <div className={`${filterBarClass}${skeleton ? " opacity-60" : ""}`}>
      <div className={filterFieldWrapClass}>
        <label className={mobileLabelClass}>Estado:</label>
        {skeleton ? (
          <div className={`${fieldClass} opacity-60`} />
        ) : (
          <select
            value={estadoFiltro}
            onChange={(e) => onEstadoChange?.(e.target.value)}
            className={fieldClass}
            aria-label="Estado"
          >
            <option value="">Todos os estados</option>
            {Object.entries(ESTADOS).map(([sigla, nome]) => (
              <option key={sigla} value={sigla}>
                {nome}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={filterFieldWrapClass}>
        <label className={mobileLabelClass}>Cidade:</label>
        {skeleton ? (
          <div className={`${fieldClass} opacity-60`} />
        ) : (
          <select
            value={cidadeFiltro}
            disabled={!estadoFiltro}
            onChange={(e) => onCidadeChange?.(e.target.value)}
            className={fieldClass}
            aria-label="Cidade"
          >
            <option value="">Todas as cidades</option>
            {cidades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={filterIconWrapClass}>
        <span className={`${labelClass} invisible select-none max-lg:hidden`} aria-hidden>
          Limpar
        </span>
        {skeleton ? (
          <div className={`${filterBtnClass} opacity-60`} />
        ) : (
          <button
            type="button"
            onClick={onLimpar}
            className={`${filterBtnClass} max-lg:px-1`}
            aria-label="Limpar filtros"
            title="Limpar filtros"
          >
            <svg
              className="h-5 w-5 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden lg:inline">Limpar</span>
          </button>
        )}
      </div>

      {!filtrado && (
        <div className={filterIconWrapClass}>
          <span className={`${labelClass} invisible select-none max-lg:hidden`} aria-hidden>
            Visualização
          </span>
          {skeleton ? (
            <div className={`${filterBtnClass} opacity-60`} />
          ) : (
            <button
              type="button"
              onClick={onToggleView}
              className={`${filterBtnClass} max-lg:px-1`}
              aria-label={
                viewMode === "carousel" ? "Ver em grade" : "Ver em carrossel"
              }
              title={viewMode === "carousel" ? "Ver em grade" : "Ver em carrossel"}
            >
              {viewMode === "carousel" ? (
                <svg
                  className="h-5 w-5 lg:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 lg:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              )}
              <span className="hidden lg:inline">
                {viewMode === "carousel" ? "⊞ Grid" : "⊟ Carrossel"}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PlacarShell({
  title = "Ranking das Cidades",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-gray-400/50 bg-[#0D2A4C]">
      <div className="relative border-b border-gray-400/30 px-4 py-4 text-center md:px-8 md:py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF7900]">
          Mobilização nacional
        </p>
        <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">{title}</h2>
      </div>
      <div className="p-4 md:p-8">{children}</div>
    </div>
  );
}

function cleanStatusText(status: string) {
  return status.replace(/\s*[🟢✅]\s*$/u, "").trim();
}

function StatusBadge({ nivel, status }: { nivel: number; status: string }) {
  const text = cleanStatusText(status);

  return (
    <p className="flex items-center gap-1.5 text-xs font-semibold text-[#ffa900] md:text-sm">
      <span>{text}</span>
      {nivel === 4 && (
        <span
          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-green-500"
          aria-hidden
        />
      )}
      {nivel === 5 && (
        <svg
          className="h-4 w-4 shrink-0 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </p>
  );
}

function InstrucoesModal({
  titulo,
  instrucoes,
  onClose,
}: {
  titulo: string;
  instrucoes: string;
  onClose: () => void;
}) {
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!portalReady) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D2A4C]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0D2A4C] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="instrucoes-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-white/10 px-6 pb-5 pt-7 text-center md:px-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Fechar"
          >
            &times;
          </button>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF7900]">
            Instruções
          </p>
          <h2
            id="instrucoes-modal-title"
            className="mt-2 text-lg font-bold leading-snug text-white md:text-xl"
          >
            {titulo}
          </h2>
        </div>
        <div className="max-h-[50vh] overflow-y-auto px-6 py-6 md:px-8">
          <p className="whitespace-pre-wrap text-base leading-relaxed text-white/85">
            {instrucoes}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

function PlacarCityCard({ item }: { item: PlacarItem }) {
  const [showInstrucoes, setShowInstrucoes] = useState(false);
  const ctaClass =
    "mt-2 inline-block rounded-lg bg-[#FF7900] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#e56d00] md:mt-3 md:px-4 md:py-2 md:text-sm";

  return (
    <div className="h-full rounded-xl border border-white/10 bg-[#132f52] p-3 transition hover:border-[#FF7900]/35 md:p-5">
      <div className="mb-1 text-2xl font-bold text-[#FF7900] md:mb-2 md:text-3xl">{item.posicao}º</div>
      <h3 className="text-sm font-semibold leading-snug text-white md:text-base">
        {item.cidade} - {item.estado}
      </h3>
      <p className="my-1.5 text-sm text-white/75 md:my-2">
        <strong className="text-[#ffa900]">{item.total.toLocaleString("pt-BR")}</strong>{" "}
        {item.total === 1 ? "assinatura" : "assinaturas"}
      </p>
      <StatusBadge nivel={item.nivel} status={item.status} />
      <p className="mt-1 hidden text-sm text-white/70 sm:block">{item.frase}</p>
      {item.cta &&
        (item.nivel === 4 ? (
          <>
            <button
              type="button"
              onClick={() => setShowInstrucoes(true)}
              className={ctaClass}
            >
              {item.cta}
            </button>
            {showInstrucoes && (
              <InstrucoesModal
                titulo={`${item.cidade} - ${item.estado}`}
                instrucoes={item.instrucoes ?? DEFAULT_INSTRUCOES}
                onClose={() => setShowInstrucoes(false)}
              />
            )}
          </>
        ) : item.nivel === 5 ? (
          <span className={`${ctaClass} cursor-default`}>{NIVEL_5_CTA}</span>
        ) : (
          <a href={item.ctaLink} className={ctaClass}>
            {item.cta}
          </a>
        ))}
    </div>
  );
}

function SliderArrow({
  direction,
  onClick,
  disabled,
  variant = "overlay",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  variant?: "overlay" | "inline";
}) {
  const positionClasses =
    variant === "overlay"
      ? `absolute top-1/2 z-10 hidden -translate-y-1/2 md:flex ${
          direction === "prev" ? "left-0 md:-left-1" : "right-0 md:-right-1"
        }`
      : "relative shrink-0 md:hidden";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Slide anterior" : "Próximo slide"}
      className={`${positionClasses} flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#132f52] text-white shadow-md transition hover:border-[#FF7900]/50 hover:bg-[#FF7900]/15 disabled:pointer-events-none disabled:opacity-40 md:h-11 md:w-11`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        )}
      </svg>
    </button>
  );
}

function PlacarSlider({ items }: { items: PlacarItem[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const update = () => setSlidesPerView(getSlidesPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const maxIndex = Math.max(0, items.length - slidesPerView);
  const canSlide = items.length > slidesPerView;

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex));
  }, [maxIndex, items.length]);

  useEffect(() => {
    if (!canSlide || paused || reducedMotion) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [canSlide, paused, reducedMotion, maxIndex]);

  function goPrev() {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }

  function goNext() {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }

  const slideWidth = 100 / slidesPerView;

  return (
    <div
      className="relative px-2 md:px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {canSlide && (
        <>
          <SliderArrow
            direction="prev"
            onClick={goPrev}
            disabled={!canSlide}
            variant="overlay"
          />
          <SliderArrow
            direction="next"
            onClick={goNext}
            disabled={!canSlide}
            variant="overlay"
          />
        </>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * slideWidth}%)` }}
        >
          {items.map((item) => (
            <div
              key={`${item.estado}-${item.cidadeSlug}`}
              className="shrink-0 px-1 md:px-2"
              style={{ width: `${slideWidth}%` }}
            >
              <PlacarCityCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {canSlide && (
        <div className="mt-3 flex items-center justify-center gap-3 md:mt-5 md:gap-2">
          <SliderArrow
            direction="prev"
            onClick={goPrev}
            disabled={!canSlide}
            variant="inline"
          />
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir para slide ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? "w-6 bg-[#FF7900]"
                    : "w-2 bg-white/25 hover:bg-[#FF7900]/50"
                }`}
              />
            ))}
          </div>
          <SliderArrow
            direction="next"
            onClick={goNext}
            disabled={!canSlide}
            variant="inline"
          />
        </div>
      )}
    </div>
  );
}

export function PlacarCidades() {
  const [items, setItems] = useState<PlacarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [cidadeFiltro, setCidadeFiltro] = useState("");
  const [cidades, setCidades] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [filtrado, setFiltrado] = useState(false);

  const loadPlacar = useCallback(async (estado?: string, cidade?: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (estado) params.set("estado", estado);
    if (cidade) params.set("cidade", cidade);

    const url = params.toString() ? `/api/placar?${params}` : "/api/placar";
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    setItems(data.ranking ?? []);
    setFiltrado(Boolean(data.filtrado));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (estadoFiltro) {
      fetch(`/api/cidades?estado=${estadoFiltro}`)
        .then((r) => r.json())
        .then((data) => setCidades(data.cidades ?? []));
    } else {
      setCidades([]);
      setCidadeFiltro("");
    }
  }, [estadoFiltro]);

  useEffect(() => {
    if (estadoFiltro || cidadeFiltro) {
      loadPlacar(estadoFiltro || undefined, cidadeFiltro || undefined);
    } else {
      loadPlacar();
    }
  }, [estadoFiltro, cidadeFiltro, loadPlacar]);

  function limparFiltros() {
    setEstadoFiltro("");
    setCidadeFiltro("");
  }

  const formLink = buildFormLink(estadoFiltro, cidadeFiltro);

  if (loading && items.length === 0) {
    return (
      <PlacarShell>
        <PlacarFilterBar skeleton />
        <p className="py-6 text-center text-white/60">Carregando placar...</p>
      </PlacarShell>
    );
  }

  if (!filtrado && items.length === 0) {
    return (
      <PlacarShell>
        <div className="rounded-xl border border-white/10 bg-[#132f52] p-8 text-center">
          <p className="text-white/90">
            Nenhuma assinatura ainda. Seja o primeiro a assinar!
          </p>
          <a href="#abaixo-assinado-form" className={`mt-4 ${btnPrimaryClass}`}>
            Assine agora
          </a>
        </div>
      </PlacarShell>
    );
  }

  return (
    <PlacarShell>
      <PlacarFilterBar
        estadoFiltro={estadoFiltro}
        cidadeFiltro={cidadeFiltro}
        cidades={cidades}
        filtrado={filtrado}
        viewMode={viewMode}
        onEstadoChange={(value) => {
          setEstadoFiltro(value);
          setCidadeFiltro("");
        }}
        onCidadeChange={setCidadeFiltro}
        onLimpar={limparFiltros}
        onToggleView={() =>
          setViewMode(viewMode === "carousel" ? "grid" : "carousel")
        }
      />

      {loading ? (
        <p className="py-8 text-center text-white/60">Buscando...</p>
      ) : items.length === 0 && filtrado ? (
        <div className="rounded-xl border border-white/10 bg-[#132f52] p-8 text-center">
          <p className="text-lg font-semibold text-white">
            {cidadeFiltro
              ? `${cidadeFiltro} ainda não tem assinaturas`
              : `${ESTADOS[estadoFiltro] ?? estadoFiltro} ainda não tem cidades no ranking`}
          </p>
          <p className="mt-2 text-white/75">
            Seja o primeiro a apoiar! Sua assinatura pode colocar esta cidade no mapa
            da mobilização.
          </p>
          <a href={formLink} className={`mt-6 ${btnPrimaryClass}`}>
            Assine agora e convoque sua cidade
          </a>
        </div>
      ) : viewMode === "grid" || filtrado ? (
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <PlacarCityCard
              key={`${item.estado}-${item.cidadeSlug}`}
              item={item}
            />
          ))}
        </div>
      ) : (
        <PlacarSlider items={items} />
      )}

      {filtrado && items.length > 0 && (
        <p className="mt-4 text-center text-sm text-white/60">
          Mostrando {items.length}{" "}
          {items.length === 1 ? "cidade encontrada" : "cidades encontradas"}
          {estadoFiltro && ` em ${ESTADOS[estadoFiltro] ?? estadoFiltro}`}
          {cidadeFiltro && ` · ${cidadeFiltro}`}
        </p>
      )}
    </PlacarShell>
  );
}
