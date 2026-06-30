import { and, count, desc, eq, gte, like, lte, sql } from "drizzle-orm";
import { db } from "./db";
import { assinaturas, metas } from "./db/schema";
import { getAppConfig } from "./config";
import { AppConfig } from "./config-types";
import { slugify } from "./utils";

export const DEFAULT_INSTRUCOES = "Volte em breve para ver instruções";

let metasInstrucoesColumnReady = false;

async function ensureMetasInstrucoesColumn() {
  if (metasInstrucoesColumnReady) return;

  try {
    await db.$client.execute(`ALTER TABLE metas ADD COLUMN instrucoes TEXT`);
  } catch {
    // coluna já existe
  }

  metasInstrucoesColumnReady = true;
}

export interface AssinaturaFilters {
  perPage?: number;
  page?: number;
  estado?: string;
  cidade?: string;
  nome?: string;
  whatsapp?: string;
  dataInicio?: string;
  dataFim?: string;
}

function buildAssinaturaConditions(filters: AssinaturaFilters) {
  const {
    estado = "",
    cidade = "",
    nome = "",
    whatsapp = "",
    dataInicio = "",
    dataFim = "",
  } = filters;
  const conditions = [];

  if (estado) {
    conditions.push(eq(assinaturas.estado, estado.toUpperCase()));
  }
  if (cidade) {
    conditions.push(eq(assinaturas.cidadeSlug, slugify(cidade)));
  }
  if (nome.trim()) {
    conditions.push(like(assinaturas.nome, `%${nome.trim()}%`));
  }
  if (whatsapp.trim()) {
    const digits = whatsapp.replace(/\D/g, "");
    if (digits) {
      conditions.push(like(assinaturas.whatsapp, `%${digits}%`));
    }
  }
  if (dataInicio) {
    conditions.push(gte(assinaturas.dataAssinatura, `${dataInicio} 00:00:00`));
  }
  if (dataFim) {
    conditions.push(lte(assinaturas.dataAssinatura, `${dataFim} 23:59:59`));
  }

  return conditions.length ? and(...conditions) : undefined;
}

export async function salvarAssinatura(dados: {
  nome: string;
  whatsapp: string;
  estado: string;
  cidade: string;
  ipAddress?: string;
}) {
  const cidadeSlug = slugify(dados.cidade);
  const result = await db
    .insert(assinaturas)
    .values({
      nome: dados.nome,
      whatsapp: dados.whatsapp,
      estado: dados.estado.toUpperCase(),
      cidade: dados.cidade,
      cidadeSlug,
      ipAddress: dados.ipAddress,
    })
    .returning({ id: assinaturas.id });

  return result[0]?.id ?? false;
}

export async function existeWhatsapp(whatsapp: string): Promise<boolean> {
  const result = await db
    .select({ total: count() })
    .from(assinaturas)
    .where(eq(assinaturas.whatsapp, whatsapp));
  return (result[0]?.total ?? 0) > 0;
}

export async function getTotalPorCidade(estado: string, cidadeSlug: string) {
  const result = await db
    .select({ total: count() })
    .from(assinaturas)
    .where(
      and(
        eq(assinaturas.estado, estado.toUpperCase()),
        eq(assinaturas.cidadeSlug, cidadeSlug)
      )
    );
  return result[0]?.total ?? 0;
}

export async function getRankingCidades(limit = 10) {
  return getRankingCidadesComFiltro({ limit });
}

export async function getRankingCidadesComFiltro(options: {
  limit?: number;
  estado?: string;
  cidade?: string;
} = {}) {
  const { limit, estado = "", cidade = "" } = options;
  const conditions = [];

  if (estado) {
    conditions.push(eq(assinaturas.estado, estado.toUpperCase()));
  }
  if (cidade) {
    conditions.push(eq(assinaturas.cidadeSlug, slugify(cidade)));
  }

  const where = conditions.length ? and(...conditions) : undefined;

  const baseQuery = db
    .select({
      estado: assinaturas.estado,
      cidade: assinaturas.cidade,
      cidadeSlug: assinaturas.cidadeSlug,
      total: count(),
    })
    .from(assinaturas)
    .where(where)
    .groupBy(assinaturas.estado, assinaturas.cidadeSlug)
    .orderBy(desc(count()));

  if (limit !== undefined) {
    return baseQuery.limit(limit);
  }

  return baseQuery;
}

