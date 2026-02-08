# Blogging Platform API

Project Challenge: [roadmap.sh - Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api)

A straightforward REST API for managing blog posts. Built with Node.js and MongoDB, it handles full CRUD operations and lets you filter posts by category. Uses UUIDs to keep every post unique.

## Live Demo

https://blogging-platform-api-j4j2.onrender.com/

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/Blogging Platform API"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Configure Environment Variables:** Create a .env file in the root directory:

```env
PORT=3000
DB_URI=your_mongodb_connection_string
```

5. **Start the server:**

```bash
npm start
```

## Usage

### Public Route

| Method   | Route        | Description                                       | Status Codes  |
| -------- | ------------ | ------------------------------------------------- | ------------- |
| `POST`   | `/posts`     | Create a new blog post                            | 201, 400      |
| `GET`    | `/posts`     | Get all posts (Supports ?category=name filtering) | 200           |
| `GET`    | `/posts/:id` | Get a single post by ID                           | 200, 404      |
| `PUT`    | `/posts/:id` | Update an existing post                           | 200, 400, 404 |
| `DELETE` | `/posts/:id` | Delete a post                                     | 204, 404      |

### Sample Request Body

```JSON
{
  "title": "My Post",
  "content": "Hello World",
  "category": "Tech",
  "tags": ["node", "api"]
}
```
