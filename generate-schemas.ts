import fs from "fs/promises";
import path from "path";
import { zodToJsonSchema } from "zod-to-json-schema";

const jsonSchemaFolderPath = path.join(__dirname, "jsonSchema");

(async () => {
  // 기존 파일 삭제
  const files = await fs.readdir(jsonSchemaFolderPath);
  for (const file of files) {
    const filePath = path.join(jsonSchemaFolderPath, file);
    await fs.unlink(filePath);
  }

  const schemaFolders = await fs.readdir("./schema");

  // json 스키마 파일 생성
  await Promise.all(
    schemaFolders.map(async (schemaFolder) => {
      const schemaFolderPath = path.join(__dirname, "schema", schemaFolder);
      const schemaFilePath = path.join(schemaFolderPath, "index.ts");

      const validator = (await import(schemaFilePath)).default;

      const jsonSchemaFilePath = path.join(
        jsonSchemaFolderPath,
        `${schemaFolder}.json`
      );

      await fs.writeFile(
        jsonSchemaFilePath,
        JSON.stringify(zodToJsonSchema(validator), null, 4)
      );
    })
  );
})();
