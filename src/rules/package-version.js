
import { createFinding, createSkippedFinding } from "../finding.js";

// Check whether package.json has a version.
export async function checkPackageVersion(context) {
  const { packageJson, packageJsonError } = context;

  if (packageJsonError) {
    return createSkippedFinding("package-version", "package version");
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
