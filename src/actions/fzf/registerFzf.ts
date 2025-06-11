import type { Argv } from 'yargs';

import { startFuzzyFind } from './fzf';
import { logError } from '../../utils/logger';

export function registerFzf(yargs: Argv) {
    yargs.command(
        '*',
        'Fuzzy find the GitHub repos.',
        () => {},
        (argv) => {
            if (argv._.length) {
                logError('Invalid command. Use --help to show options.');
            } else {
                startFuzzyFind();
            }
        }
    );
}
