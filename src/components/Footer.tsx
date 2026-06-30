import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";

const links = [
  { href: "/sobre-nos", label: "Sobre Nós" },
  { href: "/politicas-de-privacidade", label: "Políticas de Privacidade" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto bg-[#0D2A4C] text-white">
      <div className="mx-auto max-w-[1200px] border-t border-white/30 px-4 py-10 text-center">
        <Link
          href="/"
          className="mb-8 inline-block opacity-90 transition hover:opacity-100"
        >
          <Image
            src="/img/logo-pais-pelos-filhos-naescola-w.png"
            alt="Pais pelos filhos na Escola — Início"
            width={360}
            height={100}
            className="mx-auto h-auto max-h-20 w-auto max-w-[280px] object-contain md:max-h-24 md:max-w-[360px]"
          />
        </Link>

        <nav className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/80">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#ffa900]"
            >
              {link.label}
            </Link>
          ))}
          <CookiePreferencesLink />
        </nav>
        <p className="text-center text-sm text-white/80">
          &copy; {new Date().getFullYear()} Pais pelos filhos na Escola. Todos os
          direitos reservados.
        </p>
        <p className="mt-4 text-center text-xs text-white/70">
          Desenvolvido e Monitorado por{" "}
          <a
            href="https://pagemax.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white/90 transition hover:text-[#ffa900]"
          >
            PageMax
          </a>
        </p>
      </div>
    </footer>
  );
}
