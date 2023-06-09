import S from 'fluent-json-schema'
const response = S.object()
  .prop('username', S.string().required())
  .prop('iat', S.number().required())

const scheme = {
  response: {
    200: response,
  },
}

export default async function authenticateUser(fastify) {
  fastify.get(
    '/auth',
    {
      scheme,
      onRequest: [fastify.authenticate],
    },
    async function (req, reply) {
      req.log.info('authenticating user')

      return req.user
    }
  )
}
