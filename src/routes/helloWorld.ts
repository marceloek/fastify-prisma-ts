import { FastifyInstance } from 'fastify'

export async function helloWorld(app: FastifyInstance) {
  app.route({
    url: '/',
    method: 'GET',
    handler: () => {
      return { hello: 'world' }
    },
  })
}
