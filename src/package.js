import fs from "node:fs/promises";
import path from "node:path";

// Read and validate the project's package.json.
export async function readPackageJson(projectPath) {
  const packagePath = path.join(projectPath, "package.json");
  const content = await fs.readFile(packagePath, "utf8");
  const data = JSON.parse(content);

  if (
    data === null ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error("package.json must contain a JSON object");
  }

  return data;
}