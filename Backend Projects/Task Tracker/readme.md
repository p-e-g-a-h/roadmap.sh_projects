# Task Tracker CLI

Project Challenge: [roadmap.sh - Task Tracker](https://roadmap.sh/projects/task-tracker)

A lightweight Command Line Interface (CLI) application to manage your daily tasks. This project tracks task status, creation dates, and updates, saving everything locally in a JSON file.

## Features

- **Add** new tasks with unique IDs (UUID).
- **Update** task descriptions.
- **Delete** tasks.
- **Status Management**: Mark tasks as `todo`, `in-progress`, or `done`.
- **Filtered Lists**: View all tasks or filter by status.

## Installation

1. **Clone the repository:**

```bash
gh repo clone p-e-g-a-h/roadmap.sh_projects
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/Task Tracker"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Link the command globally:**

```bash
# This allows you to run 'task-cli' from any directory
npm link --force
```

## Usage

You can use the task-cli command followed by an action and any necessary arguments.

**Managing Tasks**

| Action         | Command                                  |
| -------------- | ---------------------------------------- |
| Add a new task | `task-cli add "Buy groceries"`           |
| Update a task  | `task-cli update <id> "New description"` |
| Delete a task  | `task-cli delete <id>`                   |

**Managing Status**

| Action           | Command                          |
| ---------------- | -------------------------------- |
| Mark In-Progress | `task-cli mark-in-progress <id>` |
| Mark Done        | `task-cli mark-done <id>`        |

**Viewing Tasks**

| Action                | Command                     |
| --------------------- | --------------------------- |
| List all tasks        | `task-cli list`             |
| Filter by Done        | `task-cli list done`        |
| Filter by Todo        | `task-cli list todo`        |
| Filter by In-Progress | `task-cli list in-progress` |
