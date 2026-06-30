export const HONEYPOT_FIELD = "_hp_cpv";

export function isBotSubmission(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
