import { spawn } from 'child_process';
import open from 'open';

interface Repo {
    username: string;
    reponame: string;
}

function getFormattedRepo(repo: Repo) {
    return `${repo.username} → ${repo.reponame}`;
}

function getRepoURL(repo: Repo) {
    return `https://github.com/${repo.username}/${repo.reponame}`;
}

function fzfGitHub(options: Array<Repo>): Promise<string | null> {
    return new Promise((resolve) => {
        // Format: 'label<TAB>value'
        const formatted = options.map((item) => {
            return `${getFormattedRepo(item)}\t${getRepoURL(item)}`;
        });

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

// Example usage
export async function startFuzzyFind() {
    const repos: Array<Repo> = [
        {
            username: 'dhruvdhaduk-simform',
            reponame: 'ghfz',
        },
        {
            username: 'dhruvdhaduk-simform',
            reponame: 'spawn-react-app',
        },
        {
            username: 'dhruvdhaduk-simform',
            reponame: 'tic-tac-toe-term',
        },
        {
            username: 'dhruvdhaduk-simform',
            reponame: 'img-magnifier-extension',
        },
        {
            username: 'dhruvdhaduk-simform',
            reponame: 'live-stream-demo',
        },
        {
            username: 'dhruvdhaduk-simform',
            reponame: 'x-skeleton-ui',
        },
        {
            username: 'dhruvdhaduk-simform',
            reponame: 'fair-share',
        },
    ];

    const selected = await fzfGitHub(repos);
    if (selected) {
        open(selected);
    } else {
        console.log('No selection.');
    }
}
