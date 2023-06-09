import Fastify from 'fastify'
import createServer from './index.js'
import config from './config.js'

const fastify = createServer(config)

const start = async function () {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

// my solution

// import Fastify from 'fastify'
// const fastify = Fastify({ logger: true })

// fastify.get('/test', (re, reply) => {
//   reply.send({ hello: 'world' })
// })

// const start = async () => {
//   try {
//     await fastify.listen({ port: 3000 })
//   } catch (error) {
//     fastify.log.error(error)
//     process.exit(1)
//   }
// }

// start()
