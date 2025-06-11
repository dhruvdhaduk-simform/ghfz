#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { registerFzf } from './actions/fzf';

const y = yargs(hideBin(process.argv))
    .scriptName('ghfz')
    .usage('$0 <cmd> [args]');

registerFzf(y);

y.parse();
