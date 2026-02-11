# Expense Tracker API

Project Challenge: [roadmap.sh - Expense Tracker API](https://roadmap.sh/projects/expense-tracker-api)

A high-performance RESTful API for tracking personal expenses by category. Built with Node.js, Express, and MySQL, it features secure user authentication (JWT), UUID-based primary keys for enhanced security, and strict category validation using SQL ENUMs.

## Live Demo

https://expense-tracker-api-39cg.onrender.com/

## Features

- **Secure Authentication:** JWT-based auth with bcryptjs password hashing.
- **Relational Storage:** Optimized MySQL schema with BINARY(16) UUIDs for high-performance indexing.
- **Category Tracking:** Strict expense categorization (Groceries, Leisure, Electronics, etc.).
- **Time-Based Filtering:** Built-in logic to fetch expenses for the past week, month, or custom ranges.
- **Centralized Database Action Layer:** A clean, switch-case driven database wrapper for maintainability.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/Expense Tracker API"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Configure Environment Variables:** Create a .env file in the root directory:

```env
PORT=3000
DB_URL=your_MYSQL_connection_string
JWT_KEY=your_secret
```

5. **Start the server:**

```bash
npm start
```

## Usage

### Auth Routes (Public)

| Method | Route            | Description                   | Status Codes       |
| ------ | ---------------- | ----------------------------- | ------------------ |
| `POST` | `/auth/register` | Create a new user account     | 201, 400, 409, 500 |
| `POST` | `/auth/login`    | Login and receive a JWT token | 200, 401, 400, 500 |

#### Sample User Object

```JSON
{
  "name": "your name",
  "email": "email@gmil.com",
  "password": "your password"
}
```

### Todo Routes (Protected - Requires `authorization: Bearer <token>`)

| Method   | Route          | Description                             | Status Codes       | Query Params     |
| -------- | -------------- | --------------------------------------- | ------------------ | ---------------- |
| `GET`    | `/expense`     | Get all expenses for the logged-in user | 201, 500           | filter, from, to |
| `GET`    | `/expense/:id` | Get a specific expense by ID            | 200, 404, 400, 500 | -                |
| `POST`   | `/expense`     | Create a new expense                    | 201, 400, 500      | -                |
| `PUT`    | `/expense/:id` | Update a expense                        | 200, 404, 400, 500 | -                |
| `DELETE` | `/expense/:id` | Remove a expense                        | 204, 404, 400, 500 | -                |

**filter:** past_week, past_month, last_3_months, custom (from, to)

#### Sample Todo Object

```JSON
{
  "title": "Grocery Shopping",
  "amount": 55.50,
  "category": "Groceries"
}
```

**Allowed Categories:** Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others.
