import prompts from 'prompts';
import { addRepos, getUsers } from '../../utils/storage';
import { logError, logSuccess } from '../../utils/logger';
import { userNameListSchema } from '../../utils/validations';
import { fetchRepos } from '../../utils/fetch';

async function syncUsers(users: Array<string>) {
    let totalRateLimit: number | undefined;
    let remainingRateLimit: number | undefined;

    for (const user of users) {
        console.log();
        try {
            console.log(`Fetching data for ${user} . . .`);
            const response = await fetchRepos(user);
            const repos = response.data;
            if (response.rateLimits) {
                totalRateLimit = response.rateLimits.total;
                remainingRateLimit = response.rateLimits.remaining;
            }

            if (!repos.length) {
                logError('No repos found for this username');
                continue;
            } else {
                logSuccess(`Repos fetch successfully for ${user}`);
            }
            addRepos(user, repos);
            logSuccess(`Repos of ${user} added to database successfully.`);
        } catch (err) {
            if (err instanceof Error) logError(err.message);
            else logError(String(err));
        }
    }

    console.log();
    logSuccess('Operation Completed.');

    if (totalRateLimit && remainingRateLimit) {
        console.log(`API Rate limit : ${remainingRateLimit}/${totalRateLimit}`);
        if (totalRateLimit < 100) {
            console.log(
                'Please consider adding GitHub PAT to increase limits.'
            );
        }
    }
}

export async function syncAction(syncAll: boolean = false) {
    const users = getUsers();

    if (syncAll) {
        await syncUsers(users);
        return;
    }

    if (!users.length) {
        logError('There are no repos to sync.');
        return;
    }

    const syncUsersResponse = await prompts({
        type: 'autocompleteMultiselect',
        name: 'users',
        message: 'Select the users whose repositories you want to sync:',
        choices: users.map((username) => ({
            title: username,
            value: username,
        })),
        instructions: false,
        hint: '- Space to select. Return to submit',
    });
    console.log();

    if (!syncUsersResponse.users) {
        logError('Aborted.');
        return;
    }

    const syncUsersResponseParsed = userNameListSchema.safeParse(
        syncUsersResponse.users
    );

    if (!syncUsersResponseParsed.success) {
        logError('Invalid selections.');
        return;
    }

    const usersToSync = syncUsersResponseParsed.data;

    if (!usersToSync.length) {
        logError('Please select at least 1 user.');
        return;
    }

    syncUsers(usersToSync);
}
