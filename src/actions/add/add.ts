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
    let totalRateLimit: number | undefined;
    let remainingRateLimit: number | undefined;
    try {
        console.log('Fetching the repos from GitHub API . . . ');
        const response = await fetchRepos(username);
        repoNames = response.data;
        if (response.rateLimits) {
            totalRateLimit = response.rateLimits.total;
            remainingRateLimit = response.rateLimits.remaining;
        }
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
    if (totalRateLimit && remainingRateLimit) {
        console.log(`API Rate limit : ${remainingRateLimit}/${totalRateLimit}`);
        if (totalRateLimit < 100) {
            console.log(
                'Please consider adding GitHub PAT to increase limits.'
            );
        }
    }

    try {
        addRepos(username, repoNames);
    } catch (err) {
        if (err instanceof Error) logError(err.message);
        else logError(String(err));
        return;
    }

    logSuccess('Repos added to database successfully.');
}