export async function getAssinaturas(filters: AssinaturaFilters = {}) {
  const { perPage = 20, page = 1 } = filters;
  const where = buildAssinaturaConditions(filters);
  const offset = (page - 1) * perPage;

  return db
    .select()
    .from(assinaturas)
    .where(where)
    .orderBy(desc(assinaturas.dataAssinatura))
    .limit(perPage)
    .offset(offset);
}

export async function countAssinaturas(filters: AssinaturaFilters = {}) {
  const where = buildAssinaturaConditions(filters);

  const result = await db
    .select({ total: count() })
    .from(assinaturas)
    .where(where);

  return result[0]?.total ?? 0;
}

export async function deletarAssinatura(id: number) {
  const result = await db.delete(assinaturas).where(eq(assinaturas.id, id));
  return result.rowsAffected > 0;
}

export async function getMetaCidade(estado: string, cidadeSlug: string) {
  await ensureMetasInstrucoesColumn();

  const row = await db.query.metas.findFirst({
    where: and(
      eq(metas.estado, estado.toUpperCase()),
      eq(metas.cidadeSlug, cidadeSlug)
    ),
  });
  return row?.meta ?? null;
}

export async function isProtocolado(estado: string, cidadeSlug: string) {
  await ensureMetasInstrucoesColumn();

  const row = await db.query.metas.findFirst({
    where: and(
      eq(metas.estado, estado.toUpperCase()),
      eq(metas.cidadeSlug, cidadeSlug)
    ),
  });
  return row?.protocolado === 1;
}

export async function salvarMetaCidade(
  estado: string,
  cidade: string,
  meta: number
) {
  await ensureMetasInstrucoesColumn();

  const cidadeSlug = slugify(cidade);
  await db
    .insert(metas)
    .values({
      estado: estado.toUpperCase(),
      cidade,
      cidadeSlug,
      meta,
      protocolado: 0,
    })
    .onConflictDoUpdate({
      target: [metas.estado, metas.cidadeSlug],
      set: { meta, cidade },
    });
}

export async function marcarProtocolado(
  estado: string,
  cidadeSlug: string,
  protocolado: boolean
) {
  await ensureMetasInstrucoesColumn();

  const existing = await db.query.metas.findFirst({
    where: and(
      eq(metas.estado, estado.toUpperCase()),
      eq(metas.cidadeSlug, cidadeSlug)
    ),
  });

  if (existing) {
    await db
      .update(metas)
      .set({ protocolado: protocolado ? 1 : 0 })
      .where(
        and(
          eq(metas.estado, estado.toUpperCase()),
          eq(metas.cidadeSlug, cidadeSlug)
        )
      );
    return true;
  }

  const assinatura = await db.query.assinaturas.findFirst({
    where: and(
      eq(assinaturas.estado, estado.toUpperCase()),
      eq(assinaturas.cidadeSlug, cidadeSlug)
    ),
  });

  if (!assinatura) return false;

  await db.insert(metas).values({
    estado: estado.toUpperCase(),
    cidade: assinatura.cidade,
    cidadeSlug,
    meta: 0,
    protocolado: protocolado ? 1 : 0,
  });

  return true;
}

export async function getInstrucoesCidade(
  estado: string,
  cidadeSlug: string
): Promise<string> {
  await ensureMetasInstrucoesColumn();

  const row = await db.query.metas.findFirst({
    where: and(
      eq(metas.estado, estado.toUpperCase()),
      eq(metas.cidadeSlug, cidadeSlug)
    ),
  });

  const text = row?.instrucoes?.trim();
  return text || DEFAULT_INSTRUCOES;
}

export async function salvarInstrucoesCidade(
  estado: string,
  cidadeSlug: string,
  instrucoes: string
): Promise<boolean> {
  await ensureMetasInstrucoesColumn();

  const existing = await db.query.metas.findFirst({
    where: and(
      eq(metas.estado, estado.toUpperCase()),
      eq(metas.cidadeSlug, cidadeSlug)
    ),
  });

  if (existing) {
    await db
      .update(metas)
      .set({ instrucoes })
      .where(
        and(
          eq(metas.estado, estado.toUpperCase()),
          eq(metas.cidadeSlug, cidadeSlug)
        )
      );
    return true;
  }

  const assinatura = await db.query.assinaturas.findFirst({
    where: and(
      eq(assinaturas.estado, estado.toUpperCase()),
      eq(assinaturas.cidadeSlug, cidadeSlug)
    ),
  });

  if (!assinatura) return false;

  const config = await getAppConfig();

  await db.insert(metas).values({
    estado: estado.toUpperCase(),
    cidade: assinatura.cidade,
    cidadeSlug,
    meta: config.meta_geral,
    protocolado: 0,
    instrucoes,
  });

  return true;
}

