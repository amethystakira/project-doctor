import { readPackageJson } from "../package.js";
import { createFinding } from "../finding.js";

// Check whether repository metadata is configured.
export async function checkRepository(projectPath) {
  try {
    const packageJson = await readPackageJson(projectPath);
    const repository = packageJson.repository;
    const exists = Boolean(
      typeof repository === "string"
        ? repository.trim()
        : repository?.url?.trim()
    );

    return createFinding(
      "repository",
      "repository",
      exists ? "pass" : "warn",
      exists ? "Repository metadata exists" : "Repository metadata is missing"
    );
  } catch {
    return createFinding(
      "repository",
      "repository",
      "fail",
      "Could not read package.json"
    );
  }
}