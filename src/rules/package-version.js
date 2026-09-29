import { readPackageJson } from "../package.js";
import { createFinding } from "../finding.js";

// Check whether package.json has a version.
export async function checkPackageVersion(projectPath) {
  try {
    const packageJson = await readPackageJson(projectPath);

    if (packageJson.version) {
      return createFinding(
        "package-version",
        "package version",
        "pass",
        `Package version is "${packageJson.version}"`
      );
    }

    return createFinding(
      "package-version",
      "package version",
      "fail",
      "Package version is missing"
    );
  } catch {
    return createFinding(
      "package-version",
      "package version",
      "fail",
      "Could not read package.json"
    );
  }
}