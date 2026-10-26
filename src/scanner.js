
import fs from "node:fs/promises";
import path from "node:path";
import { readPackageJson } from "./package.js";

// Check whether a path exists.
export async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Load reusable project data once.
export async function createProjectContext(projectPath) {
  const absolutePath = path.resolve(projectPath);
  let packageJson = null;
  let packageJsonError = null;

  try {
    packageJson = await readPackageJson(absolutePath);
  } catch (error) {
    packageJsonError = error;
  }

  return {
    projectPath: absolutePath,
    packageJson,
    packageJsonError
  };
}

// Run all checks using the same project context.
export async function scanProject(projectPath, rules) {
  const context = await createProjectContext(projectPath);
  const findings = [];

  for (const rule of rules) {
    findings.push(await rule(context));
  }

  return findings;
}
