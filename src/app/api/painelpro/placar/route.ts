import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import {
  getMetaCidade,
  getInstrucoesCidade,
  getNivelCidade,
  getRankingCidades,
  marcarProtocolado,
  salvarInstrucoesCidade,
  salvarMetaCidade,
} from "@/lib/assinaturas";
import { getAppConfig } from "@/lib/config";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const config = await getAppConfig();
  const ranking = await getRankingCidades(100);

  const items = await Promise.all(
    ranking.map(async (cidade, index) => {
      const nivelInfo = await getNivelCidade(cidade.estado, cidade.cidadeSlug);
      const metaCidade = await getMetaCidade(cidade.estado, cidade.cidadeSlug);
      const dados = nivelInfo.dados as { status?: string };

      return {
        posicao: index + 1,
        ...cidade,
        meta: metaCidade ?? config.meta_geral,
        metaIndividual: metaCidade !== null,
        nivel: nivelInfo.nivel,
        status: dados.status ?? "",
        protocolado: nivelInfo.nivel === 5,
        instrucoes:
          nivelInfo.nivel === 4
            ? await getInstrucoesCidade(cidade.estado, cidade.cidadeSlug)
            : undefined,
      };
    })
  );

  return NextResponse.json({ ranking: items, metaGeral: config.meta_geral });
}

const metaSchema = z.object({
  estado: z.string().length(2),
  cidade: z.string().min(2),
  meta: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const body = await request.json();

  if (body.action === "salvar_meta") {
    const parsed = metaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
    }
    await salvarMetaCidade(
      parsed.data.estado,
      parsed.data.cidade,
      parsed.data.meta
    );
    return NextResponse.json({ success: true });
  }

  if (body.action === "marcar_protocolado") {
    const ok = await marcarProtocolado(
      body.estado,
      body.cidadeSlug,
      body.protocolado
    );
    return NextResponse.json({ success: ok });
  }

  if (body.action === "salvar_instrucoes") {
    const parsed = z
      .object({
        estado: z.string().length(2),
        cidadeSlug: z.string().min(1),
        instrucoes: z.string().max(10000),
      })
      .safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
    }

    const ok = await salvarInstrucoesCidade(
      parsed.data.estado,
      parsed.data.cidadeSlug,
      parsed.data.instrucoes
    );

    if (!ok) {
      return NextResponse.json(
        { message: "Cidade não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ message: "Ação inválida." }, { status: 400 });
}
