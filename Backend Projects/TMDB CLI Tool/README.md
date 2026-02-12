# TMDB CLI Tool

Project Challenge: [roadmap.sh - TMDB CLI Tool](https://roadmap.sh/projects/tmdb-cli)

A command-line tool that fetches and displays movie information from The Movie Database (TMDB) API, categorized by playing status, popularity, and ratings.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/TMDB CLI Tool"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Environment Setup:** Create a `.env` file in the root directory and add your TMDB API Read Access Token:

```
API_READ_ACCESS_TOKEN=your_token_here
```

5. **Link the command globally:**

```bash
npm link --force
```

## Usage

Use the `tmdb-app` command with the `--type` flag to fetch different categories of movies.

**Basic Commands**

| Action           | Command                    |
| ---------------- | -------------------------- |
| View Now Playing | `tmdb-app --type playing`  |
| View Popular     | `tmdb-app --type popular`  |
| View Top Rated   | `tmdb-app --type top`      |
| View Upcoming    | `tmdb-app --type upcoming` |
