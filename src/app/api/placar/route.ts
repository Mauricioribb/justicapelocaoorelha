import { NextRequest, NextResponse } from "next/server";
import {
  getCtaLink,
  getInstrucoesCidade,
  getMetaCidade,
  getNivelCidade,
  getRankingCidadesComFiltro,
} from "@/lib/assinaturas";
import { getAppConfig } from "@/lib/config";

async function buildRankingItems(
  ranking: Awaited<ReturnType<typeof getRankingCidadesComFiltro>>,
  siteUrl: string
) {
  const config = await getAppConfig();

  return Promise.all(
    ranking.map(async (cidade, index) => {
      const nivelInfo = await getNivelCidade(cidade.estado, cidade.cidadeSlug);
      const metaCidade = await getMetaCidade(cidade.estado, cidade.cidadeSlug);
      const dados = nivelInfo.dados as {
        status?: string;
        frase?: string;
        cta?: string;
        link?: string;
      };

      return {
        posicao: index + 1,
        estado: cidade.estado,
        cidade: cidade.cidade,
        cidadeSlug: cidade.cidadeSlug,
        total: cidade.total,
        meta: metaCidade ?? config.meta_geral,
        nivel: nivelInfo.nivel,
        status: dados.status ?? "",
        frase: dados.frase ?? "",
        cta: dados.cta ?? "",
        ctaLink: getCtaLink(
          nivelInfo.nivel,
          cidade.estado,
          cidade.cidadeSlug,
          dados,
          cidade.cidade,
          siteUrl || "http://localhost:3000"
        ),
        instrucoes:
          nivelInfo.nivel === 4
            ? await getInstrucoesCidade(cidade.estado, cidade.cidadeSlug)
            : undefined,
      };
    })
  );
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const estado = params.get("estado") ?? "";
  const cidade = params.get("cidade") ?? "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  const temFiltro = Boolean(estado || cidade);

  const ranking = temFiltro
    ? await getRankingCidadesComFiltro({ estado, cidade })
    : await getRankingCidadesComFiltro({ limit: 10 });

  const items = await buildRankingItems(ranking, siteUrl);

  return NextResponse.json(
    {
      ranking: items,
      filtrado: temFiltro,
      estado,
      cidade,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
