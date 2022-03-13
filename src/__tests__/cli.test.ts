import { existsSync, unlinkSync, rmdirSync } from "fs";
import path from "path";
import cmd from "./cmd";

const cliPath = path.join(__dirname, "../../dist/cli.js");
const cli = cmd.create(cliPath);

function cleanup(fullPath: string) {
  unlinkSync(fullPath);
}

describe("CLI", () => {
  const filename = "keyboard.svg";

  it("creates a default piano chart when no args are given", async () => {
    await cli.execute();

    expect(existsSync(filename)).toBe(true);
    cleanup(filename);
  });

  it.each(["test", "test/", "nested/test", "nested/test/"])(
    "emits the chart to a custom destination path: %s",
    async (outDir) => {
      const fullPath = path.join(outDir, filename);

      await cli.execute(["--outDir", outDir]);

      expect(existsSync(fullPath)).toBe(true);

      cleanup(fullPath);
      rmdirSync(outDir);
    }
  );

  it.each(["exact", "compact"])("supports %s format option", async (format) => {
    await cli.execute(["--format", format]);

    expect(existsSync(filename)).toBe(true);
    cleanup(filename);
  });

  it("higlights specific white keys (by name, left to right)", async () => {
    await cli.execute(["--highlightKeys", "C E G"]);

    expect(existsSync(filename)).toBe(true);
    cleanup(filename);
  });

  it("accepts a custom file name", async () => {
    await cli.execute(["--fileName", "customFileName.svg"]);

    expect(existsSync("customFileName.svg")).toBe(true);
    cleanup("customFileName.svg");
  });
});
