# Expense Tracker

Project Challenge: [roadmap.sh - Expense Tracker](https://roadmap.sh/projects/expense-tracker)

A simple, local Command Line Interface (CLI) for tracking your expenses. It allows you to log spending, update records, and view financial summaries for specific months, all stored in a local JSON file.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/Expense Tracker"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Link the command globally:**

```bash
# This allows you to run 'expense-tracker' from any directory
npm link --force
```

## Usage

Use the expense-tracker command followed by the desired action and flags.

**Managing Expenses**

| Action | Command                                                 |
| ------ | ------------------------------------------------------- |
| Add    | `expense-tracker add --description "Lunch" --amount 20` |
| Update | `expense-tracker update --id <id> --amount 25`          |
| Delete | `expense-tracker delete --id <id>`                      |
| List   | `expense-tracker list`                                  |

**Financial Summaries**

| Action          | Command                                            |
| --------------- | -------------------------------------------------- |
| Total Summary   | `expense-tracker summary`                          |
| Monthly Summary | `expense-tracker summary --month 8 (e.g., August)` |
