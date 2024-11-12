import { Hono } from 'hono'
import { superJsonResponse } from '../utils'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { prisma } from '../db'

const app = new Hono()
export const postRouter = app
  .get('', async (c) => {
    const db = prisma()
    const data = await db.post.findMany({ orderBy: { updatedAt: 'desc' } })

    return superJsonResponse(data, 201)
  })
  .post(
    'test',
    zValidator(
      'json',
      z.object({
        title: z.string(),
      })
    ),
    async (c) => {
      const values = c.req.valid('json')

      const db = prisma()
      await db.post.create({
        data: {
          title: values.title,
        },
      })

      console.log({ values })
      const data = {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        timestamp: new Date(),
      }

      return c.json(data, 200)
    }
  )
