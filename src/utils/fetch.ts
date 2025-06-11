import { repoNameListSchema } from './validations';

const URL = 'https://api.github.com';

export async function fetchRepos(userName: string): Promise<Array<string>> {
    const headers = {
        Accept: 'application/vnd.github.v3+json',
    };

    const repos: Array<unknown> = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        const repoResponse = await fetch(
            `${URL}/users/${userName}/repos?per_page=100&page=${page}`,
            { headers }
        );

        if (!repoResponse.ok) {
            throw new Error(`Failed to fetch repos for ${userName}`);
        }

        const data = await repoResponse.json();

        for (const item of data) {
            repos.push(item.name);
        }

        const linkHeader = repoResponse.headers.get('Link');

        if (linkHeader && linkHeader.includes('rel="next"')) {
            page++;
        } else {
            hasNextPage = false;
        }
    }

    const reposParsed = repoNameListSchema.safeParse(repos);

    if (reposParsed.success) return reposParsed.data;

    throw new Error('Invalid data received from GitHub API.');
}
