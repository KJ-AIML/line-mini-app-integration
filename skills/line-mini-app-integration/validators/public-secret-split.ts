/**
 * Validate that no server-side secrets are exposed to frontend bundles.
 */

export interface SecretValidationResult {
  valid: boolean;
  exposedSecrets: string[];
  warnings: string[];
}

const SECRET_PATTERNS = [
  /LINE_CHANNEL_SECRET/i,
  /SESSION_SECRET/i,
  /DATABASE_URL/i,
  /PRIVATE_KEY/i,
  /API_SECRET/i,
  /JWT_SECRET/i,
];

const PUBLIC_PREFIXES = [
  "NEXT_PUBLIC_",
  "VITE_",
  "NUXT_PUBLIC_",
  "REACT_APP_",
  "PUBLIC_",
];

export function validatePublicSecretSplit(
  envContent: string,
  frontendBundleEnv: Record<string, string>
): SecretValidationResult {
  const exposedSecrets: string[] = [];
  const warnings: string[] = [];

  // Check env file for secrets that look like they might be public
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([A-Z_]+)=/);
    if (!match) continue;
    const key = match[1];

    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(key) && PUBLIC_PREFIXES.some(p => key.startsWith(p))) {
        exposedSecrets.push(key);
      }
    }
  }

  // Check frontend bundle env for secret leakage
  for (const [key, value] of Object.entries(frontendBundleEnv)) {
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(key)) {
        exposedSecrets.push(`Frontend bundle exposes: ${key}`);
      }
    }
  }

  if (exposedSecrets.length > 0) {
    warnings.push(
      "CRITICAL: Server secrets detected in public-facing configuration. " +
      "Move these to server-only environment variables immediately."
    );
  }

  return {
    valid: exposedSecrets.length === 0,
    exposedSecrets,
    warnings,
  };
}
