import * as fs from "fs";
import path from "path";

const schemaFolders = fs.readdirSync("./schema");

schemaFolders.forEach((schemaFolder) => {
  describe(`${schemaFolder} 스키마 테스트`, () => {
    const schemaFolderPath = path.join(__dirname, "schema", schemaFolder);

    const examplesFolderPath = path.join(schemaFolderPath, "examples");
    const schemaFilePath = path.join(schemaFolderPath, "index.ts");

    it.each(fs.readdirSync(examplesFolderPath))(
      `${schemaFolder}/%s validation`,
      async (fileName) => {
        const validator = (await import(schemaFilePath)).default;

        const raw = fs.readFileSync(
          path.join(examplesFolderPath, fileName),
          "utf-8"
        );

        const json = JSON.parse(raw);
        const parseResult = validator.safeParse(json);

        if (parseResult.success === false) {
          console.error(parseResult.error);
        }
        expect(parseResult.success).toEqual(true);
      }
    );
  });
});
