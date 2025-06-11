#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { registerFzf } from './actions/fzf';
import { registerAdd } from './actions/add';
import { registerRemove } from './actions/remove';

const y = yargs(hideBin(process.argv))
    .scriptName('ghfz')
    .usage('$0 <cmd> [args]')
    .version('v0.0.6');

registerFzf(y);
registerAdd(y);
registerRemove(y);

y.parse();
