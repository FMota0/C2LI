#!/usr/bin/env node
import yargs from 'yargs';

yargs
.usage('Usage: c2li <command> [options]')
.commandDir('cmds', {
  extensions:['ts', 'js'],
})
.strict()
.demandCommand(1, 'You need to run a command')
.help()
.argv;
