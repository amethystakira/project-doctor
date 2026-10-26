import { createFinding } from "../finding.js";

// Check whether package.json exists and contains valid JSON.
export async function checkPackageJson(context) {
  const valid = !context.packageJsonError;

  return createFinding(
    "package-json",
    "package.json",
    valid ? "pass" : "fail",
    valid
      ? "package.json exists and is valid"
      : "package.json is missing or invalid"
  );
}
