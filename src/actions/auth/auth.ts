import prompts from 'prompts';
import { logError, logSuccess } from '../../utils/logger';
import { getGitHubToken, removeGitHubToken, setGitHubToken } from '../../utils/storage';

export async function authAction() {
    const actionSelectResponse = await prompts({
        type: 'select',
        name: 'action',
        message: 'What do you want to do ?',
        choices: [
            { title: 'Show GitHub PAT', value: 'show' },
            { title: 'Add/Change GitHub PAT', value: 'add' },
            { title: 'Remove GitHub PAT', value: 'remove' },
        ],
    });
    console.log();

    if (actionSelectResponse.action === 'show') {
        authActionShowPAT();
    } else if (actionSelectResponse.action === 'add') {
        authActionAddPAT();
    } else if (actionSelectResponse.action === 'remove') {
        authActionRemovePAT();
    } else {
        if (!actionSelectResponse.action) {
            logError('Aborted.');
        } else {
            logError('Invalid option selected.');
        }
        return;
    }
}

export function authActionShowPAT() {
    const token = getGitHubToken();

    if (!token) {
        logError("You don't have any GitHub Personal Access Token.");
        return;
    }

    logSuccess('Your GitHub Personal Access Token is :'); 
    console.log(token);
}

export async function authActionAddPAT() {
    const tokenResponse = await prompts({
        type: 'text',
        name: 'token',
        message: 'Enter your GitHub Personal Access Token: ',
        validate: (value: string) => {
            if (!value.trim().length) return 'Token cannot be empty.';

            return true;
        },
    });
    console.log();

    if (!tokenResponse.token) {
        logError('Aborted.');
        return;
    }

    if (typeof tokenResponse.token !== 'string') {
        logError('Please provide a token.');
        return;
    }

    const token: string = tokenResponse.token;

    setGitHubToken(token);
    logSuccess('Token saved successfully.');
}

export function authActionRemovePAT() {
    const token = getGitHubToken();

    if (!token) {
        logError("You don't have any GitHub Personal Access Token.");
        return;
    }

    removeGitHubToken();

    logSuccess('GitHub Personal Access Token Removed successfully.');
    console.log(token);
}
