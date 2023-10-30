import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { PostController } from '@/controller/post.js'

export async function postRoutes(app: FastifyInstance) {
  const controller = new PostController()

  const paramsSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    title: z.string(),
    content: z.string().nullable().optional().default(null),
    published: z.boolean().optional().default(false),
    authorId: z.number(),
  })

  app.get('/post', async () => {
    const posts = await controller.find()

    return posts
  })

  app.get('/post/:id', async req => {
    const { id } = paramsSchema.parse(req.params)

    const post = await controller.findById(+id)

    return post
  })

  app.post('/post', async (req, rep) => {
    const body = bodySchema.parse(req.body)

    const post = await controller.create(body)

    return rep.code(201).send(post)
  })

  app.put('/post/:id', async req => {
    const { id } = paramsSchema.parse(req.params)

    const body = bodySchema.parse(req.body)

    const post = await controller.updateById(+id, body)

    return post
  })

  app.delete('/post/:id', async req => {
    const { id } = paramsSchema.parse(req.params)

    const post = await controller.deleteById(+id)

    return post
  })
}
