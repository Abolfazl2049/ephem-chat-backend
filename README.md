# EphemChat Backend

A Node.js Express backend server for the Ephem Chat application, featuring real-time communication via Socket.IO and user session management.

## Features

- **Real-time Communication**: Socket.IO for live messaging and signaling
- **User Authentication**: JWT-based authentication with Passport.js
- **Session Management**: Express session handling with cleanup routines
- **Database**: PostgreSQL with Sequelize ORM
- **Admin Panel**: AdminJS for database management
- **Rate Limiting**: Express rate limiter for API protection
- **API Documentation**: Swagger/OpenAPI documentation
- **Cron Jobs**: Node-cron for scheduled tasks

## Tech Stack

- **Framework**: Express.js (v5.1.0)
- **Language**: TypeScript
- **Database**: PostgreSQL with Sequelize
- **Real-time**: Socket.IO (v4.8.1)
- **Authentication**: JWT + Passport.js
- **API Docs**: Swagger UI

## Installation

```bash
yarn install
```

## Scripts

- `yarn dev` - Start development server with watch mode
- `yarn build` - Compile TypeScript and minify
- `yarn swagger` - Generate Swagger documentation
- `yarn migrate` - Run database migrations

## Environment

Configure your environment variables in a `.env` file based on the application's requirements (database credentials, JWT secrets, port, etc.).

## Project Structure

```
src/
├── app.ts              # Express app setup
├── router.ts           # Main route definitions
├── services/           # Feature modules (user, session, enclave, socket)
├── libs/               # External integrations (Sequelize, AdminJS, Socket.IO)
├── gears/              # Core utilities (logger, error handler, route protector)
└── types/              # TypeScript type definitions
```

## Running

- **Development**: `yarn dev`
- **Production**: `yarn build && yarn static`

## API Documentation

Swagger documentation is available at `/docs` when the server is running.
