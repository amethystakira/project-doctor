import path from "node:path";
import { pathExists } from "../scanner.js";
import { createFinding } from "../finding.js";

// Check whether .gitignore exists.
export async function checkGitignore(projectPath) {
  const exists = await pathExists(
    path.join(projectPath, ".gitignore")
  );

  return createFinding(
    "gitignore",
    ".gitignore",
    exists ? "pass" : "warn",
    exists ? ".gitignore exists" : ".gitignore is missing"
  );
}