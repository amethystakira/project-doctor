
import { createFinding } from "../finding.js";

// Check whether package.json has a description.
export async function checkDescription(context) {
  if (context.packageJsonError) {
    return createFinding(
      "description",
      "description",
      "fail",
      "Could not read package.json"
    );
  }

  if (context.packageJson.description) {
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
}
