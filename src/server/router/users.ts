import { Hono } from 'hono'
import { superJsonResponse } from '../utils'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { prisma } from '../db'

const app = new Hono()
export const userRouter = app
  .get(
    '',
    zValidator(
      'query',
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const db = prisma()
      const values = c.req.valid('query')
      const user = await db.user.findUnique({
        where: { id: values?.id },
      })

      return superJsonResponse(user, 200)
    }
  )
  .patch(
    'image',
    zValidator(
      'json',
      z.object({
        id: z.string(),
        cid: z.string(),
      })
    ),
    async (c) => {
      const db = prisma()
      const values = c.req.valid('json')

      const user = await db.user.findUnique({
        where: { id: values?.id },
      })

      if (!user) {
        return superJsonResponse({ error: 'User not found' }, 404)
      }

      const updatedUser = await db.user.update({
        where: { id: values?.id },
        data: {
          image: values?.cid,
        },
      })

      return superJsonResponse(updatedUser, 200)
    }
  )
