import '@fastify/jwt'
import 'fastify'

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface FastifyInstance {
    config: {
      PORT: number
      JWT_PRIVATE_KEY: string
      JWT_PUBLIC_KEY: string
    }
  }
}

declare module '@fastify/jwt' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface FastifyJWT {
    user: {
      sub: string
      name: string
    }
  }
}
