import { readPackageJson } from "../package.js";
import { createFinding } from "../finding.js";

// Check whether a Node.js version requirement is configured.
export async function checkNodeVersion(projectPath) {
  try {
    const packageJson = await readPackageJson(projectPath);
    const exists = Boolean(packageJson.engines?.node?.trim());

    return createFinding(
      "node-version",
      "Node.js version",
      exists ? "pass" : "warn",
      exists
        ? `Node.js requirement is "${packageJson.engines.node}"`
        : "Node.js version requirement is missing"
    );
  } catch {
    return createFinding(
      "node-version",
      "Node.js version",
      "fail",
      "Could not read package.json"
    );
  }
}