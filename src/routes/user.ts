import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { UserController } from '@/controller/user.js'

import { baseRoute } from './base.js'

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController()

  const paramsSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    email: z.string(),
    name: z.string().nullable().optional().default(null),
    password: z.string(),
  })

  baseRoute(app, 'user', userController, paramsSchema, bodySchema)
}
