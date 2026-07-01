import { db } from "../src/lib/db";
import { assinaturas } from "../src/lib/db/schema";
import { slugify, validarWhatsapp } from "../src/lib/utils";

const rows = [
  ["IOLANDA JESUS DA SILVA", "75992079147", "BA", "Serrinha", "2026-06-18 20:59:18"],
  ["Adryele Silva", "75992330755", "BA", "Serrinha", "2026-06-18 20:49:08"],
  ["Cássio Boaventura Dos Santos Magalhães", "75992650280", "BA", "Serrinha", "2026-06-18 20:42:55"],
  ["Claudio Jose Rocha Guerra", "14997030247", "SP", "Avaré", "2026-03-20 01:01:47"],
] as const;

async function main() {
  let inserted = 0;

  for (const [nome, whatsappRaw, estado, cidade, dataAssinatura] of rows) {
    const whatsapp = validarWhatsapp(whatsappRaw);
    if (!whatsapp) {
      console.warn(`WhatsApp inválido, pulando: ${nome} (${whatsappRaw})`);
      continue;
    }

    await db.insert(assinaturas).values({
      nome,
      whatsapp,
      estado: estado.toUpperCase(),
      cidade,
      cidadeSlug: slugify(cidade),
      dataAssinatura,
      ipAddress: "import",
    });

    inserted++;
    console.log(`✓ ${nome} — ${cidade}/${estado}`);
  }

  console.log(`\n${inserted} assinaturas importadas.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
