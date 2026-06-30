export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_STORAGE_KEY = "cpv_cookie_consent";
export const COOKIE_CONSENT_OPEN_EVENT = "cpv-cookie-consent-open";

export type CookieConsentChoice = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export function parseConsent(raw: string | null): CookieConsentChoice | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CookieConsentChoice;
    if (
      data.version !== COOKIE_CONSENT_VERSION ||
      data.necessary !== true ||
      typeof data.analytics !== "boolean" ||
      typeof data.marketing !== "boolean" ||
      typeof data.updatedAt !== "string"
    ) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function readConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  return parseConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
}

export function saveConsent(analytics: boolean, marketing: boolean): CookieConsentChoice {
  const choice: CookieConsentChoice = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(choice));
  window.dispatchEvent(new CustomEvent("cpv-cookie-consent-changed", { detail: choice }));
  return choice;
}

export function hasValidConsent(): boolean {
  return readConsent() !== null;
}

export function acceptsAnalytics(): boolean {
  return readConsent()?.analytics === true;
}

export function acceptsMarketing(): boolean {
  return readConsent()?.marketing === true;
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
}
