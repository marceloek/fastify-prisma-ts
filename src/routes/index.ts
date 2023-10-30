import { FastifyInstance } from 'fastify'

import { postRoutes } from './post.js'
import { userRoutes } from './user.js'

export const routes = {
  default: async (app: FastifyInstance) => {
    app.get('/', () => ({ hello: 'World!' }))
  },
  postRoutes,
  userRoutes,
}
