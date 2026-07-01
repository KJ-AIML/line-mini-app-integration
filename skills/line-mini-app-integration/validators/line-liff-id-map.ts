/**
 * Validate LIFF ID mapping across Developing, Review, and Published environments.
 */

export interface LiffIdMap {
  developing: string;
  review: string;
  published: string;
}

export interface LiffIdValidationResult {
  valid: boolean;
  currentMode: string;
  activeLiffId: string;
  allIds: LiffIdMap;
  errors: string[];
}

export function validateLiffIdMap(
  env: Record<string, string>,
  mode: "developing" | "review" | "published"
): LiffIdValidationResult {
  const errors: string[] = [];

  const developing = env.NEXT_PUBLIC_LINE_LIFF_ID || env.VITE_LINE_LIFF_ID || env.NUXT_PUBLIC_LINE_LIFF_ID || "";
  const review = env.LINE_LIFF_ID_REVIEW || "";
  const published = env.LINE_LIFF_ID_PUBLISHED || "";

  if (!developing) errors.push("Missing LIFF ID for Developing environment");
  if (!review) errors.push("Missing LIFF ID for Review environment");
  if (!published) errors.push("Missing LIFF ID for Published environment");

  const activeLiffId = mode === "developing" ? developing :
                       mode === "review" ? review : published;

  if (!activeLiffId) {
    errors.push(`No LIFF ID configured for current mode: ${mode}`);
  }

  return {
    valid: errors.length === 0,
    currentMode: mode,
    activeLiffId,
    allIds: { developing, review, published },
    errors,
  };
}
