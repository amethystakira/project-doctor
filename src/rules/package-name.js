import { readPackageJson } from "../package.js";
import { createFinding } from "../finding.js";

// Check whether package.json has a name.
export async function checkPackageName(projectPath) {
  try {
    const packageJson = await readPackageJson(projectPath);

    if (packageJson.name) {
      return createFinding(
        "package-name",
        "package name",
        "pass",
        `Package name is "${packageJson.name}"`
      );
    }

    return createFinding(
      "package-name",
      "package name",
      "fail",
      "Package name is missing"
    );
  } catch {
    return createFinding(
      "package-name",
      "package name",
      "fail",
      "Could not read package.json"
    );
  }
}