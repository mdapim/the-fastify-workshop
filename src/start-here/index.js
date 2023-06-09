import Fastify from 'fastify'
import fp from 'fastify-plugin'
import autoload from '@fastify/autoload'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

function createServer(config) {
  const fastify = Fastify({
    ...config,
    logger: {
      transport: { target: 'pino-pretty' },
    },
  })

  // fastify.register(import('./plugins/authenticate.js'), {
  //   JWT_SECRET: config.JWT_SECRET,
  // })

  // fastify.register(import('./routes/users.js'))
  // fastify.register(import('./routes/login.js'))
  // fastify.register(import('./routes/signup.js'))
  // fastify.register(import('./routes/user/index.js'))
  fastify.register(autoload, {
    dir: join(_dirname, 'plugins'),
    options: { JWT_SECRET: config.JWT_SECRET },
  })
  fastify.register(autoload, {
    dir: join(_dirname, 'routes'),
    indexPattern: /.*routes(\.ts|\.js|\.cjs|\.mjs)$/,
    dirNameRoutePrefix: false,
  })
  fastify.register(import('@fastify/postgres'), {
    connectionString: config.PG_CONNECTION_STRING,
  })

  // fastify.addHook('onRequest', async (request, reply) => {
  //   try {
  //     await request.jwtVerify()
  //   } catch (err) {
  //     reply.send(err)
  //   }
  // })

  fastify.log.info('Fastify is booting up')
  return fastify
}

export default createServer
