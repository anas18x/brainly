# Brainly API

A RESTful backend API for storing, organizing, and sharing personal knowledge.

---

## Overview

Brainly is a secure second-brain backend that allows users to save notes, useful links, and resources in one place. Each user can organize content using tags, search through their collection, and share their entire brain publicly using a unique share link while keeping it private by default.

The project follows a feature-based architecture and focuses on clean code, type safety, validation, and secure authentication using TypeScript, Express, MongoDB, JWT, and Zod.

---

## Features

* 🔐 JWT authentication with secure httpOnly cookies
* 📝 Create, read, update, and delete personal notes and links
* 🔍 Search brains by title or tags
* 🏷️ Organize content using normalized tags
* 🌐 Public sharing of an entire brain collection
* 🔒 Ownership-based authorization
* 🔑 Secure password management
* ✅ Request validation using Zod
* 🛡️ Password hashing with bcrypt
* ⏱️ Rate limiting and centralized error handling

---

## Tech Stack

| Category       | Technology                 |
| -------------- | -------------------------- |
| Runtime        | Node.js                    |
| Language       | TypeScript                 |
| Framework      | Express.js 5               |
| Database       | MongoDB + Mongoose         |
| Authentication | JWT                        |
| Validation     | Zod                        |
| Security       | bcrypt, express-rate-limit |
| Development    | TSX                        |

---

## Project Structure

```text
src/
├── config/
│   └── ENV.config.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── modules/
│   ├── auth/
│   ├── brain/
│   └── users/
├── routes/
│   └── v1/
├── types/
├── utils/
│   ├── common/
│   └── error/
├── db.ts
└── index.ts
```

The project follows a **feature-based architecture**, where each feature contains its own routes, controllers, services, and validation schemas.

---

## Prerequisites

* Node.js 18+
* npm
* MongoDB (Local or Atlas)

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
cd brainly
```

Install dependencies.

```bash
npm install
```

Create a `.env` file in the project root.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Start the development server.

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000/api/v1
```

---

## Environment Variables

| Variable               | Description                        |
| ---------------------- | ---------------------------------- |
| `PORT`                 | Application port                   |
| `MONGO_URI`            | MongoDB connection string          |
| `JWT_SECRET`           | Secret used to sign access tokens  |
| `REFRESH_TOKEN_SECRET` | Secret used to sign refresh tokens |

> Never commit your `.env` file to version control.

---

## API Endpoints

### Authentication

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/auth/register`        | Register a new user         |
| POST   | `/auth/login`           | Login                       |
| GET    | `/auth/me`              | Get the authenticated user  |
| POST   | `/auth/change-password` | Change user password        |
| POST   | `/auth/refresh-token`   | Generate a new access token |
| POST   | `/auth/logout`          | Logout the current user     |

---

### Brain

| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| POST   | `/brain`                  | Create a brain                   |
| GET    | `/brain`                  | Get all brains                   |
| GET    | `/brain/:id`              | Get a brain by ID                |
| PATCH  | `/brain/:id`              | Update a brain                   |
| DELETE | `/brain/:id`              | Delete a brain                   |
| GET    | `/brain/tags`             | Get all unique tags              |
| POST   | `/brain/share`            | Enable public sharing            |
| PATCH  | `/brain/share`            | Disable public sharing           |
| GET    | `/brain/share/:shareSlug` | Access a public brain collection |

### Search & Filtering

Retrieve brains using query parameters.

```http
GET /brain?search=jwt

GET /brain?tags=backend

GET /brain?search=jwt&tags=backend
```

---

## Authentication

Protected endpoints require authentication using JWT access tokens stored in secure httpOnly cookies.

After a successful login:

* Access Token is stored in the `accessToken` cookie.
* Refresh Token is stored in the `refreshToken` cookie.
* Protected routes automatically authenticate using these cookies.

---

## Project Architecture

### Request Flow

```text
Client
    │
    ▼
Express Middleware
    ├── Rate Limiter
    ├── Cookie Parser
    ├── Validation
    └── Authentication
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
MongoDB
    │
    ▼
Response
```

---

## Error Handling

The project uses centralized error handling with a custom `AppError` class and a global error middleware to ensure consistent API responses across the application.

---

## Future Improvements

* Swagger / OpenAPI documentation
* Postman collection
* Pagination
* Favorites
* Metadata extraction from URLs

---
