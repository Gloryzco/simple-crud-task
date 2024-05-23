# Node.js PostgreSQL CRUD API

## Description
This is a basic CRUD API built with Node.js, PostgreSQL, Prisma, Kyseley, Zod, and Moment.js.

## Setup
1. Clone this repository.
2. Install dependencies: `npm install`.
3. Set up your PostgreSQL database and add connection string to `.env`.
4. Run Prisma migrations: `npx prisma migrate dev --name init`.
5. Generate Prisma Client: `npx prisma generate`.

## Endpoints
- `POST /users`: Create a new user.
- `GET /users/:id`: Get user by ID.
- `PUT /users/:id`: Update user by ID.
- `DELETE /users/:id`: Delete user by ID.

## Usage
1. Run the server: `npm start`.
2. Send requests to the endpoints using tools like Postman or cURL.

## Author
Your Name
