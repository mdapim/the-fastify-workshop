import S from 'fluent-json-schema'
import SQL from '@nearform/sql'
// const schema = {
//   response: {
//     200: {
//       type: 'array',
//       item: 'object',
//       required: ['username'],
//       properties: {
//         username: { type: 'string' },
//       },
//     },
//   },
//   handler: async function (req, reply) {
//     req.log.info('logging the user info right now')
//     reply.send([{ usern: 1 }, { usern: 'bob' }])
//   },
// }

// const response = S.array().items(
//   S.object().prop('username', S.string().required())
// )

// const schema = {
//   response: {
//     200: {
//       response,
//     },
//   },
//   handler: async function (req, reply) {
//     req.log.info('logging the user info right now')
//     reply
//       .type('application/json')
//       .send([{ wrong: 'mike' }, { wrong: 'bob' }])
//   },
// }

// export default async function users(fastify) {
//   fastify.get('/users', schema)
// }

//my solution
// export default async function routes(fastify, options, done) {
//   fastify.get('/users', () => {
//     return [
//       { username: 'Mike' },
//       {
//         username: 'Mike 2',
//       },
//     ]
//   })

//   done()
// }

const response = S.array().items(
  S.object()
    .prop('id', S.integer().required())
    .prop('username', S.string().required())
)
const schema = {
  response: {
    200: response,
  },
}

export default async function users(fastify) {
  fastify.get('/users', { schema }, async (req, reply) => {
    req.log.info('Users route called')

    const { rows } = await fastify.pg.query(
      SQL`SELECT id, username FROM users`
    )

    reply.send(rows)
  })
}
