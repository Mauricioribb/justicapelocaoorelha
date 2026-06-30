"use client";

import { useCallback, useEffect, useState } from "react";
import { ESTADOS } from "@/lib/estados";
import { AdminAlert, AdminCard, AdminPageTitle } from "@/components/admin/AdminUI";

interface RankingItem {
  posicao: number;
  estado: string;
  cidade: string;
  cidadeSlug: string;
  total: number;
  meta: number;
  metaIndividual: boolean;
  nivel: number;
  status: string;
  protocolado: boolean;
  instrucoes?: string;
}

const DEFAULT_INSTRUCOES = "Volte em breve para ver instruções";

const btnBase =
  "rounded-lg px-2.5 py-1.5 text-xs font-medium transition whitespace-nowrap";
const btnPrimary = `${btnBase} bg-admin-primary text-white hover:bg-admin-primary-hover`;
const btnSecondary = `${btnBase} border border-admin-border bg-white text-admin-text hover:bg-admin-bg`;
const btnSuccess = `${btnBase} border border-admin-green/30 bg-admin-green/10 text-admin-green hover:bg-admin-green/20`;
const btnWarning = `${btnBase} border border-admin-yellow/40 bg-admin-yellow/10 text-[#b8860b] hover:bg-admin-yellow/20`;
const btnMuted = `${btnBase} border border-admin-border bg-admin-bg text-admin-muted hover:bg-white`;

