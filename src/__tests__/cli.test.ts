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

  it("emits the chart to a custom destination path", async () => {
    const outDir = "test";
    const fullPath = path.join(outDir, filename);

    await cli.execute(["--outDir", "test"]);

    expect(existsSync(fullPath)).toBe(true);

    cleanup(fullPath);
    rmdirSync(outDir);
  });

  it.each(["exact", "compact"])("supports %s format option", async (format) => {
    await cli.execute(["--format", format]);

    expect(existsSync(filename)).toBe(true);
    cleanup(filename);
  });
});