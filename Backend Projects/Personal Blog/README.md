# Personal Blog

Project Challenge: [roadmap.sh - Personal Blog](https://roadmap.sh/projects/personal-blog)

A lightweight, file-based CMS and blog engine built with Node.js. This project allows you to manage articles via a web interface, storing data locally in JSON format—no complex database setup required.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/Personal Blog"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Configure Environment Variables:** Create a .env file in the root directory:

```env
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

5. **Start the server:**

```bash
npm start
```

## Usage

### Public Routes

These routes are accessible by any visitor to the site.

| Method | Route          | Description                                          |
| ------ | -------------- | ---------------------------------------------------- |
| `GET`  | `/`            | Home: Displays a list of all blog articles.          |
| `GET`  | `/article/:id` | View: Displays the full content of a single article. |

### Admin Routes (Protected)

These routes require Basic Authentication. The browser will prompt for a username and password defined in your .env file.

| Method | Route         | Description                                                           |
| ------ | ------------- | --------------------------------------------------------------------- |
| `GET`  | `/admin`      | Dashboard: Management area to see all posts with Edit/Delete options. |
| `GET`  | `/new`        | Editor: Form to write a new blog post.                                |
| `POST` | `/new`        | Create: Processes the form and saves a new .json file.                |
| `GET`  | `/edit/:id`   | Editor: Form to modify an existing post.                              |
| `POST` | `/edit/:id`   | Update: Overwrites the existing .json file with new content.          |
| `POST` | `/delete/:id` | Delete: Permanently removes the article file from the server.         |
