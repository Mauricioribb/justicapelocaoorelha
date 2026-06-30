import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  countAssinaturas,
  deletarAssinatura,
  exportAssinaturasCsv,
  getAssinaturas,
} from "@/lib/assinaturas";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const filters = {
    estado: params.get("estado") ?? "",
    cidade: params.get("cidade") ?? "",
    nome: params.get("nome") ?? "",
    whatsapp: params.get("whatsapp") ?? "",
    dataInicio: params.get("data_inicio") ?? "",
    dataFim: params.get("data_fim") ?? "",
    page: parseInt(params.get("page") ?? "1", 10),
    perPage: 20,
  };

  if (params.get("export") === "csv") {
    const csv = await exportAssinaturasCsv(filters);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="assinaturas.csv"',
      },
    });
  }

  const [assinaturas, total] = await Promise.all([
    getAssinaturas(filters),
    countAssinaturas(filters),
  ]);

  return NextResponse.json({
    assinaturas,
    total,
    totalPages: Math.ceil(total / filters.perPage),
    page: filters.page,
  });
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const id = parseInt(request.nextUrl.searchParams.get("id") ?? "0", 10);
  if (!id) {
    return NextResponse.json({ message: "ID inválido." }, { status: 400 });
  }

  const ok = await deletarAssinatura(id);
  return NextResponse.json({ success: ok });
}
