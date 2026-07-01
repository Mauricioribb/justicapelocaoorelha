import { Footer } from "@/components/Footer";

export function CaoOrelhaPageFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-black font-[family-name:var(--font-roboto)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/img/fundo.jpeg')] bg-cover bg-center bg-no-repeat opacity-[0.29]"
      />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
