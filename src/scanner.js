import fs from "node:fs/promises"

// Check wheather a path exists
export async function pathExists(path) {
    try{
        await fs.access(path) //checks whether the specified path can be accessed
        return true
    } catch {
        return false
    }
    
}