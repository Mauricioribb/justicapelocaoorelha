import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { countTotalCidades, filterCidades } from "@/lib/cidades";
import { ESTADOS } from "@/lib/estados";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const estado = params.get("estado") ?? undefined;
  const busca = params.get("busca") ?? undefined;

  const cidadesData = await filterCidades(estado, busca);
  const totalCidades = await countTotalCidades();

  return NextResponse.json({
    estados: ESTADOS,
    cidadesData,
    totalCidades,
    totalEstados: Object.keys(ESTADOS).length,
  });
}
