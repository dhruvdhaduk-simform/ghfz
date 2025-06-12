import type { Argv } from 'yargs';
import { authAction } from './auth';

export function registerAuth(yargs: Argv) {
    yargs.command(
        'auth',
        'Add GitHub Personal Access Token for better rate limits.',
        () => {},
        () => {
            authAction();
        }
    );
}
