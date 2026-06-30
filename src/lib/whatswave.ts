import { getAppConfig } from "./config";

const ENDPOINT = "https://service.whatswave.com.br/instances/message/send-text";

export async function enviarMensagemWhatsWave(dados: {
  nome: string;
  whatsapp: string;
  estado: string;
  cidade: string;
  titulo?: string;
}) {
  const config = await getAppConfig();
  const api = config.api_whatswave;

  if (!api) return;

  const bearer = api.bearer_token?.trim() ?? "";
  const phoneNumber = api.phone_number?.replace(/\D/g, "") ?? "";
  const companyId = api.company_id?.trim() ?? "";
  const textTemplate = api.text ?? "";

  if (!bearer || !phoneNumber || !companyId || !textTemplate) return;

  const data = new Date().toLocaleDateString("pt-BR");
  const titulo = dados.titulo ?? config.titulo;

  const text = textTemplate
    .replaceAll("(nomecompleto)", dados.nome)
    .replaceAll("(whatsapp)", dados.whatsapp)
    .replaceAll("(estado)", dados.estado)
    .replaceAll("(cidade)", dados.cidade)
    .replaceAll("(titulo)", titulo)
    .replaceAll("(data)", data);

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearer}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        company_id: companyId,
        number: dados.whatsapp,
        text,
      }),
    });
  } catch (error) {
    console.error("[WhatsWave] Erro ao enviar mensagem:", error);
  }
}
