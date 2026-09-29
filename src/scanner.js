import fs from "node:fs/promises";

// Check whether a path exists.
export async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

// Run all project checks and collect their findings.
export async function scanProject(projectPath, rules) {
  const findings = [];

  for (const rule of rules) {
    const finding = await rule(projectPath);
    findings.push(finding);
  }

  return findings;
}