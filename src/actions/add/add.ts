import prompts from 'prompts';
import { logError, logSuccess } from '../../utils/logger';
import { fetchRepos } from '../../utils/fetch';
import { addRepos } from '../../utils/storage';

export async function addAction() {
    const usernameResponse = await prompts({
        type: 'text',
        name: 'username',
        message:
            "Enter the GitHub username you'd like to add repositories for:",
        validate: (value: string) => {
            if (!value.trim().length) return 'Username cannot be empty.';

            return true;
        },
    });
    console.log();

    if (!usernameResponse.username) {
        logError('Aborted.');
        return;
    }

    if (typeof usernameResponse.username !== 'string') {
        logError('Please provide a username.');
        return;
    }

    const username: string = usernameResponse.username;

    let repoNames: Array<string>;
    try {
        console.log('Fetching the repos from GitHub API . . . ');
        repoNames = await fetchRepos(username);
    } catch (err: unknown) {
        if (err instanceof Error) logError(err.message);
        else logError(String(err));
        return;
    }

    if (!repoNames.length) {
        logError('No repos found for this username');
        return;
    }

    logSuccess('Repos fetch successfully.');

    try {
        addRepos(username, repoNames);
    } catch (err) {
        if (err instanceof Error) logError(err.message);
        else logError(String(err));
        return;
    }

    logSuccess('Repos added to database successfully.');
}
