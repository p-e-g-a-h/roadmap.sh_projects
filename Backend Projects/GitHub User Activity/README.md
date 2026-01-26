# GitHub User Activity CLI

Project Challenge: [roadmap.sh - GitHub User Activity](https://roadmap.sh/projects/github-user-activity)

A lightweight CLI tool that fetches, filters, and summarizes real-time GitHub activity.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/GitHub User Activity"
```

3. **Link the command globally:**

```bash
# This allows you to run 'github-activity' from any directory
npm link --force
```

## Usage

Run the command followed by any valid GitHub username.

```bash
github-activity <username>
```

**Example Output**

When running `github-activity kamranahmedse`, the tool processes the raw API data and displays:

```Plaintext
output:
- starred 5 times at liujuntao123/smart-excalidraw-next
- commented on 1 issues at kamranahmedse/driver.js
- pushed 22 commits to kamranahmedse/timelang
- created 1 new branch in kamranahmedse/claude-queue
```
