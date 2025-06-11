import type { Argv } from 'yargs';
import { removeAction } from './remove';

export function registerRemove(yargs: Argv) {
    yargs.command(
        'remove',
        'Remove repos of users from fuzzy finder database.',
        () => {},
        () => {
            removeAction();
        }
    );
}
