import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";

const links = [
  { href: "/sobre-nos", label: "Sobre Nós" },
  { href: "/politicas-de-privacidade", label: "Políticas de Privacidade" },
];

function ChevronRightIcon() {
  return (
    <svg
      className="h-3 w-3 shrink-0"
      viewBox="0 0 320 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto bg-gradient-to-b from-[#006BAD] to-[#080301] text-white">
      <div className="mx-auto max-w-[1140px] border-t border-white/30 px-4 py-10 text-center">
        <Link
          href="/"
          className="mb-8 inline-block opacity-90 transition hover:opacity-100"
        >
          <Image
            src="/img/tarifazero-logo-w.png"
            alt="Tarifa Zero Já — Início"
            width={410}
            height={135}
            className="mx-auto h-auto w-full max-w-[209px] object-contain md:max-w-[410px]"
          />
        </Link>

        <nav className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-normal text-white">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 transition hover:text-[#FF7900]"
            >
              <ChevronRightIcon />
              {link.label}
            </Link>
          ))}
          <CookiePreferencesLink />
        </nav>

        <p className="text-center text-sm text-white/80">
          &copy; {new Date().getFullYear()} Tarifa Zero Já. Todos os direitos
          reservados.
        </p>
        <p className="mt-4 text-center text-xs text-white/70">
          Desenvolvido e Monitorado por{" "}
          <a
            href="https://pagemax.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white/90 transition hover:text-[#FF7900]"
          >
            PageMax
          </a>
        </p>
      </div>
    </footer>
  );
}
