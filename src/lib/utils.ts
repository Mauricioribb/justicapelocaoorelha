export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validarWhatsapp(numero: string): string | false {
  const digits = numero.replace(/\D/g, "");

  if (digits.length < 10 || digits.length > 11) {
    return false;
  }

  let normalized = digits;
  if (normalized.length === 10) {
    normalized = "9" + normalized;
  }

  if (normalized.charAt(2) !== "9") {
    return false;
  }

  return normalized;
}

export function formatarWhatsapp(numero: string): string {
  const digits = numero.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return numero;
}

export function mascaraWhatsapp(valor: string): string {
  const digits = valor.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function getClientIp(request: Request | { headers: Headers }): string {
  const headers = request.headers;

  const forwarded =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim();

  if (forwarded) return forwarded;

  if ("ip" in request && typeof request.ip === "string" && request.ip) {
    return request.ip;
  }

  return "unknown";
}
