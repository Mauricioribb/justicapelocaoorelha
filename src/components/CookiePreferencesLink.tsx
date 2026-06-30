"use client";

import { openCookiePreferences } from "@/lib/cookie-consent";

export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="transition hover:text-white"
    >
      Preferências de cookies
    </button>
  );
}
