/**
 * Validate that LIFF-enabled routes are within the endpoint URL prefix.
 */

export interface EndpointValidationResult {
  valid: boolean;
  endpointUrl: string;
  routePaths: string[];
  violations: string[];
}

export function validateEndpointPrefix(
  endpointUrl: string,
  routePaths: string[]
): EndpointValidationResult {
  const violations: string[] = [];
  const endpointPath = new URL(endpointUrl).pathname;
  const endpointDir = endpointPath.endsWith("/") ? endpointPath : endpointPath + "/";

  for (const route of routePaths) {
    if (!route.startsWith(endpointDir) && route !== endpointPath) {
      violations.push(
        `Route "${route}" is outside endpoint URL prefix "${endpointPath}". LIFF init is not guaranteed.`
      );
    }
  }

  return {
    valid: violations.length === 0,
    endpointUrl,
    routePaths,
    violations,
  };
}

export function suggestEndpointFix(endpointUrl: string, routePaths: string[]): string {
  const commonPrefix = findCommonPrefix(routePaths);
  if (commonPrefix && commonPrefix !== new URL(endpointUrl).pathname) {
    return `Consider widening endpoint URL to "${commonPrefix}" to cover all LIFF routes.`;
  }
  return "No automatic fix suggested. Review route structure manually.";
}

function findCommonPrefix(paths: string[]): string {
  if (paths.length === 0) return "/";
  let prefix = paths[0];
  for (let i = 1; i < paths.length; i++) {
    while (!paths[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "/";
    }
  }
  return prefix;
}
