import type { Metadata } from "next";
import { AppConfig } from "./config-types";

export function absoluteUrl(path: string, siteUrl: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = siteUrl.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function buildSiteMetadata(
  config: AppConfig,
  siteUrl: string
): Metadata {
  const imageUrl = absoluteUrl(config.seo.imagem, siteUrl);

  return {
    title: config.seo.titulo,
    description: config.seo.descricao,
    openGraph: {
      title: config.seo.titulo,
      description: config.seo.descricao,
      url: siteUrl,
      siteName: config.seo.nome_site,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.titulo,
      description: config.seo.descricao,
      images: [imageUrl],
    },
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}
