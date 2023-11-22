import { FastifyInstance } from 'fastify'

export async function helloWorldRoute(app: FastifyInstance) {
  app.route({
    url: '/',
    method: 'GET',
    handler: () => {
      return { hello: 'world' }
    },
  })
}
