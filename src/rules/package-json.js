import { pathExists } from "../scanner.js"
import { createFinding } from "../finding.js"

// check whether the projec hads a package.json file

export async function checkPackageJson(projectPath){
    const packagePath = `${projectPath}/package.json`

    if (await pathExists(packagePath)){
        return createFinding(
            "package-json",
            "package.json",
            "pass",
            "package.json exists"
        )
    }
    return createFinding(
        "package-json",
        "package.json",
        "fail",
        'package.json is missing'
    )
}