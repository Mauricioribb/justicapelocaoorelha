import { NextRequest, NextResponse } from "next/server";
import { getCidadesPorEstado } from "@/lib/cidades";
import { db } from "@/lib/db";
import { assinaturas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const estado = request.nextUrl.searchParams.get("estado")?.toUpperCase();

  if (!estado) {
    return NextResponse.json({ cidades: [] });
  }

  let cidades = await getCidadesPorEstado(estado);

  if (cidades.length === 0) {
    const fromDb = await db
      .selectDistinct({ cidade: assinaturas.cidade })
      .from(assinaturas)
      .where(eq(assinaturas.estado, estado))
      .orderBy(assinaturas.cidade);
    cidades = fromDb.map((r) => r.cidade);
  }

  return NextResponse.json({ cidades });
}
