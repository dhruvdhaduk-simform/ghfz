import type { Argv } from 'yargs';

import { startFuzzyFind } from './fzf';

export function registerFzf(yargs: Argv) {
    yargs.command(
        '*',
        'Fuzzy find the GitHub repos.',
        () => {},
        (argv) => {
            if (argv._.length) {
                console.log('Invalid command. Use --help to show options.');
            } else {
                startFuzzyFind();
            }
        }
    );
}
