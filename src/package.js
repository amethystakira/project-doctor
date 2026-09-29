import fs from "node:fs/promises";
import path from "node:path";

// Read and parse the project's package.json.
export async function readPackageJson(projectPath) {
  const packagePath = path.join(projectPath, "package.json");

  const content = await fs.readFile(packagePath, "utf8");

  return JSON.parse(content);
}