import * as errors from 'http-errors'
import { Type } from '@sinclair/typebox'
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
const Response = Type.Object({ token: Type.String() })
const schema = {
  body: Body,
  response: { 200: Response },
}
export default async function login(fastify) {
  fastify.post('/login', { schema }, async req => {
    const { username, password } = req.body
    // sample auth check
    if (username !== password) {
      throw errors.Unauthorized()
    }
    return { token: fastify.jwt.sign({ username }) }
  })
}
