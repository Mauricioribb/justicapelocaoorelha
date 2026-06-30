import { deriveKey } from "altcha-lib/algorithms/pbkdf2";
import {
  create,
  deriveHmacKeySecret,
  randomInt,
} from "altcha-lib/frameworks/nextjs";

let altchaApi: ReturnType<typeof create> | null = null;

async function initAltcha() {
  const hmacSignatureSecret = process.env.ALTCHA_HMAC_KEY;
  if (!hmacSignatureSecret) {
    throw new Error("ALTCHA_HMAC_KEY is not configured");
  }

  altchaApi = create({
    hmacSignatureSecret,
    hmacKeySignatureSecret: await deriveHmacKeySecret(hmacSignatureSecret),
    createChallengeParameters: () => ({
      algorithm: "PBKDF2/SHA-256",
      cost: 1_500,
      counter: randomInt(5_000, 10_000),
      expiresAt: new Date(Date.now() + 600_000),
    }),
    deriveKey,
  });

  return altchaApi;
}

export async function getAltchaApi() {
  if (!altchaApi) {
    await initAltcha();
  }
  return altchaApi!;
}

export async function verifyAltchaPayload(payload: string | undefined) {
  const api = await getAltchaApi();

  // middleware always returns a Response — parse the JSON to read the result
  const response = (await api.middleware(
    new Request("http://altcha.local/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ altcha: payload ?? "" }),
    }),
    false // throwOnFailure = false → always returns 200 with {error, ...}
  )) as Response;

  const data = (await response.json()) as { error?: string | null };

  if (data.error) {
    return { ok: false as const, error: data.error };
  }

  return { ok: true as const };
}
