"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminCard, AdminPageTitle } from "@/components/admin/AdminUI";

export default function AdminCidadesPage() {
  const [estados, setEstados] = useState<Record<string, string>>({});
  const [cidadesData, setCidadesData] = useState<Record<string, string[]>>({});
  const [totalCidades, setTotalCidades] = useState(0);
  const [totalEstados, setTotalEstados] = useState(0);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busca, setBusca] = useState("");

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (filtroEstado) params.set("estado", filtroEstado);
    if (busca) params.set("busca", busca);

    const res = await fetch(`/api/painelpro/cidades?${params}`);
    const data = await res.json();
    setEstados(data.estados ?? {});
    setCidadesData(data.cidadesData ?? {});
    setTotalCidades(data.totalCidades ?? 0);
    setTotalEstados(data.totalEstados ?? 0);
  }, [filtroEstado, busca]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <AdminPageTitle
        title="Cidades do Brasil"
        description={`${totalEstados} estados · ${totalCidades.toLocaleString("pt-BR")} cidades`}
      />

      <div className="admin-card mb-6 flex flex-wrap gap-3 p-4">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="admin-input w-auto min-w-[180px]"
        >
          <option value="">Todos os estados</option>
          {Object.entries(estados).map(([sigla, nome]) => (
            <option key={sigla} value={sigla}>
              {nome} ({sigla})
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar cidade"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="admin-input w-auto min-w-[200px]"
        />
        <button onClick={load} className="admin-btn-primary">
          Filtrar
        </button>
        <button
          onClick={() => { setFiltroEstado(""); setBusca(""); }}
          className="admin-btn-secondary"
        >
          Limpar
        </button>
      </div>

      {Object.keys(cidadesData).length === 0 ? (
        <p className="text-admin-muted">Nenhuma cidade encontrada.</p>
      ) : (
        <div className="space-y-5">
          {Object.entries(cidadesData).map(([uf, cidades]) => (
            <AdminCard key={uf}>
              <div className="mb-4 flex items-center justify-between border-b border-admin-border pb-3">
                <h3 className="font-semibold text-admin-text">
                  {estados[uf] ?? uf} ({uf})
                </h3>
                <span className="rounded-lg bg-admin-primary/10 px-3 py-1 text-sm font-medium text-admin-primary">
                  {cidades.length} cidades
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cidades.map((cidade) => (
                  <span
                    key={cidade}
                    className="rounded-lg border border-admin-border bg-admin-bg px-2.5 py-1 text-sm text-admin-text hover:border-admin-primary/30 hover:bg-admin-primary/5"
                  >
                    {cidade}
                  </span>
                ))}
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
