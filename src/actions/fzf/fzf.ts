import { spawn } from 'child_process';
import open from 'open';
import type { Repo } from '../../types/repo';
import { getRepos, getUsers } from '../../utils/storage';

export async function fzfAction() {
    const users = getUsers();
    const repos = getRepos();

    const selected = await fzfGitHub(users, repos);
    if (selected) {
        open(selected);
    } else {
        console.log('No selection.');
    }
}

function fzfGitHub(
    users: Array<string>,
    repos: Array<Repo>
): Promise<string | null> {
    return new Promise((resolve) => {
        const formatted = [...formatUsers(users), '', ...formatRepos(repos)];

        const fzf = spawn('fzf', ['--with-nth=1', '--delimiter=\t'], {
            stdio: ['pipe', 'pipe', 'inherit'],
        });

        let result = '';

        fzf.stdout.on('data', (data: Buffer) => {
            result += data.toString();
        });

        fzf.on('close', (code: number) => {
            if (code === 0) {
                const selected = result.trim().split('\t')[1];
                resolve(selected);
            } else {
                resolve(null);
            }
        });

        formatted.forEach((line) => fzf.stdin.write(line + '\n'));
        fzf.stdin.end();
    });
}

function formatUsers(users: Array<string>): Array<string> {
    const usersHomePage: Array<string> = [];
    const usersRepoPage: Array<string> = [];

    users.forEach((user) => {
        usersHomePage.push(`${user}\thttps://github.com/${user}`);
        usersRepoPage.push(
            `${user} → repositories\thttps://github.com/${user}?tab=repositories`
        );
    });

    return [...usersHomePage, '', ...usersRepoPage];
}

function formatRepos(repos: Array<Repo>): Array<string> {
    const reposFormatted: Array<string> = [];
    const repoPullsFormatted: Array<string> = [];

    repos.forEach((repo) => {
        reposFormatted.push(
            `${repo.username} → ${repo.reponame}\thttps://github.com/${repo.username}/${repo.reponame}`
        );
        repoPullsFormatted.push(
            `${repo.username} → ${repo.reponame} → pulls\thttps://github.com/${repo.username}/${repo.reponame}/pulls`
        );
    });

    return [...reposFormatted, ...repoPullsFormatted];
}
