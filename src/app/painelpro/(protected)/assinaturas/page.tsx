"use client";

import { useCallback, useEffect, useState } from "react";
import { formatarWhatsapp } from "@/lib/utils";
import { ESTADOS } from "@/lib/estados";
import { AdminPageTitle } from "@/components/admin/AdminUI";

interface Assinatura {
  id: number;
  nome: string;
  whatsapp: string;
  estado: string;
  cidade: string;
  dataAssinatura: string;
}

export default function AdminAssinaturasPage() {
  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    estado: "",
    cidade: "",
    nome: "",
    whatsapp: "",
    data_inicio: "",
    data_fim: "",
  });

  const load = useCallback(async () => {
    const params = new URLSearchParams({ page: String(page), ...filters });
    const res = await fetch(`/api/painelpro/assinaturas?${params}`);
    const data = await res.json();
    setAssinaturas(data.assinaturas ?? []);
    setTotal(data.total ?? 0);
    setTotalPages(data.totalPages ?? 1);
  }, [page, filters]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja deletar esta assinatura?")) return;
    await fetch(`/api/painelpro/assinaturas?id=${id}`, { method: "DELETE" });
    load();
  }

  function exportCsv() {
    const params = new URLSearchParams({ export: "csv", ...filters });
    window.open(`/api/painelpro/assinaturas?${params}`, "_blank");
  }

  return (
    <div>
      <AdminPageTitle
        title="Assinaturas"
        description={`Total: ${total.toLocaleString("pt-BR")} assinaturas`}
      />

      <div className="admin-card mb-6 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium text-admin-muted">Estado</label>
            <select
              value={filters.estado}
              onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
              className="admin-input w-full"
            >
              <option value="">Todos os estados</option>
              {Object.entries(ESTADOS).map(([sigla, nome]) => (
                <option key={sigla} value={sigla}>
                  {nome}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium text-admin-muted">Cidade</label>
            <input
              type="text"
              placeholder="Cidade"
              value={filters.cidade}
              onChange={(e) => setFilters({ ...filters, cidade: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium text-admin-muted">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={filters.nome}
              onChange={(e) => setFilters({ ...filters, nome: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium text-admin-muted">WhatsApp</label>
            <input
              type="text"
              placeholder="WhatsApp"
              value={filters.whatsapp}
              onChange={(e) => setFilters({ ...filters, whatsapp: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium text-admin-muted">Data início</label>
            <input
              type="date"
              value={filters.data_inicio}
              onChange={(e) => setFilters({ ...filters, data_inicio: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs font-medium text-admin-muted">Data fim</label>
            <input
              type="date"
              value={filters.data_fim}
              onChange={(e) => setFilters({ ...filters, data_fim: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div className="flex min-w-0 items-end">
            <button
              type="button"
              onClick={() => {
                setPage(1);
                load();
              }}
              className="admin-btn-primary w-full"
            >
              Filtrar
            </button>
          </div>

          <div className="flex min-w-0 items-end">
            <button type="button" onClick={exportCsv} className="admin-btn-secondary w-full">
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>WhatsApp</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {assinaturas.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-admin-muted">
                  Nenhuma assinatura encontrada.
                </td>
              </tr>
            ) : (
              assinaturas.map((a) => (
                <tr key={a.id}>
                  <td className="font-medium">{a.nome}</td>
                  <td>{formatarWhatsapp(a.whatsapp)}</td>
                  <td>{a.estado}</td>
                  <td>{a.cidade}</td>
                  <td>{new Date(a.dataAssinatura).toLocaleString("pt-BR")}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="admin-btn-secondary disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 text-sm text-admin-muted">
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="admin-btn-secondary disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
