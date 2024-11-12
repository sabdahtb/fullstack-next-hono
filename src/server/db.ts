import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

export function prisma() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  const adapter = new PrismaNeon(pool)

  const db = new PrismaClient({
    adapter, // Just use adapter if using Neon as Database
  })

  return db
}
