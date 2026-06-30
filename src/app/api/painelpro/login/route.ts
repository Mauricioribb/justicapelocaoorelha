import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyAltchaPayload } from "@/lib/altcha";
import { createSession, verifyCredentials } from "@/lib/auth";
import {
  checkLoginLockout,
  clearLoginLockout,
  formatLockoutMessage,
  recordLoginFailure,
} from "@/lib/login-lockout";
import { getClientIp } from "@/lib/utils";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  altcha: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIp(request);
    const lockout = await checkLoginLockout(ipAddress);

    if (lockout.blocked && lockout.lockedUntil) {
      return NextResponse.json(
        {
          message: formatLockoutMessage(lockout.lockedUntil),
          lockedUntil: lockout.lockedUntil,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 400 });
    }

    try {
      const captcha = await verifyAltchaPayload(parsed.data.altcha);
      if (!captcha.ok) {
        return NextResponse.json(
          { message: "Verificação anti-spam inválida ou expirada. Tente novamente." },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { message: "Verificação anti-spam indisponível. Tente novamente." },
        { status: 503 }
      );
    }

    const user = await verifyCredentials(parsed.data.username, parsed.data.password);

    if (!user) {
      const failure = await recordLoginFailure(ipAddress);

      if (failure.locked && failure.lockedUntil) {
        return NextResponse.json(
          {
            message: formatLockoutMessage(failure.lockedUntil),
            lockedUntil: failure.lockedUntil,
          },
          { status: 429 }
        );
      }

      const suffix =
        failure.remainingAttempts > 0
          ? ` (${failure.remainingAttempts} tentativa${failure.remainingAttempts === 1 ? "" : "s"} restante${failure.remainingAttempts === 1 ? "" : "s"})`
          : "";

      return NextResponse.json(
        { message: `Usuário ou senha incorretos.${suffix}` },
        { status: 401 }
      );
    }

    await clearLoginLockout(ipAddress);
    await createSession(user);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Erro interno ao processar login. Tente novamente." },
      { status: 500 }
    );
  }
}
