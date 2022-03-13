#!/usr/bin/env node

import { Command } from "commander";
import template, { render } from "./template";
import * as fs from "fs";
import path from "path";

const program = new Command();

program.option("--outDir <dir>");
program.option("--format <format>");
program.option("--highlightKeys <keys>");
program.option("--fileName <fileName>");
program.option("--size <size>");

program.parse();

const options = program.opts();
const outDir = options.outDir || "";
const outPath = path.join(outDir);

if (outDir && !fs.existsSync(outPath)) {
  fs.mkdirSync(path.resolve(outPath), { recursive: true });
}

const fullPath = path.join(outPath, options.fileName || "keyboard.svg");

let renderResult = template;

if (options && Object.keys(options).length > 0) {
  renderResult = render({
    format: options.format,
    highlightKeys: options.highlightKeys?.split(" "),
    size: parseInt(options.size),
  });
}

fs.writeFile(fullPath, renderResult, "utf8", (err) => {
  if (err) {
    throw err;
  }
});
