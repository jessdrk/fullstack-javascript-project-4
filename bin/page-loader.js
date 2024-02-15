#!/usr/bin/env node

import { program } from "commander";

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .argument('<url>')
  .option('-o, --output <dir>', 'output dir', '/home/user/current-dir');
  //.action((filepath1, filepath2) => {
  //  console.log(generateDifference(filepath1, filepath2, program.opts().format));
  //});

program.parse();