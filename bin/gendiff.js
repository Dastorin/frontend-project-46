#!/usr/bin/env node
/* eslint-disable no-undef */
import { program } from 'commander'
import genDiff from '../src/index.js'
// import { stringify } from '../src/formatters/stylish.js'
import { stylish } from '../src/formatters/stylish.js'

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')
    .helpOption('-h, --help', 'display help for command')
    .action((filepath1, filepath2) => {
        console.log(stylish(genDiff(filepath1, filepath2)))
    })
program.parse(process.argv)
// console.log(stylish(genDiff(filepath1, filepath2)))
// console.log(JSON.stringify(genDiff(filepath1, filepath2), null, 2))
// console.log(...genDiff(filepath1, filepath2))
