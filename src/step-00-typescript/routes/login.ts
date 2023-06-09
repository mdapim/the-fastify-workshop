import * as errors from 'http-errors'
import S from 'fluent-json-schema'
import { Type, Static } from '@sinclair/typebox'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { JWT } from '@fastify/jwt'

// const T = Type.Object({
//   body: Type.Object({
//     username: Type.String(),
//     password: Type.String(),
//   }),
//   response: Type.Object({
//     200: Type.Object({ token: Type.String() }),
//   }),
// })

// type T = Static<typeof T>

const Body = Type.Strict(
  Type.Object({
    username: Type.String(),
    password: Type.String(),
  })
)

type Body = Static<typeof Body>

const Response = Type.Object({ token: Type.String() })
type Response = Static<typeof Response>

const schema = {
  body: Body,
  response: { 200: Response },
}

export default async function login(fastify: FastifyInstance) {
  fastify.post(
    '/login',
    { schema },
    async (
      req: FastifyRequest<{ Body: Body }>
    ): Promise<Response> => {
      const { username, password } = req.body

      // sample auth check
      if (username !== password) {
        throw errors.Unauthorized()
      }

      return { token: fastify.jwt.sign({ username }) }
    }
  )
}
