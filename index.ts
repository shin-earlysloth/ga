import * as fs from "fs";
import * as path from "path";

const scriptExtList = [".ts", ".js", ".mjs"];
const featuresDir = path.join(__dirname, "schema");

async function loadFeatures() {
  const items = fs.readdirSync(featuresDir);
  const featureList = [];

  for (const item of items) {
    const itemPath = path.join(featuresDir, item);

    if (fs.statSync(itemPath).isDirectory()) {
      const indexFile = path.join(itemPath, "index.ts");
      if (fs.existsSync(indexFile)) {
        featureList.push(indexFile);
      }
    } else if (scriptExtList.includes(path.extname(item))) {
      featureList.push(itemPath);
    }
  }

  const loadedFeatures = await Promise.all(
    featureList.map(async (filePath, index) => {
      const relativePath = filePath.replace(__dirname + path.sep, "./");
      const module = await import(relativePath);

      return {
        defaultFunc: module.default,
        namedExports: module,
      };
    })
  );

  console.log("Loaded features:", loadedFeatures);
}

loadFeatures();
