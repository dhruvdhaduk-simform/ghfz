import type { Argv } from 'yargs';
import { syncAction } from './sync';

export function registerSync(yargs: Argv) {
    yargs.command(
        'sync',
        'Sync the local database with GitHub API.',
        (y) =>
            y.option('all', {
                type: 'boolean',
                alias: 'a',
                describe: 'Sync all users.',
                default: false,
            }),
        (argv) => {
            syncAction(argv.all);
        }
    );
}
