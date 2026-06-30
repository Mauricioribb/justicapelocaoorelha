import { put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const MAX_OG_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function validateOgImageFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return "Use PNG, JPG, WebP ou GIF.";
  }

  if (file.size > MAX_OG_IMAGE_BYTES) {
    return "A imagem deve ter no máximo 5 MB.";
  }

  return null;
}

function buildFilename(file: File): string {
  const ext = EXT_BY_MIME[file.type] ?? "png";
  return `og-${Date.now()}.${ext}`;
}

export async function saveOgImage(file: File): Promise<string> {
  const filename = buildFilename(file);
  const buffer = Buffer.from(await file.arrayBuffer());

  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    const blob = await put(`og/${filename}`, buffer, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "img", "og");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/img/og/${filename}`;
}

export async function deleteStoredOgImage(imagePath: string): Promise<void> {
  if (!imagePath.startsWith("/img/og/")) {
    return;
  }

  const relativePath = imagePath.replace(/^\/+/, "");
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  try {
    await unlink(absolutePath);
  } catch {
    // arquivo já removido ou indisponível
  }
}
