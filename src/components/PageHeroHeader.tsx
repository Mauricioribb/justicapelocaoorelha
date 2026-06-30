import Image from "next/image";
import Link from "next/link";

const heroPatternStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
};

export function PageHeroHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#6e5a95] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(219,39,119,0.18)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.15)_0%,_transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={heroPatternStyle}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-10 pt-8 text-center md:pb-14 md:pt-10">
        <Link
          href="/"
          className="mb-8 inline-block opacity-90 transition hover:opacity-100"
        >
          <Image
            src="/img/logo-pelas-maes-atipicas-w.png"
            alt="Pelas Mães Atípicas — Início"
            width={360}
            height={100}
            priority
            className="mx-auto h-auto max-h-16 w-auto max-w-[240px] object-contain md:max-h-20 md:max-w-[320px]"
          />
        </Link>

        <div
          className="mx-auto mb-6 h-px max-w-xs bg-gradient-to-r from-transparent via-[#62bacf] to-transparent md:max-w-md"
          aria-hidden
        />

        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-purple-200 md:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#62bacf] to-transparent" />
      </div>
    </section>
  );
}
