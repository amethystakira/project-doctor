
import { createFinding, createSkippedFinding } from "../finding.js";

// Check whether a Node.js version requirement is configured.
export async function checkNodeVersion(context) {
  if (context.packageJsonError) {
    return createSkippedFinding("node-version", "Node.js version");
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
