import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  existeWhatsapp,
  salvarAssinatura,
} from "@/lib/assinaturas";
import { getAppConfig } from "@/lib/config";
import { HONEYPOT_FIELD, isBotSubmission } from "@/lib/honeypot";
import { enviarMensagemWhatsWave } from "@/lib/whatswave";
import { getClientIp, validarWhatsapp } from "@/lib/utils";

const schema = z.object({
  nome: z.string().min(2),
  whatsapp: z.string().min(10),
  estado: z.string().length(2),
  cidade: z.string().min(2),
  [HONEYPOT_FIELD]: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const whatsapp = request.nextUrl.searchParams.get("whatsapp") ?? "";
    const whatsappValidado = validarWhatsapp(whatsapp);

    if (!whatsappValidado) {
      return NextResponse.json({ valid: false, exists: false });
    }

    const exists = await existeWhatsapp(whatsappValidado);
    return NextResponse.json({ valid: true, exists });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao verificar número." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (isBotSubmission(body[HONEYPOT_FIELD])) {
      const config = await getAppConfig();
      const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
      const siteUrl =
        envUrl && !envUrl.includes("localhost")
          ? envUrl
          : request.nextUrl.origin;
      return NextResponse.json({
        message: "Assinatura registrada com sucesso!",
        lightbox: {
          titulo: config.lightbox_titulo,
          texto: config.lightbox_texto,
          urlCompartilhar: siteUrl,
        },
      });
    }

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    const { nome, whatsapp, estado, cidade } = parsed.data;

    const whatsappValidado = validarWhatsapp(whatsapp);

    if (!whatsappValidado) {
      return NextResponse.json(
        { message: "Número de WhatsApp inválido." },
        { status: 400 }
      );
    }

    if (await existeWhatsapp(whatsappValidado)) {
      return NextResponse.json(
        { message: "Número já cadastrado, por favor use outro número." },
        { status: 400 }
      );
    }

    const id = await salvarAssinatura({
      nome,
      whatsapp: whatsappValidado,
      estado,
      cidade,
      ipAddress: getClientIp(request),
    });

    if (!id) {
      return NextResponse.json(
        { message: "Erro ao salvar assinatura. Tente novamente." },
        { status: 500 }
      );
    }

    const config = await getAppConfig();

    await enviarMensagemWhatsWave({
      nome,
      whatsapp: whatsappValidado,
      estado,
      cidade,
      titulo: config.titulo,
    });

    const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const siteUrl =
      envUrl && !envUrl.includes("localhost")
        ? envUrl
        : request.nextUrl.origin;
    const urlCompartilhar = `${siteUrl}/?assinar&estado=${estado.toLowerCase()}&cidade=${encodeURIComponent(cidade)}#abaixo-assinado-form`;

    return NextResponse.json({
      message: "Assinatura registrada com sucesso!",
      lightbox: {
        titulo: config.lightbox_titulo,
        texto: config.lightbox_texto,
        urlCompartilhar,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
