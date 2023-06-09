import { Type } from '@sinclair/typebox'
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
const schema = {
  response: { 200: Response },
}
export default async function users(fastify) {
  fastify.get('/users', { schema }, async req => {
    req.log.info('Users route called')
    return [{ username: 'alice' }, { username: 'bob' }]
  })
}
