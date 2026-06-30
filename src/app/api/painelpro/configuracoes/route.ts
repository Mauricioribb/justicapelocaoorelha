import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAppConfig, saveAppConfig } from "@/lib/config";
import { AppConfig } from "@/lib/config-types";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const config = await getAppConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json()) as AppConfig;
  await saveAppConfig(body);
  return NextResponse.json({ success: true });
}
