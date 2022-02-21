import { Command } from "commander";
import template from "./svg-template";
import * as fs from "fs";

const program = new Command();

fs.writeFile("keyboard.svg", template, "utf8", () => {});
