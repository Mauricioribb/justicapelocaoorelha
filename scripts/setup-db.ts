import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/lib/db/schema";
import { CONFIG_KEY, DEFAULT_CONFIG } from "../src/lib/config-types";

const url = process.env.TURSO_DATABASE_URL?.trim() || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
const client = createClient({
  url,
  authToken,
});
const db = drizzle(client, { schema });

async function migrate() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS assinaturas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      estado TEXT NOT NULL,
      cidade TEXT NOT NULL,
      cidade_slug TEXT NOT NULL,
      data_assinatura TEXT NOT NULL DEFAULT (datetime('now')),
      ip_address TEXT
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS metas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estado TEXT NOT NULL,
      cidade TEXT NOT NULL,
      cidade_slug TEXT NOT NULL,
      meta INTEGER NOT NULL,
      protocolado INTEGER NOT NULL DEFAULT 0,
      instrucoes TEXT
    )
  `);

  await client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS metas_estado_cidade_slug_idx
    ON metas (estado, cidade_slug)
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT NOT NULL,
      failed_count INTEGER NOT NULL DEFAULT 0,
      lockout_level INTEGER NOT NULL DEFAULT 0,
      locked_until TEXT,
      last_attempt_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS login_attempts_ip_idx
    ON login_attempts (ip_address)
  `);

  try {
    await client.execute(`ALTER TABLE metas ADD COLUMN instrucoes TEXT`);
  } catch {
    // coluna já existe
  }

  console.log("Migrations aplicadas com sucesso.");
}

async function seed() {
  const existingConfig = await db.query.config.findFirst({
    where: eq(schema.config.key, CONFIG_KEY),
  });

  if (!existingConfig) {
    await db.insert(schema.config).values({
      key: CONFIG_KEY,
      value: JSON.stringify(DEFAULT_CONFIG),
    });
    console.log("Configuração padrão criada.");
  }

  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  const existingUser = await db.query.adminUsers.findFirst({
    where: eq(schema.adminUsers.username, username),
  });

  if (!existingUser) {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(schema.adminUsers).values({ username, passwordHash });
    console.log(`Admin criado: ${username}`);
  } else {
    console.log("Admin já existe, pulando criação.");
  }
}

async function main() {
  await migrate();
  await seed();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
