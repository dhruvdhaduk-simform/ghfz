import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';
import { repoListSchema, userNameListSchema } from './validations';
import { Repo } from '../types/repo';

const paths = envPaths('ghfz');
const DATA_PATH = paths.data;

if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
    fs.copyFileSync(
        path.join(__dirname, '..', '..', 'MockData', 'users.json'),
        path.join(DATA_PATH, 'users.json')
    );
    fs.copyFileSync(
        path.join(__dirname, '..', '..', 'MockData', 'repos.json'),
        path.join(DATA_PATH, 'repos.json')
    );
}

const USERS_PATH = path.join(DATA_PATH, 'users.json');
const REPOS_PATH = path.join(DATA_PATH, 'repos.json');

export function getUsers(): Array<string> {
    let data: unknown;

    try {
        if (fs.existsSync(USERS_PATH)) {
            data = JSON.parse(fs.readFileSync(USERS_PATH).toString());
        }
    } catch (err) {}

    const parsed = userNameListSchema.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    }

    return [];
}

export function getRepos(): Array<Repo> {
    let data: unknown;

    try {
        if (fs.existsSync(REPOS_PATH)) {
            data = JSON.parse(fs.readFileSync(REPOS_PATH).toString());
        }
    } catch (err) {}

    const parsed = repoListSchema.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    }

    return [];
}

export function addRepos(username: string, repoNames: Array<string>) {
    const users = getUsers();

    if (!users.includes(username)) {
        users.push(username);
    }

    let repos = getRepos();

    repos = repos.filter((repo) => repo.username !== username);

    repoNames.forEach((reponame) => {
        repos.push({ username, reponame });
    });

    fs.writeFileSync(USERS_PATH, JSON.stringify(users));
    fs.writeFileSync(REPOS_PATH, JSON.stringify(repos));
}

export function removeRepos(users: Array<string>) {
    const usersStored = getUsers();

    const usersFiltered = usersStored.filter(
        (username) => !users.includes(username)
    );

    const repos = getRepos();

    const reposFiltered = repos.filter((repo) =>
        usersFiltered.includes(repo.username)
    );

    fs.writeFileSync(USERS_PATH, JSON.stringify(usersFiltered));
    fs.writeFileSync(REPOS_PATH, JSON.stringify(reposFiltered));
}
