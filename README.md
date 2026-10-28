# ProjectMedic

A Node.js project health checker that identifies missing or misconfigured project metadata and files.

## Features

- Validates `package.json`
- Checks package name, version, and description
- Checks for a README, `.gitignore`, and license
- Checks for a test script and repository metadata
- Checks for a Node.js version requirement
- Provides a JavaScript API and command-line interface
- Supports JSON output

## Requirements

- Node.js

## Usage

Run the checker against the current directory:

```bash
node bin/doctor.js .
```

Check another project:

```bash
node bin/doctor.js /path/to/project
```

Output a JSON report:

```bash
node bin/doctor.js . --json
```

## Library API

```js
import { inspectProject } from "projectmedic";

const report = await inspectProject("./my-project");

console.log(report.summary);
console.log(report.findings);
```

The report contains the project path, a summary of check results, and individual findings.

## Development

Run the test suite:

```bash
npm test
```

## License

ISC