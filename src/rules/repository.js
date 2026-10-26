
import { createFinding, createSkippedFinding } from "../finding.js";

// Check whether repository metadata is configured.
export async function checkRepository(context) {
  if (context.packageJsonError) {
    return createSkippedFinding("repository", "repository");
  }

  const repository = context.packageJson.repository;

  const exists = Boolean(
    typeof repository === "string"
      ? repository.trim()
      : repository?.url?.trim()
  );

  return createFinding(
    "repository",
    "repository",
    exists ? "pass" : "warn",
    exists
      ? "Repository metadata exists"
      : "Repository metadata is missing"
  );
}
