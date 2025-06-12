import { getGitHubToken } from './storage';
import { repoNameListSchema } from './validations';

const URL = 'https://api.github.com';

interface ReposResponse {
    data: Array<string>;
    rateLimits?: {
        total: number;
        remaining: number;
    };
}

export async function fetchRepos(userName: string): Promise<ReposResponse> {
    const TOKEN = getGitHubToken();

    const headers = {
        Accept: 'application/vnd.github.v3+json',
    };

    const repos: Array<unknown> = [];
    let page = 1;
    let hasNextPage = true;

    let totalRateLimitStr: string | null = null;
    let remainingRateLimitStr: string | null = null;

    while (hasNextPage) {
        const repoResponse = await fetch(
            `${URL}/users/${userName}/repos?per_page=100&page=${page}`,
            {
                headers: TOKEN
                    ? {
                          ...headers,
                          Authorization: `token ${TOKEN}`,
                      }
                    : headers,
            }
        );

        const data = await repoResponse.json();

        if (!repoResponse.ok) {
            if (data.message) {
                throw new Error(`${repoResponse.status} - ${data.message}`);
            } else {
                throw new Error(
                    `${repoResponse.status} - ${repoResponse.statusText}`
                );
            }
        }

        for (const item of data) {
            repos.push(item.name);
        }

        const linkHeader = repoResponse.headers.get('Link');

        totalRateLimitStr = repoResponse.headers.get('x-ratelimit-limit');
        remainingRateLimitStr = repoResponse.headers.get(
            'x-ratelimit-remaining'
        );

        if (linkHeader && linkHeader.includes('rel="next"')) {
            page++;
        } else {
            hasNextPage = false;
        }
    }

    const reposParsed = repoNameListSchema.safeParse(repos);

    if (!reposParsed.success)
        throw new Error('Invalid data received from GitHub API.');

    const totalRateLimit = Number(totalRateLimitStr);
    const remainingRateLimit = Number(remainingRateLimitStr);

    if (
        totalRateLimit >= 0 &&
        remainingRateLimit >= 0 &&
        Number.isInteger(totalRateLimit) &&
        Number.isInteger(remainingRateLimit)
    ) {
        return {
            data: reposParsed.data,
            rateLimits: {
                total: totalRateLimit,
                remaining: remainingRateLimit,
            },
        };
    }

    return {
        data: reposParsed.data,
    };
}
