import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { UserController } from '@/controller/user.js'

export async function userRoutes(app: FastifyInstance) {
  const controller = new UserController()

  const paramsSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    email: z.string(),
    name: z.string().nullable().optional().default(null),
  })

  app.get('/user', async () => {
    const users = await controller.find()

    return users
  })

  app.get('/user/:id', async req => {
    const { id } = paramsSchema.parse(req.params)

    const user = await controller.findById(+id)

    return user
  })

  app.post('/user', async (req, rep) => {
    const body = bodySchema.parse(req.body)

    const user = await controller.create(body)

    return rep.code(201).send(user)
  })

  app.put('/user/:id', async req => {
    const { id } = paramsSchema.parse(req.params)

    const body = bodySchema.parse(req.body)

    const user = await controller.updateById(+id, body)

    return user
  })

  app.delete('/user/:id', async (req, rep) => {
    const { id } = paramsSchema.parse(req.params)

    await controller.deleteById(+id)

    return rep.code(204)
  })
}
