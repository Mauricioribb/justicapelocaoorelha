import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  deleteStoredOgImage,
  saveOgImage,
  validateOgImageFile,
} from "@/lib/og-image-storage";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { message: "Selecione uma imagem válida." },
      { status: 400 }
    );
  }

  const validationError = validateOgImageFile(file);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  try {
    const url = await saveOgImage(file);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      {
        message:
          "Não foi possível salvar a imagem. Tente novamente ou use uma URL externa.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const imagePath = request.nextUrl.searchParams.get("path")?.trim() ?? "";

  if (!imagePath) {
    return NextResponse.json(
      { message: "Informe o caminho da imagem." },
      { status: 400 }
    );
  }

  try {
    await deleteStoredOgImage(imagePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Não foi possível remover a imagem." },
      { status: 500 }
    );
  }
}
