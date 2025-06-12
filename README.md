# ghfz

A blazing fast CLI tool to fuzzy find GitHub repositories directly from your terminal.

![Npm Version](https://img.shields.io/npm/v/ghfz.svg)
![NPM Last Update](https://img.shields.io/npm/last-update/ghfz)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/ghfz)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dhruvdhaduk-simform/ghfz/publish.yml)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Fuzzy Search](#fuzzy-search)
  - [Commands](#commands)
- [Configuration](#configuration)
- [Data Storage](#data-storage)
- [Development](#development)
- [Packaging](#packaging)
- [Changelog](#changelog)
- [Acknowledgements](#acknowledgements)
- [Support](#support)

## Features

- 🔍 Fuzzy find GitHub users, repositories, and pull requests.
- ➕ Add a user's repositories to your local database.
- 🗑️ Remove user repositories from your database.
- 🔄 Sync your local database with GitHub API.
- 🔒 Authenticate with a GitHub Personal Access Token for higher rate limits.
- 🌐 Open selected repositories directly in your default browser.

## Prerequisites

ghfz relies on [fzf](https://github.com/junegunn/fzf) for fuzzy searching. Please ensure `fzf` is installed before using `ghfz`:

- **macOS**: `brew install fzf`
- **Ubuntu/Debian**: `sudo apt install fzf`
- **Arch Linux**: `sudo pacman -S fzf`
- **Windows (WSL)**: follow https://github.com/junegunn/fzf#installation

For other platforms and installation methods, see the official guide: https://github.com/junegunn/fzf#installation

## Installation

Install via npm:

```bash
npm install -g ghfz@latest
```

Or use the latest unpublished version:

```bash
bash -c "$(curl -fsSL https://ghfz.netlify.app/run.sh)" -- https://ghfz.netlify.app/ghfz.tgz
```

## Usage

Once installed, run:

```bash
ghfz [command]
```

### Fuzzy Search

Running without arguments launches the interactive fuzzy search:

```bash
ghfz
```

You can search across:

- GitHub user homepages
- User repositories pages
- Individual repository pages
- Pull request pages

Type to filter and press Enter to open your selection in the browser.

### Commands

- **add**

  Add all public repositories of a GitHub user to the local database:

```bash
ghfz add
```

  Prompts for a username and fetches repos via GitHub API.

- **remove**

  Remove one or more users and their repos from the database:

```bash
ghfz remove
```

  Prompts to select users in a multi-select interface.

- **sync**

  Sync local database with GitHub for updated repositories:

```bash
ghfz sync
```

  By default, syncs only selected users' data. To sync all:

```bash
ghfz sync --all
```

- **auth**

  Store your GitHub Personal Access Token for increased rate limits:

```bash
ghfz auth
```

  Prompts to enter your PAT, securely saved in your config directory.

Use `ghfz --help` to view all available commands and options.

## Configuration

Your GitHub PAT is stored at:

```bash
# Linux
~/.config/ghfz-nodejs/github_pat.txt
```

## Data Storage

User and repository data are stored under your system data directory, for example:

```bash
# Linux
~/.local/share/ghfz-nodejs/users.json
~/.local/share/ghfz-nodejs/repos.json
```

Mock data is seeded on first run from the `MockData` folder.

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/dhruvdhaduk-simform/ghfz.git
cd ghfz
npm install
```

Build the project:

```bash
npm run build
```

OR Run in development/watch mode:

```bash
npm run dev
```

Then, to start the CLI :

```bash
npm start
```

Format code with Prettier:

```bash
npm run format
```

## Packaging

- `npm run pack` — Clean, build, and generate a packaged `.tgz` and `run.sh` in the `dist/` folder.

## Changelog

See the [Releases](https://github.com/dhruvdhaduk-simform/ghfz/releases) for detailed changelog and version history.

## Acknowledgements

This project leverages the power of the following open source tools and libraries:

- [TypeScript](https://www.typescriptlang.org/) — for static typing and modern JavaScript features
- [Node.js](https://nodejs.org/) — as the runtime environment
- [fzf](https://github.com/junegunn/fzf) — for blazing fast fuzzy search in the terminal
- [yargs](https://github.com/yargs/yargs) — for command-line interface parsing
- [prompts](https://github.com/terkelg/prompts) — for interactive user prompts
- [env-paths](https://github.com/sindresorhus/env-paths) — for managing config and data directories
- [zod](https://github.com/colinhacks/zod) — for runtime schema validation
- [open](https://github.com/sindresorhus/open) — for cross-platform URL opening

## Support

For questions or feedback, please open an issue or contact `dhruv.dhaduk@simformsolutions.com`.
