#!/usr/bin/env node

import { Command } from "commander";
import template from "./template";
import * as fs from "fs";
import path from "path";

const program = new Command();

program.option("--outDir <dir>");
program.parse();

const options = program.opts();
const outDir = options.outDir || "";
const outPath = path.join(outDir);

if (outDir && !fs.existsSync(outPath)) {
  fs.mkdirSync(outPath);
}

const fullPath = path.join(outPath, "keyboard.svg");

fs.writeFile(fullPath, template, "utf8", (err) => {
  if (err) {
    throw err;
  }
});
