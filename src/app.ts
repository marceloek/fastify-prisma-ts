import fastifyEnv from '@fastify/env'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import fastifyFavicon from 'fastify-favicon'

import { routes } from './routes/index.js'

const app = fastify()

// app.register(fastifyCors, {
//   origin: true,
// })

app.register(fastifyFavicon, {
  path: 'src',
})

await app.register(fastifyEnv, {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['PORT', 'JWT_PRIVATE_KEY', 'JWT_PUBLIC_KEY'],
    properties: {
      PORT: {
        type: 'number',
        default: 3333,
      },
      JWT_PRIVATE_KEY: {
        type: 'string',
        default: 'secret',
      },
      JWT_PUBLIC_KEY: {
        type: 'string',
        default: 'public',
      },
    },
  },
})

app.register(fastifyJwt, {
  secret: app.config.JWT_PRIVATE_KEY,
})

Object.values(routes).forEach(route => app.register(route))

export default app
