#!/usr/bin/env node
import yargs from 'yargs';
import { handleErrors } from './errors';

yargs
.usage('Usage: c2li <command> [options]')
.commandDir('cmds', {
  extensions:['ts', 'js'],
})
.fail(handleErrors)
.strict()
.demandCommand(1, 'You need to run a command')
.help()
.argv;