export default function AdminPlacarPage() {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [metaGeral, setMetaGeral] = useState(300);
  const [metaForm, setMetaForm] = useState({ estado: "", cidade: "", meta: "" });
  const [cidades, setCidades] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const [metaEditando, setMetaEditando] = useState("");
  const [instrucoesModal, setInstrucoesModal] = useState<RankingItem | null>(null);
  const [instrucoesTexto, setInstrucoesTexto] = useState("");
  const [salvandoInstrucoes, setSalvandoInstrucoes] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/painelpro/placar");
    const data = await res.json();
    setRanking(data.ranking ?? []);
    setMetaGeral(data.metaGeral ?? 300);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (metaForm.estado) {
      fetch(`/api/cidades?estado=${metaForm.estado}`)
        .then((r) => r.json())
        .then((d) => setCidades(d.cidades ?? []));
    } else {
      setCidades([]);
    }
  }, [metaForm.estado]);

  function showSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function salvarMeta(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/painelpro/placar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "salvar_meta",
        estado: metaForm.estado,
        cidade: metaForm.cidade,
        meta: parseInt(metaForm.meta, 10),
      }),
    });
    showSaved();
    setMetaForm({ estado: "", cidade: "", meta: "" });
    load();
  }

  function iniciarEdicao(item: RankingItem) {
    setEditando(`${item.estado}-${item.cidadeSlug}`);
    setMetaEditando(String(item.meta));
  }

  function cancelarEdicao() {
    setEditando(null);
    setMetaEditando("");
  }

  async function salvarEdicao(item: RankingItem) {
    const novaMeta = parseInt(metaEditando, 10);
    if (!novaMeta || novaMeta < 1) {
      alert("Informe uma meta válida (mínimo 1).");
      return;
    }

    await fetch("/api/painelpro/placar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "salvar_meta",
        estado: item.estado,
        cidade: item.cidade,
        meta: novaMeta,
      }),
    });

    cancelarEdicao();
    showSaved();
    load();
  }

  async function toggleProtocolado(item: RankingItem) {
    await fetch("/api/painelpro/placar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "marcar_protocolado",
        estado: item.estado,
        cidadeSlug: item.cidadeSlug,
        protocolado: !item.protocolado,
      }),
    });
    load();
  }

  function copiarUrl(item: RankingItem) {
    const url = `${window.location.origin}/?assinar&estado=${item.estado.toLowerCase()}&cidade=${encodeURIComponent(item.cidade)}#abaixo-assinado-form`;
    navigator.clipboard.writeText(url);
    alert("URL copiada!");
  }

  function abrirInstrucoes(item: RankingItem) {
    setInstrucoesModal(item);
    setInstrucoesTexto(item.instrucoes ?? DEFAULT_INSTRUCOES);
  }

  function fecharInstrucoes() {
    setInstrucoesModal(null);
    setInstrucoesTexto("");
  }

  async function salvarInstrucoes() {
    if (!instrucoesModal) return;

    setSalvandoInstrucoes(true);
    try {
      const res = await fetch("/api/painelpro/placar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "salvar_instrucoes",
          estado: instrucoesModal.estado,
          cidadeSlug: instrucoesModal.cidadeSlug,
          instrucoes: instrucoesTexto,
        }),
      });

      if (!res.ok) {
        alert("Erro ao salvar instruções.");
        return;
      }

      showSaved();
      fecharInstrucoes();
      load();
    } finally {
      setSalvandoInstrucoes(false);
    }
  }

  return (
    <div>
      <AdminPageTitle
        title="Placar de Mobilização"
        description={`Meta geral padrão: ${metaGeral.toLocaleString("pt-BR")} assinaturas`}
      />

      {saved && <AdminAlert>Alterações salvas com sucesso!</AdminAlert>}

      <AdminCard title="Definir Meta Individual por Cidade" className="mb-6">
        <form onSubmit={salvarMeta} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <select
            required
            value={metaForm.estado}
            onChange={(e) =>
              setMetaForm({ ...metaForm, estado: e.target.value, cidade: "" })
            }
            className="admin-input"
          >
            <option value="">Estado</option>
            {Object.entries(ESTADOS).map(([sigla, nome]) => (
              <option key={sigla} value={sigla}>
                {nome}
              </option>
            ))}
          </select>
          <select
            required
            disabled={!metaForm.estado}
            value={metaForm.cidade}
            onChange={(e) => setMetaForm({ ...metaForm, cidade: e.target.value })}
            className="admin-input disabled:bg-admin-bg"
          >
            <option value="">Cidade</option>
            {cidades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            required
            min={1}
            placeholder="Meta"
            value={metaForm.meta}
            onChange={(e) => setMetaForm({ ...metaForm, meta: e.target.value })}
            className="admin-input"
          />
          <button type="submit" className="admin-btn-primary">
            Salvar Meta
          </button>
        </form>
      </AdminCard>

      <h2 className="mb-4 text-lg font-semibold text-admin-text">Ranking de Cidades</h2>
      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Assinaturas</th>
              <th>Meta</th>
              <th>Nível</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ranking.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-admin-muted">
                  Nenhuma assinatura ainda.
                </td>
              </tr>
            ) : (
              ranking.map((item) => {
                const rowKey = `${item.estado}-${item.cidadeSlug}`;
                const isEditing = editando === rowKey;

                return (
                  <tr key={rowKey}>
                    <td>{item.posicao}º</td>
                    <td className="font-medium">{item.cidade}</td>
                    <td>{item.estado}</td>
                    <td className="font-bold text-admin-primary">{item.total.toLocaleString("pt-BR")}</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          min={1}
                          value={metaEditando}
                          onChange={(e) => setMetaEditando(e.target.value)}
                          className="admin-input w-24"
                          autoFocus
                        />
                      ) : (
                        <span>
                          {item.meta.toLocaleString("pt-BR")}
                          {!item.metaIndividual && (
                            <span className="ml-1 text-xs text-admin-muted">(padrão)</span>
                          )}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="rounded-full bg-admin-primary/10 px-2 py-0.5 text-xs font-medium text-admin-primary">
                        Nível {item.nivel}
                      </span>
                    </td>
                    <td className="max-w-[200px] text-admin-muted">{item.status}</td>
                    <td>
                      <div className="flex flex-wrap gap-1.5">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => salvarEdicao(item)}
                              className={btnSuccess}
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={cancelarEdicao}
                              className={btnMuted}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => iniciarEdicao(item)}
                            className={btnWarning}
                          >
                            Editar Meta
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => copiarUrl(item)}
                          className={btnSecondary}
                        >
                          Copiar URL
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleProtocolado(item)}
                          className={item.protocolado ? btnMuted : btnSuccess}
                        >
                          {item.protocolado ? "Desmarcar" : "Protocolado"}
                        </button>
                        {item.nivel === 4 && (
                          <button
                            type="button"
                            onClick={() => abrirInstrucoes(item)}
                            className={btnPrimary}
                          >
                            Instruções
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {instrucoesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={fecharInstrucoes}
          role="presentation"
        >
          <div
            className="admin-card w-full max-w-lg p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-instrucoes-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="admin-instrucoes-title"
              className="mb-1 text-lg font-semibold text-admin-text"
            >
              Instruções — {instrucoesModal.cidade} ({instrucoesModal.estado})
            </h3>
            <p className="mb-4 text-sm text-admin-muted">
              Texto exibido no site quando o visitante clica em &ldquo;Clique para
              participar da entrega do projeto&rdquo;.
            </p>
            <textarea
              rows={10}
              value={instrucoesTexto}
              onChange={(e) => setInstrucoesTexto(e.target.value)}
              className="admin-input"
              placeholder={DEFAULT_INSTRUCOES}
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={fecharInstrucoes}
                className="rounded-lg border border-admin-border px-4 py-2 text-sm font-medium text-admin-muted hover:bg-admin-bg"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={salvarInstrucoes}
                disabled={salvandoInstrucoes}
                className="admin-btn-primary px-4 py-2 disabled:opacity-60"
              >
                {salvandoInstrucoes ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
