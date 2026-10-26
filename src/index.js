
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scanProject } from "./scanner.js";

// Import all project checks.
import { checkPackageJson } from "./rules/package-json.js";
import { checkPackageName } from "./rules/package-name.js";
import { checkPackageVersion } from "./rules/package-version.js";
import { checkDescription } from "./rules/description.js";
import { checkReadme } from "./rules/readme.js";
import { checkGitignore } from "./rules/gitignore.js";
import { checkLicense } from "./rules/license.js";
import { checkTestScript } from "./rules/test-script.js";
import { checkRepository } from "./rules/repository.js";
import { checkNodeVersion } from "./rules/node-version.js";

const rules = [
  checkPackageJson,
  checkPackageName,
  checkPackageVersion,
  checkDescription,
  checkReadme,
  checkGitignore,
  checkLicense,
  checkTestScript,
  checkRepository,
  checkNodeVersion
];

// Inspect a project and return its complete health report.
export async function inspectProject(projectPath = ".") {
  if (typeof projectPath !== "string" || !projectPath.trim()) {
    throw new TypeError("Project path must be a non-empty string");
  }

  const absolutePath = path.resolve(projectPath);

  // Reject missing paths and paths that are not directories.
  let stats;

  try {
    stats = await import("node:fs/promises").then(
      ({ stat }) => stat(absolutePath)
    );
  } catch {
    throw new Error(`Project path does not exist: ${absolutePath}`);
  }

  if (!stats.isDirectory()) {
    throw new Error(`Project path is not a directory: ${absolutePath}`);
  }

  const findings = await scanProject(absolutePath, rules);

  const summary = {
    total: findings.length,
    passed: findings.filter((item) => item.status === "pass").length,
    warnings: findings.filter((item) => item.status === "warn").length,
    failed: findings.filter((item) => item.status === "fail").length
  };

  return {
    path: absolutePath,
    summary,
    findings
  };
}

// Allow the package to be imported without running the CLI.
export { rules };
