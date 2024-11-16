# Full-Stack Web Starter with Next.js, Hono, and Bun

A full-stack web application starter template built with modern technologies like **Next.js**, **Hono**, **Bun**, **Prisma**, **NextAuth**, **Zustand**, and **Tailwind CSS**. This boilerplate aims to provide a scalable and high-performance foundation for building full-stack applications.

## 📚 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Scripts](#scripts)
- [License](#license)

## 🚀 Features

- **Full-Stack Framework**: Built with Next.js for server-side rendering and Hono for lightweight API routing.
- **High Performance**: Powered by Bun, a fast JavaScript runtime.
- **Database ORM**: Prisma for seamless database management.
- **Authentication**: Integrated with NextAuth for secure user authentication.
- **Modern Styling**: Styled with Tailwind CSS and ShadCN UI components.
- **State Management**: Uses Zustand for lightweight and scalable state management.
- **Secure Data Persistence**: Zustand state persisted in localStorage with CryptoJS encryption.
- **File Storage**: Uses Pinata Cloud for storing files on IPFS.

## 🛠️ Technologies Used

- **Next.js**: A React framework for building full-stack applications.
- **TypeScript**: JavaScript with type safety.
- **Hono**: A lightweight web framework for building APIs.
- **Prisma**: An ORM for working with databases.
- **Tailwind CSS**: A utility-first CSS framework.
- **ShadCN UI**: A component library for building modern UIs.
- **TanStack Query**: A data fetching library for React.
- **Bun**: A fast JavaScript runtime like Node.js, with a focus on performance.
- **NextAuth**: A complete authentication solution for Next.js applications.
- **Pinata Cloud**: A service for storing files on IPFS.
- **Zustand**: A small, fast, and scalable state management library for React.
- **CryptoJS**: A library for secure cryptography operations, used for persisting Zustand state securely in localStorage.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/) installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sabdahtb/fullstack-next-hono
   cd fullstack-next-hono
   ```

2. Install dependencies:

   Using Bun:
   ```bash
   bun install
   ```

   Using npm:
   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and follow example from `.env.example`

4. Set up the database:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Start the development server:

   Using Bun:
   ```bash
   bun dev
   ```

   Using npm:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## 🗃️ Database Setup

This project uses **Prisma** for database management. To set up your database:

1. Ensure you have a running database instance (e.g., MySQL, PostgreSQL).
2. Update the `DATABASE_URL` in your `.env` file with your database connection string.
3. Run the migration and generate Prisma client:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

## 📜 Scripts

- **`bun dev`** / **`npm run dev`**: Start the development server.
- **`bun build`** / **`npm run build`**: Build the project for production.
- **`bun start`** / **`npm start`**: Start the production server.
- **`prisma migrate dev`**: Run Prisma migrations.
- **`prisma studio`**: Open Prisma Studio to interact with your database.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this template according to your project's specific needs!
