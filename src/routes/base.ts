import { FastifyInstance } from 'fastify'
import { ZodRawShape, z } from 'zod'

import { PostController } from '@/controller/post.js'
import { UserController } from '@/controller/user.js'

type IController = UserController | PostController

export function baseRoute<IP extends ZodRawShape, IB extends ZodRawShape>(
  app: FastifyInstance,
  route: string,
  controller: IController,
  paramsSchema: z.ZodObject<IP>,
  bodySchema: z.ZodObject<IB>,
) {
  app.get(`/${route}`, async () => {
    const values = await controller.find()

    return values
  })

  app.get(`/${route}/:id`, async req => {
    const { id } = paramsSchema.parse(req.params)

    const value = await controller.findById(+id)

    return value
  })

  app.post(`/${route}`, async (req, rep) => {
    const body = bodySchema.parse(req.body)

    const value = await controller.create(body as never)

    return rep.code(201).send(value)
  })

  app.put(`/${route}/:id`, async req => {
    const { id } = paramsSchema.parse(req.params)

    const body = bodySchema.parse(req.body)

    const value = await controller.updateById(+id, body as never)

    return value
  })

  app.delete(`/${route}/:id`, async (req, rep) => {
    const { id } = paramsSchema.parse(req.params)

    await controller.deleteById(+id)

    return rep.code(204).send()
  })
}
