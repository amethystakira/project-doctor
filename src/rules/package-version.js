
import { createFinding } from "../finding.js";

// Check whether package.json has a version.
export async function checkPackageVersion(context) {
  const { packageJson, packageJsonError } = context;

  if (packageJsonError) {
    return createFinding(
      "package-version",
      "package version",
      "fail",
      "Could not read package.json"
    );
  }

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
}
