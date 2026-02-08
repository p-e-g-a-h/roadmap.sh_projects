# Todo List API

Project Challenge: [roadmap.sh - Todo List API](https://roadmap.sh/projects/todo-list-api)

A robust RESTful API for managing personal tasks. Built with Node.js, Express, and MongoDB, it features secure user authentication (JWT), password hashing (Bcrypt), and strict database schema validation to ensure data integrity.

## Live Demo

**https://todo-list-api-l23y.onrender.com/**

## Features

- **User Authentication:** Secure Sign-up and Login using JWT.
- **Database Validation:** MongoDB $jsonSchema validation to prevent malformed data.
- **Persistent Connection:** High-performance database connection pooling.
- **Global Error Handling:** Clean, JSON-based error responses for all API failures.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/Todo List API"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Configure Environment Variables:** Create a .env file in the root directory:

```env
PORT=3000
DB_URI=your_mongodb_connection_string
JWT_KEY=your_secret
```

5. **Start the server:**

```bash
npm start
```

## Usage

### Auth Routes (Public)

| Method | Route            | Description                                       | Status Codes       |
| ------ | ---------------- | ------------------------------------------------- | ------------------ |
| `POST` | `/auth/register` | Create a new user account and receive a JWT token | 201, 400, 500      |
| `POST` | `/auth/login`    | Login and receive a JWT token                     | 200, 401, 400, 500 |

#### Sample User Object

```JSON
{
  "name": "your name",
  "email": "email@gmil.com",
  "password": "your password"
}
```

### Todo Routes (Protected - Requires `authorization: Bearer <token>`)

| Method   | Route          | Description                          | Status Codes       |
| -------- | -------------- | ------------------------------------ | ------------------ |
| `GET`    | `/todos`       | Get all todos for the logged-in user | 201, 500           |
| `GET`    | `/todos/:id`   | Get a specific todo by ID            | 200, 404, 500      |
| `POST`   | `/todos/login` | Create a new todo                    | 201, 400, 500      |
| `PUT`    | `/todos/:id`   | Update a todo                        | 200, 404, 400, 500 |
| `DELETE` | `/todos/:id`   | Remove a todo                        | 204, 404, 400, 500 |

#### Sample Todo Object

```JSON
{
  "title": "your title",
  "description": "your description",
  "completed": false
}
```
