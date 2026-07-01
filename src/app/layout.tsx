import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteCustomScripts } from "@/components/SiteCustomScripts";
import { getAppConfig } from "@/lib/config";
import { buildSiteMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getAppConfig();
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const siteUrl =
    rawSiteUrl && !rawSiteUrl.includes("localhost")
      ? rawSiteUrl
      : "https://www.tarifazeroja.com.br";
  return buildSiteMetadata(config, siteUrl);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getAppConfig();

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteCustomScripts
          head={config.codigos?.head}
          body={config.codigos?.body}
          footer={config.codigos?.footer}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
