import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const assinaturas = sqliteTable("assinaturas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  whatsapp: text("whatsapp").notNull(),
  estado: text("estado").notNull(),
  cidade: text("cidade").notNull(),
  cidadeSlug: text("cidade_slug").notNull(),
  dataAssinatura: text("data_assinatura")
    .notNull()
    .default(sql`(datetime('now'))`),
  ipAddress: text("ip_address"),
});

export const metas = sqliteTable(
  "metas",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    estado: text("estado").notNull(),
    cidade: text("cidade").notNull(),
    cidadeSlug: text("cidade_slug").notNull(),
    meta: integer("meta").notNull(),
    protocolado: integer("protocolado").notNull().default(0),
    instrucoes: text("instrucoes"),
  },
  (table) => [
    uniqueIndex("metas_estado_cidade_slug_idx").on(
      table.estado,
      table.cidadeSlug
    ),
  ]
);

export const config = sqliteTable("config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const loginAttempts = sqliteTable(
  "login_attempts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    ipAddress: text("ip_address").notNull(),
    failedCount: integer("failed_count").notNull().default(0),
    lockoutLevel: integer("lockout_level").notNull().default(0),
    lockedUntil: text("locked_until"),
    lastAttemptAt: text("last_attempt_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [uniqueIndex("login_attempts_ip_idx").on(table.ipAddress)]
);
