#!/usr/bin/env zx
import fs from "fs/promises";

const getSchemasName = (str) => {
    const pascalCaseName = str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

    return `${pascalCaseName}Schemas`
}

const schemaFolders = (await fs.readdir("./schema", {withFileTypes: true})).filter((v)=> v.isDirectory()).map((v)=> v.name)
const indexTsCode = schemaFolders.map((schema)=>`export * as ${getSchemasName(schema)} from "./schema/${schema}/index"`).join("\n")

await fs.writeFile("./index.ts", indexTsCode)

await $`npm pack`

await fs.unlink(`./index.ts`)