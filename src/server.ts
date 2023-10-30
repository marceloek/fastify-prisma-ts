import app from './app.js'

const { PORT: port } = app.config

const initializeServer = async () => {
  await app.ready()

  app
    .listen({ host: '0.0.0.0', port })
    .then(() => {
      console.log(`HTTP server running on http://localhost:${port}`)
      return true
    })
    .catch(() => {
      console.log('Something went wrong!')
      process.exit(1)
    })
}

initializeServer()