export interface NivelInfo {
  nivel: number;
  dados: AppConfig["niveis"][keyof AppConfig["niveis"]] | {
    status: string;
    frase: string;
    cta: string;
  };
  total?: number;
  meta?: number;
}

export async function getNivelCidade(
  estado: string,
  cidadeSlug: string
): Promise<NivelInfo> {
  const appConfig = await getAppConfig();
  const total = await getTotalPorCidade(estado, cidadeSlug);
  const niveis = appConfig.niveis;

  if (await isProtocolado(estado, cidadeSlug)) {
    return { nivel: 5, dados: niveis.nivel_5 };
  }

  const metaCidade = await getMetaCidade(estado, cidadeSlug);
  const meta = metaCidade ?? appConfig.meta_geral;

  if (total >= meta) {
    return {
      nivel: 4,
      dados: niveis.nivel_4,
      total,
      meta,
    };
  }

  const nivel3Meta = niveis.nivel_3.meta ?? 150;
  const nivel2Meta = niveis.nivel_2.meta ?? 50;
  const nivel1Meta = niveis.nivel_1.meta ?? 25;

  if (total >= nivel3Meta) {
    return { nivel: 3, dados: niveis.nivel_3, total, meta: nivel3Meta };
  }
  if (total >= nivel2Meta) {
    return { nivel: 2, dados: niveis.nivel_2, total, meta: nivel2Meta };
  }
  if (total >= nivel1Meta) {
    return { nivel: 1, dados: niveis.nivel_1, total, meta: nivel1Meta };
  }

  return {
    nivel: 0,
    dados: {
      status: "Começando",
      frase: "Seja um dos primeiros a assinar nesta cidade!",
      cta: "Assine agora",
    },
    total,
    meta: nivel1Meta,
  };
}

export function getCtaLink(
  nivel: number,
  estado: string,
  cidadeSlug: string,
  dadosNivel: { link?: string },
  cidadeNome: string,
  siteUrl: string
): string {
  const cidadeParam = encodeURIComponent(cidadeNome || cidadeSlug);

  switch (nivel) {
    case 0:
    case 1:
      return `${siteUrl}/?assinar&estado=${estado.toLowerCase()}&cidade=${cidadeParam}#abaixo-assinado-form`;
    case 2: {
      const url = `${siteUrl}/?assinar&estado=${estado.toLowerCase()}&cidade=${cidadeParam}#abaixo-assinado-form`;
      return `https://wa.me/?text=${encodeURIComponent(`Ajude nossa cidade a avançar! Assine o abaixo-assinado: ${url}`)}`;
    }
    case 3:
    case 4:
      return dadosNivel.link || siteUrl;
    case 5:
      return `${siteUrl}/${estado.toLowerCase()}-${cidadeSlug}`;
    default:
      return siteUrl;
  }
}

export async function getTotalAssinaturas() {
  const result = await db.select({ total: count() }).from(assinaturas);
  return result[0]?.total ?? 0;
}

export async function getTotalCidadesComAssinaturas() {
  const result = await db
    .select({
      total: sql<number>`count(distinct ${assinaturas.estado} || '-' || ${assinaturas.cidadeSlug})`,
    })
    .from(assinaturas);
  return result[0]?.total ?? 0;
}

export async function exportAssinaturasCsv(filters: AssinaturaFilters = {}) {
  const rows = await getAssinaturas({ ...filters, perPage: 100000, page: 1 });
  const header = "Nome,WhatsApp,Estado,Cidade,Data\n";
  const body = rows
    .map(
      (r) =>
        `"${r.nome}","${r.whatsapp}","${r.estado}","${r.cidade}","${r.dataAssinatura}"`
    )
    .join("\n");
  return header + body;
}
