import { db } from "../src/lib/db";
import { assinaturas } from "../src/lib/db/schema";
import { slugify, validarWhatsapp } from "../src/lib/utils";

const rows = [
  ["Joscelio Aguiar Pinheiro", "11985305448", "SP", "Altair", "2026-05-22 21:37:38"],
  ["Claudio Jose Rocha Guerra", "14997030247", "SP", "Avaré", "2026-04-03 18:08:44"],
  ["Luiz Cláudio da Costa", "14997188668", "SP", "Avaré", "2026-04-03 18:01:59"],
  ["Marcelo José Ortega", "14997903115", "SP", "Campinas", "2026-04-03 18:00:06"],
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
