import type { Argv } from 'yargs';
import { addAction } from './add';

export function registerAdd(yargs: Argv) {
    yargs.command(
        'add',
        'Add repos from username to fuzzy find later.',
        () => {},
        () => {
            addAction();
        }
    );
}
