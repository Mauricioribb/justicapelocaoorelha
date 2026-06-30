import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getTotalAssinaturas,
  getTotalCidadesComAssinaturas,
} from "@/lib/assinaturas";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const [totalAssinaturas, totalCidades] = await Promise.all([
    getTotalAssinaturas(),
    getTotalCidadesComAssinaturas(),
  ]);

  return NextResponse.json({ totalAssinaturas, totalCidades });
}
