import { existsSync, unlinkSync } from "fs";
import path from "path";
import cmd from "./cmd";

function cleanup() {
  const outputPath = path.join(__dirname, "../../keyboard.svg");
  unlinkSync(outputPath);
}

describe("CLI", () => {
  afterEach(cleanup);

  it("should create a default piano chart", async () => {
    const cliPath = path.join(__dirname, "../../dist/cli.js");
    const outputPath = path.join(__dirname, "../../keyboard.svg");
    const cli = cmd.create(cliPath);

    await cli.execute();

    expect(existsSync(outputPath)).toBe(true);
  });
});
