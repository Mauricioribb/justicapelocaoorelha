import { db } from "../src/lib/db";
import { assinaturas } from "../src/lib/db/schema";
import { slugify, validarWhatsapp } from "../src/lib/utils";

const rows = [
  ["Jane Maira Sabino", "81999481210", "PB", "João Pessoa", "2026-06-22 01:38:52"],
  ["Maria elivania", "83988400430", "PB", "João Pessoa", "2026-06-21 14:45:13"],
  ["Cláudio José Rocha guerra", "14997030247", "SP", "Avaré", "2026-06-21 05:23:53"],
  ["Guto José", "11947553398", "SP", "Carapicuíba", "2026-03-21 23:19:43"],
  ["MARCOS JOSE ORTEGA", "14998116944", "SP", "Avaré", "2026-02-01 11:56:26"],
  ["Maria teste", "64996361886", "GO", "Aparecida de Goiânia", "2026-01-30 09:53:43"],
  ["MAURICIO SILVA teste", "64996365886", "GO", "Aparecida de Goiânia", "2026-01-30 09:44:10"],
  ["Antontio teste api whatsapp", "64996365896", "SP", "Américo de Campos", "2026-01-30 09:40:11"],
  ["Antontio teste api whatsapp", "64996365896", "SP", "Américo de Campos", "2026-01-30 09:38:54"],
  ["Marcelo José Ortega", "14997903115", "SP", "Avaré", "2026-01-17 20:57:23"],
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
