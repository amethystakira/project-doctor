
import { createFinding, createSkippedFinding } from "../finding.js";

// Check whether package.json has a description.
export async function checkDescription(context) {
  if (context.packageJsonError) {
    return createSkippedFinding("description", "description");
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
