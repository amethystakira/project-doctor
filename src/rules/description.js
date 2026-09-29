import { readPackageJson } from "../package.js";
import { createFinding } from "../finding.js";

// Check whether package.json has a description.
export async function checkDescription(projectPath) {
  try {
    const packageJson = await readPackageJson(projectPath);

    if (packageJson.description) {
      return createFinding(
        "description",
        "description",
        "pass",
        "Package description exists"
      );
    }

    return createFinding(
      "description",
      "description",
      "warn",
      "Package description is missing"
    );
  } catch {
    return createFinding(
      "description",
      "description",
      "fail",
      "Could not read package.json"
    );
  }
}