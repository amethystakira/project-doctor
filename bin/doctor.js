
import { inspectProject } from "../src/index.js";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const projectPath = args.find((arg) => !arg.startsWith("--")) || ".";

try {
  const report = await inspectProject(projectPath);

  if (report.summary.failed > 0) {
    process.exitCode = 1;
  }

  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log("\nProject Doctor\n");

    for (const finding of report.findings) {
      const symbol =
        finding.status === "pass"
          ? "✓"
          : finding.status === "warn"
            ? "⚠"
            : "✗";

      console.log(`${symbol} ${finding.message}`);
    }

    console.log(`\n${report.summary.total} checks completed`);
    console.log(
      `${report.summary.passed} passed, ` +
      `${report.summary.warnings} warnings, ` +
      `${report.summary.failed} failed`
    );
  }
} catch (error) {
  if (jsonMode) {
    console.log(JSON.stringify({ error: error.message }, null, 2));
  } else {
    console.error(`Project Doctor: ${error.message}`);
  }

  process.exitCode = 1;
}
