#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { registerFzf } from './actions/fzf';
import { registerAdd } from './actions/add';
import { registerRemove } from './actions/remove';
import { registerSync } from './actions/sync';
import { registerAuth } from './actions/auth';

const y = yargs(hideBin(process.argv))
    .scriptName('ghfz')
    .usage('$0 <cmd> [args]')
    .version('v0.0.8');

registerFzf(y);
registerAdd(y);
registerRemove(y);
registerSync(y);
registerAuth(y);

y.parse();
