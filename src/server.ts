import app from './app.js'

const initializeServer = async () => {
  await app.ready()

  app
    .listen({
      host: '0.0.0.0',
      port: app.config.PORT,
    })
    .catch(err => {
      app.log.error(err)
      process.exit(1)
    })
}

initializeServer()
