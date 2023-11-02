import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { PostController } from '@/controller/post.js'

import { baseRoute } from './base.js'

export async function postRoutes(app: FastifyInstance) {
  const postController = new PostController()

  const paramsSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    title: z.string(),
    content: z.string().nullable().optional().default(null),
    published: z.boolean().optional().default(false),
    authorId: z.number(),
  })

  baseRoute(app, 'post', postController, paramsSchema, bodySchema)
}
