import type { Argv } from 'yargs';
import { logError } from '../../utils/logger';

export function registerAdd(yargs: Argv) {
    yargs.command(
        'add [username]',
        'Add repos from username to fuzzy find later.',
        (y) =>
            y.option('username', {
                type: 'string',
                alias: 'u',
                demandOption: true,
                describe:
                    'The username of the user to whom repositories should be added.',
            }),
        (argv) => {
            const username = argv.username;
            if (!username) {
                logError('username cannot be empty');
                return;
            }
            console.log(username);
        }
    );
}
