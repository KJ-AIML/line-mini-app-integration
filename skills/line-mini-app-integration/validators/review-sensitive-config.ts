/**
 * Track configuration fields that trigger re-review when changed after verification.
 */

export const REVIEW_SENSITIVE_FIELDS = [
  "channel_name",
  "channel_icon",
  "channel_description",
  "privacy_policy_url",
  "linked_oa",
  "published_endpoint_url",
  "scopes",
  "share_target_picker",
  "channel_consent_simplification",
];

export interface ReviewSensitiveCheck {
  field: string;
  currentValue: string;
  lastReviewValue: string | null;
  changed: boolean;
  risk: "low" | "medium" | "high";
}

export function checkReviewSensitiveChanges(
  currentConfig: Record<string, string>,
  lastReviewConfig: Record<string, string | null>
): ReviewSensitiveCheck[] {
  return REVIEW_SENSITIVE_FIELDS.map(field => {
    const currentValue = currentConfig[field] || "";
    const lastReviewValue = lastReviewConfig[field] || null;
    const changed = lastReviewValue !== null && currentValue !== lastReviewValue;

    return {
      field,
      currentValue,
      lastReviewValue,
      changed,
      risk: changed ? "high" : "low",
    };
  });
}

export function generateReviewWarning(changes: ReviewSensitiveCheck[]): string {
  const changed = changes.filter(c => c.changed);
  if (changed.length === 0) return "No review-sensitive changes detected.";

  return `WARNING: ${changed.length} review-sensitive field(s) changed since last review: ` +
    changed.map(c => c.field).join(", ") +
    ". These changes will trigger re-review if the app is already verified.";
}
