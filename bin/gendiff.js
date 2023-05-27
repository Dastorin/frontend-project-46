#!/usr/bin/env node
import { program } from 'commander'

program
    .usage('gendiff [options] <filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .help('-h, --help', 'display help for command')

program.parse()
