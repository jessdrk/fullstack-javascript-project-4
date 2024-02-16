#!/usr/bin/env node

import { program } from "commander";
import pageLoader from "../src/pageLoader.js";

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .argument('<url>')
  .option('-o, --output <dir>', 'output dir', '/home/user/current-dir')
  .action(async (url) => {
    console.log(await pageLoader(url, program.opts().output));
  });

program.parse();