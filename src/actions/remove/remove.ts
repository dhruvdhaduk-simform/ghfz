import prompts from 'prompts';
import { getUsers, removeRepos } from '../../utils/storage';
import { logError, logSuccess } from '../../utils/logger';
import { userNameListSchema } from '../../utils/validations';

export async function removeAction() {
    const users = getUsers();

    if (!users.length) {
        logError('There are no repos to remove.');
        return;
    }

    const removeUsersResponse = await prompts({
        type: 'autocompleteMultiselect',
        name: 'users',
        message: 'Select the users whose repositories you want to remove:',
        choices: users.map((username) => ({
            title: username,
            value: username,
        })),
        instructions: false,
        hint: '- Space to select. Return to submit',
    });
    console.log();

    if (!removeUsersResponse.users) {
        logError('Aborted.');
        return;
    }

    const removeUsersResponseParsed = userNameListSchema.safeParse(
        removeUsersResponse.users
    );

    if (!removeUsersResponseParsed.success) {
        logError('Invalid selections.');
        return;
    }

    const usersToRemove = removeUsersResponseParsed.data;

    if (!usersToRemove.length) {
        logError('Please select at least 1 user.');
        return;
    }

    try {
        removeRepos(usersToRemove);
    } catch (err) {
        if (err instanceof Error) logError(err.message);
        else logError(String(err));
        return;
    }

    logSuccess('Repos of selected users removed successfully from database.');
}
