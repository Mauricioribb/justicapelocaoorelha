import { eq } from "drizzle-orm";
import { db } from "./db";
import { loginAttempts } from "./db/schema";

export const MAX_LOGIN_ATTEMPTS = 5;
export const BASE_LOCKOUT_HOURS = 6;

let loginAttemptsTableReady = false;

async function ensureLoginAttemptsTable() {
  if (loginAttemptsTableReady) return;

  await db.$client.execute(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT NOT NULL,
      failed_count INTEGER NOT NULL DEFAULT 0,
      lockout_level INTEGER NOT NULL DEFAULT 0,
      locked_until TEXT,
      last_attempt_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await db.$client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS login_attempts_ip_idx
    ON login_attempts (ip_address)
  `);

  loginAttemptsTableReady = true;
}

function lockoutDurationMs(level: number): number {
  return BASE_LOCKOUT_HOURS * Math.pow(2, level - 1) * 60 * 60 * 1000;
}

function nowIso(): string {
  return new Date().toISOString();
}

function formatDateTimePtBr(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function formatLockoutMessage(lockedUntil: string): string {
  return `Muitas tentativas de login. Aguarde até ${formatDateTimePtBr(lockedUntil)} para tentar novamente.`;
}

export async function checkLoginLockout(ipAddress: string): Promise<{
  blocked: boolean;
  lockedUntil?: string;
  remainingAttempts?: number;
}> {
  await ensureLoginAttemptsTable();

  const record = await db.query.loginAttempts.findFirst({
    where: eq(loginAttempts.ipAddress, ipAddress),
  });

  if (!record?.lockedUntil) {
    return {
      blocked: false,
      remainingAttempts: MAX_LOGIN_ATTEMPTS - (record?.failedCount ?? 0),
    };
  }

  const lockedUntilMs = new Date(record.lockedUntil).getTime();
  if (lockedUntilMs > Date.now()) {
    return { blocked: true, lockedUntil: record.lockedUntil };
  }

  await db
    .update(loginAttempts)
    .set({ lockedUntil: null, lastAttemptAt: nowIso() })
    .where(eq(loginAttempts.ipAddress, ipAddress));

  return {
    blocked: false,
    remainingAttempts: MAX_LOGIN_ATTEMPTS - record.failedCount,
  };
}

export async function recordLoginFailure(ipAddress: string): Promise<{
  locked: boolean;
  lockedUntil?: string;
  remainingAttempts: number;
}> {
  const record = await db.query.loginAttempts.findFirst({
    where: eq(loginAttempts.ipAddress, ipAddress),
  });

  const failedCount = (record?.failedCount ?? 0) + 1;

  if (failedCount >= MAX_LOGIN_ATTEMPTS) {
    const lockoutLevel = (record?.lockoutLevel ?? 0) + 1;
    const lockedUntil = new Date(
      Date.now() + lockoutDurationMs(lockoutLevel)
    ).toISOString();

    if (record) {
      await db
        .update(loginAttempts)
        .set({
          failedCount: 0,
          lockoutLevel,
          lockedUntil,
          lastAttemptAt: nowIso(),
        })
        .where(eq(loginAttempts.ipAddress, ipAddress));
    } else {
      await db.insert(loginAttempts).values({
        ipAddress,
        failedCount: 0,
        lockoutLevel,
        lockedUntil,
        lastAttemptAt: nowIso(),
      });
    }

    return { locked: true, lockedUntil, remainingAttempts: 0 };
  }

  if (record) {
    await db
      .update(loginAttempts)
      .set({ failedCount, lastAttemptAt: nowIso() })
      .where(eq(loginAttempts.ipAddress, ipAddress));
  } else {
    await db.insert(loginAttempts).values({
      ipAddress,
      failedCount,
      lockoutLevel: 0,
      lockedUntil: null,
      lastAttemptAt: nowIso(),
    });
  }

  return {
    locked: false,
    remainingAttempts: MAX_LOGIN_ATTEMPTS - failedCount,
  };
}

export async function clearLoginLockout(ipAddress: string): Promise<void> {
  await db.delete(loginAttempts).where(eq(loginAttempts.ipAddress, ipAddress));
}
