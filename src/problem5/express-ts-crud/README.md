# Express TypeScript CRUD API

This project is a CRUD API for managing users, built with Express.js, TypeScript, SQLite, TypeORM, and Swagger for API documentation.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Install dependencies:
   ```sh
   npm install
   ```

2. Build the project:
   ```sh
   npm run build
   ```

3. Start the server:
   ```sh
   npm start
   ```

## API Documentation

The API documentation is available at `/api-docs` once the server is running. It is generated using Swagger.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Scripts](#scripts)
3. [License](#license)

## Project Structure

```
express-ts-crud/
├── dist/                   # Compiled output
├── node_modules/           # Node.js modules
├── src/                    # Source files
│   ├── entity/             # TypeORM entities
│   │   └── User.ts         # User entity
│   ├── routes/             # Express routes
│   │   └── user.ts         # User routes
│   └── index.ts            # Main server file
├── .gitignore              # Git ignore file
├── ormconfig.json          # TypeORM configuration
├── package.json            # npm configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Scripts

- `npm start`: Starts the server using `ts-node`.
- `npm run build`: Compiles the TypeScript code to JavaScript.

## License

This project is licensed under the MIT License.
