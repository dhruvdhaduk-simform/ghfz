#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { registerFzf } from './actions/fzf';
import { registerAdd } from './actions/add';

const y = yargs(hideBin(process.argv))
    .scriptName('ghfz')
    .usage('$0 <cmd> [args]')
    .version('v0.0.5');

registerFzf(y);
registerAdd(y);

y.parse();
