#!/usr/bin/env node

import { Command } from "commander";
import template, { render } from "./template";
import * as fs from "fs";
import path from "path";

const program = new Command();

program.option("--outDir <dir>");
program.option("--format <format>");

program.parse();

const options = program.opts();
const outDir = options.outDir || "";
const outPath = path.join(outDir);

if (outDir && !fs.existsSync(outPath)) {
  fs.mkdirSync(outPath);
}

const fullPath = path.join(outPath, "keyboard.svg");

let renderResult = template;

if (options.format === "exact") {
  renderResult = render({
    format: options.format,
  });
}

fs.writeFile(fullPath, renderResult, "utf8", (err) => {
  if (err) {
    throw err;
  }
});
