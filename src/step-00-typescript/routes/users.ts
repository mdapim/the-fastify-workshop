import S from 'fluent-json-schema'
import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance, FastifyRequest } from 'fastify'

// const schema = {
//   response: {
//     200: S.array().items(
//       S.object().prop('username', S.string().required())
//     ),
//   },
// }

const T = Type.Object({
  response: Type.Object({
    200: Type.Array(
      Type.Object({
        username: Type.String(),
      })
    ),
  }),
})

const Response = Type.Array(
  Type.Object({
    username: Type.String(),
  })
)
type Response = Static<typeof Response>

const schema = {
  response: { 200: Response },
}

export default async function users(fastify: FastifyInstance) {
  fastify.get(
    '/users',
    { schema },
    async (req: FastifyRequest): Promise<Response> => {
      req.log.info('Users route called')
      return [{ username: 'alice' }, { username: 'bob' }]
    }
  )
}
