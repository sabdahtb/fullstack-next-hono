# Nextjs 15 Hono Boilerplate

This is a full-stack web application built with Next.js, TypeScript, Hono, Prisma, Tailwind CSS, ShadCN UI, and TanStack Query.

## Technologies Used

- **Next.js**: A React framework for building full-stack applications.
- **TypeScript**: JavaScript with type safety.
- **Hono**: A lightweight web framework for building APIs.
- **Prisma**: An ORM for working with databases.
- **Tailwind CSS**: A utility-first CSS framework.
- **ShadCN UI**: A component library for building modern UIs.
- **TanStack Query**: A data fetching library for React.
- **Bun**: A fast JavaScript runtime like Node.js, with a focus on performance.

## Getting Started

To get started with this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

Since you're using Bun, use the following command to install dependencies:

```bash
bun install
```

### 3. Set up the database

Make sure you have a PostgreSQL, MySQL, or SQLite database set up. Then, configure your `.env` file with the appropriate database connection string.

```bash
# .env
DATABASE_URL="your-database-connection-url"
```

Run Prisma migrations to set up your database schema:

```bash
bun prisma migrate dev
```

### 4. Start the development server

```bash
bun run dev
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License.

### Key Changes:
1. **Bun Commands**: The `bun install` and `bun run dev` commands are used for installing dependencies and starting the development server, instead of `npm` or `yarn`.
2. **Prisma**: Prisma is still used for managing the database, and the `bun prisma migrate dev` command will work with Bun's runtime.

This should work well with Bun as the runtime for your Next.js project!
