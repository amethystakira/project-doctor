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

- Node.js 22 or later

## Installation and Usage

### Run without installing

Check the current directory:

```bash
npx projectmedic .
```

Check another project:

```bash
npx projectmedic /path/to/project
```

Output a JSON report:

```bash
npx projectmedic . --json
```

### Install as a development dependency

To use ProjectMedic in a project, install it with npm:

```bash
npm install --save-dev projectmedic
```

Then run the CLI using:

```bash
npx projectmedic .
```

## Library API

ProjectMedic can also be imported into JavaScript code.

```javascript
import { inspectProject } from "projectmedic";

const report = await inspectProject("./my-project");

console.log(report.summary);
console.log(report.findings);
```

The report contains the project path, a summary of check results, and individual findings.

## Development

Clone the repository:

```bash
git clone https://github.com/amethystakira/projectmedic.git
cd projectmedic
npm install
```

Run the test suite:

```bash
npm test
```

To run the CLI directly from the source code during development:

```bash
node bin/doctor.js .
```

## License

ISC
