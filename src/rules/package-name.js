
import { createFinding } from "../finding.js";

// Check whether package.json has a name.
export async function checkPackageName(context) {
  const { packageJson, packageJsonError } = context;

  if (packageJsonError) {
    return createFinding(
      "package-name",
      "package name",
      "fail",
      "Could not read package.json"
    );
  }

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
}
