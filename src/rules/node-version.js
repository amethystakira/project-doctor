
import { createFinding } from "../finding.js";

// Check whether a Node.js version requirement is configured.
export async function checkNodeVersion(context) {
  if (context.packageJsonError) {
    return createFinding(
      "node-version",
      "Node.js version",
      "fail",
      "Could not read package.json"
    );
  }

  const nodeVersion = context.packageJson.engines?.node?.trim();
  const exists = Boolean(nodeVersion);

  return createFinding(
    "node-version",
    "Node.js version",
    exists ? "pass" : "warn",
    exists
      ? `Node.js requirement is "${nodeVersion}"`
      : "Node.js version requirement is missing"
  );
}
