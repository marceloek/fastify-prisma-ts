import { FastifyInstance } from 'fastify'
import { ZodRawShape, z } from 'zod'

import { PostRepository } from '@/repository/post.js'
import { UserRepository } from '@/repository/user.js'

type IRepository = UserRepository | PostRepository

export function baseRoute<
  IParams extends ZodRawShape,
  IBody extends ZodRawShape,
>(
  app: FastifyInstance,
  route: string,
  Repository: IRepository,
  paramsSchema: z.ZodObject<IParams>,
  bodySchema: z.ZodObject<IBody>,
) {
  app.route({
    method: 'GET',
    url: `/${route}`,
    handler: async () => {
      const values = await Repository.find()

      return values
    },
  })

  app.route({
    method: 'GET',
    url: `/${route}/:id`,
    handler: async req => {
      const { id } = paramsSchema.parse(req.params)

      const value = await Repository.findById(+id)

      return value
    },
  })

  app.route({
    method: 'POST',
    url: `/${route}`,
    handler: async (req, rep) => {
      const body = bodySchema.parse(req.body)

      const value = await Repository.create(body as never)

      return rep.code(201).send(value)
    },
  })

  app.route({
    method: 'PUT',
    url: `/${route}/:id`,
    handler: async req => {
      const { id } = paramsSchema.parse(req.params)

      const body = bodySchema.parse(req.body)

      const value = await Repository.updateById(+id, body as never)

      return value
    },
  })

  app.route({
    method: 'DELETE',
    url: `/${route}/:id`,
    handler: async (req, rep) => {
      const { id } = paramsSchema.parse(req.params)

      await Repository.deleteById(+id)

      return rep.code(204).send()
    },
  })
}
