import { Footer } from "@/components/Footer";
import { PageHeroHeader } from "@/components/PageHeroHeader";

export function StaticPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeroHeader title={title} subtitle={subtitle} />

      <div className="flex flex-1 flex-col bg-[#f0f9fc]">
        <div className="h-2 w-full bg-gradient-to-r from-[#6e5a95] via-[#62bacf] to-[#6e5a95]" />

        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 md:py-14">
          <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-[0_16px_40px_-12px_rgba(30,10,60,0.15)] md:p-10">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
