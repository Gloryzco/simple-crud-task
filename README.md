# Node.js PostgreSQL CRUD API

## Description
This is a basic CRUD API built with Node.js, PostgreSQL, Prisma, Kyseley, Zod, and Moment.js.

## Setup
1. Clone this repository.
2. Install dependencies: `npm install`.
3. Set up your PostgreSQL database and add connection string to `.env`.
4. Run Prisma migrations: `npx prisma migrate dev`.

## Endpoints
- `POST /users`: Create a new user.
- `POST /wallet`: Create a new wallet.
- `GET /user/:id/wallet`: Get wallet by ID.
- `PUT /wallet/:id/charge`: Charge wallet.
- `PUT /wallet/:id/fund`: Fund wallet.
- `DELETE /:id`: Delete wallet.

## Usage
1. Run the server: `npm run start`.
2. Send requests to the endpoints using tools like Postman.

## Author
Glory A.
