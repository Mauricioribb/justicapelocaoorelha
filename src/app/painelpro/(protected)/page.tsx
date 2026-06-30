"use client";

import { useEffect, useState } from "react";
import { AdminPageTitle, AdminStatCard } from "@/components/admin/AdminUI";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalAssinaturas: 0, totalCidades: 0 });

  useEffect(() => {
    fetch("/api/painelpro/dashboard")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  return (
    <div>
      <AdminPageTitle
        title="Dashboard"
        description="Visão geral do abaixo-assinado"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Assinaturas"
          value={stats.totalAssinaturas.toLocaleString("pt-BR")}
          subtitle="Total de apoiadores cadastrados"
          color="blue"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <AdminStatCard
          title="Cidades Ativas"
          value={stats.totalCidades.toLocaleString("pt-BR")}
          subtitle="Cidades com assinaturas"
          color="coral"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <AdminStatCard
          title="Meta Geral"
          value="300"
          subtitle="Assinaturas por cidade (padrão)"
          color="green"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <AdminStatCard
          title="Níveis"
          value="5"
          subtitle="Níveis de mobilização"
          color="yellow"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="admin-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-admin-text">Acesso Rápido</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/painelpro/assinaturas", label: "Ver Assinaturas", color: "bg-admin-primary/10 text-admin-primary" },
              { href: "/painelpro/placar", label: "Placar de Cidades", color: "bg-admin-coral/10 text-admin-coral" },
              { href: "/painelpro/configuracoes", label: "Configurações", color: "bg-admin-green/10 text-admin-green" },
              { href: "/painelpro/cidades", label: "Lista de Cidades", color: "bg-admin-yellow/10 text-[#c88700]" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition hover:opacity-80 ${item.color}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="admin-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-admin-text">Resumo</h2>
          <p className="text-sm leading-relaxed text-admin-muted">
            Gerencie assinaturas, metas por cidade, níveis de mobilização e
            configurações do abaixo-assinado. Use o placar para acompanhar o
            ranking e marcar cidades como protocoladas.
          </p>
        </div>
      </div>
    </div>
  );
}
