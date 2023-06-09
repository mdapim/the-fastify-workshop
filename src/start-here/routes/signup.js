import vary from 'vary'

const append = vary.append
export default async function signup(fastify) {
  fastify.route({
    method: 'GET',
    url: '/',
    constraints: { version: '1.0.0' },
    handler: function (req, reply) {
      vary(reply.response, 'Accept-Version')
      reply.send([{ username: 'alice' }, { username: 'bob' }])
    },
  })

  // export default async function signup(fastify) {
  //   fastify.get('/signup', async function (req, reply) {
  //     req.log.info('logging the user info right now')
  //     reply.send([{ username: 'alice' }, { username: 'bob' }])
  //   })
  // }

  //   fastify.inject(
  //     {
  //       method: 'GET',
  //       url: '/',
  //       headers: {
  //         'Accept-Version': '1.x', // it could also be '1.2.0' or '1.2.x'
  //       },
  //     },
  //     (err, res) => {
  //       // { hello: 'world' }
  //     }
  //   )
}

// testing vary
//   if (req.headers['accept-version']) {
//     let value = reply.getHeader('Vary') || ''
//     const header = Array.isArray(value)
//       ? value.join(', ')
//       : String(value)
//     if ((value = append(header, 'Accept-Version'))) {
//       reply.header('Vary', value)
//     }
//   }
