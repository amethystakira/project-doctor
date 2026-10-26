// Create a standardized result for every project check.
export function createFinding(id, name, status, message) {
  return { id, name, status, message };
}

// Report a check that could not run because package.json is unavailable.
export function createSkippedFinding(id, name) {
  return createFinding(
    id,
    name,
    "warn",
    "Check skipped because package.json is missing or invalid"
  );
}