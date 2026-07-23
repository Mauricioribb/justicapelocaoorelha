import type { BoxWhatsappConfig } from "@/lib/config-types";
import { validarWhatsapp } from "@/lib/utils";

export function buildBoxWhatsappMessage(
  mensagem: string,
  nomeSite: string
): string {
  return mensagem.replaceAll("(nome_site)", nomeSite);
}

export function buildBoxWhatsappUrl(
  box: BoxWhatsappConfig,
  nomeSite: string
): string | null {
  const whatsapp = validarWhatsapp(box.whatsapp);
  if (!whatsapp) return null;

  const mensagem = buildBoxWhatsappMessage(box.mensagem, nomeSite);
  return `https://wa.me/55${whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
