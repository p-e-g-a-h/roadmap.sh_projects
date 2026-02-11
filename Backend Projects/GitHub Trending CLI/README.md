# GitHub Trending CLI

Project Challenge: [roadmap.sh - GitHub Trending CLI](https://roadmap.sh/projects/github-trending-cli)

A command-line tool that fetches and displays trending GitHub repositories based on their creation date and star count.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/GitHub Trending CLI"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Link the command globally:**

```bash
npm link --force
```

## Usage

Use the `trending-repos` command (or your chosen bin name) with optional flags to filter results.

**Basic Commands**

| Action                     | Command                           |
| -------------------------- | --------------------------------- |
| Default (Top 10 this week) | `trending-repos`                  |
| Custom Limit               | `trending-repos --limit 20`       |
| Custom Duration            | `trending-repos --duration month` |

**Filtering Options**

- `--duration`: Set the time frame (`day`, `week`, `month`, `year`).
- `--limit`: Set the number of results to display (e.g., `5`, `20`, `50`).

**Example**

```bash
# View the top 5 trending repositories from the past month
trending-repos --duration month --limit 5
```
