"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/painelpro": "Dashboard",
  "/painelpro/assinaturas": "Assinaturas",
  "/painelpro/placar": "Placar",
  "/painelpro/configuracoes": "Configurações",
  "/painelpro/cidades": "Cidades",
};

interface Props {
  onMenuToggle?: () => void;
}

export function AdminHeader({ onMenuToggle }: Props) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] ?? "Painel";

  return (
    <header className="sticky top-0 z-30 border-b border-admin-border bg-white px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={onMenuToggle}
            className="shrink-0 rounded-lg p-2 text-admin-muted hover:bg-admin-bg lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex min-w-0 items-center gap-2 text-sm">
            <span className="hidden text-admin-muted lg:inline">Home</span>
            <span className="hidden text-admin-muted lg:inline">/</span>
            <span className="truncate text-base font-semibold text-admin-text lg:font-medium">
              {pageTitle}
            </span>
          </div>
        </div>

        <Link
          href="/painelpro"
          className="flex shrink-0 items-center gap-2 lg:hidden"
          aria-label="Painel Pro — início"
        >
          <Image
            src="/img/logocatolicospelavida.png"
            alt=""
            width={120}
            height={36}
            className="h-8 w-auto max-w-[100px] object-contain"
            priority
          />
          <span className="text-sm font-bold leading-tight text-admin-text">Painel Pro</span>
        </Link>
      </div>
    </header>
  );
}
