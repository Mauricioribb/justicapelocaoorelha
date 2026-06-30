"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { AltchaWidget, type AltchaWidgetHandle } from "@/components/AltchaWidget";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [altchaVerified, setAltchaVerified] = useState(false);
  const [altchaPayload, setAltchaPayload] = useState<string | null>(null);
  const [lockedUntil, setLockedUntil] = useState<string | null>(null);
  const altchaRef = useRef<AltchaWidgetHandle>(null);

  const isLocked = lockedUntil ? new Date(lockedUntil).getTime() > Date.now() : false;

  function handleAltchaChange(verified: boolean, payload?: string | null) {
    const ok = verified && Boolean(payload);
    setAltchaVerified(ok);
    setAltchaPayload(ok && payload ? payload : null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const payload =
      altchaPayload ??
      altchaRef.current?.getPayload() ??
      null;

    if (!payload) {
      setError("Complete a verificação anti-spam antes de entrar.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/painelpro/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, altcha: payload }),
      });

      let data: { message?: string; lockedUntil?: string; success?: boolean } = {};
      try {
        data = await res.json();
      } catch {
        setError("Erro no servidor. Tente novamente em instantes.");
        return;
      }

      if (!res.ok) {
        setError(data.message ?? "Erro ao fazer login.");
        if (data.lockedUntil) setLockedUntil(data.lockedUntil);

        // Só reseta o captcha se for erro do próprio captcha (expirado/inválido)
        if (res.status === 503 || res.status === 400) {
          setAltchaVerified(false);
          setAltchaPayload(null);
          altchaRef.current?.reset();
        }
        return;
      }

      const redirect = searchParams.get("redirect") ?? "/painelpro";
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-admin-primary text-xl font-bold text-white">
            CP
          </div>
          <h1 className="text-2xl font-bold text-admin-text">Painel Pro</h1>
        </div>

        <div className="admin-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-admin-text">
                Usuário
              </label>
              <input
                type="text"
                required
                disabled={isLocked}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="admin-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-admin-text">
                Senha
              </label>
              <input
                type="password"
                required
                disabled={isLocked}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="admin-input"
              />
            </div>
            {error && (
              <p
                className={`rounded-lg p-3 text-sm ${
                  isLocked ? "bg-amber-50 text-amber-800" : "bg-red-50 text-red-700"
                }`}
              >
                {error}
              </p>
            )}
            <div>
              <AltchaWidget ref={altchaRef} onVerifiedChange={handleAltchaChange} />
            </div>
            <button
              type="submit"
              disabled={loading || !altchaVerified || isLocked}
              className="admin-btn-primary w-full py-3 disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
