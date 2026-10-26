
import { createFinding, createSkippedFinding } from "../finding.js";

// Check whether package.json has a name.
export async function checkPackageName(context) {
  const { packageJson, packageJsonError } = context;

  if (context.packageJsonError) {
  return createSkippedFinding("package-name", "package name");
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
