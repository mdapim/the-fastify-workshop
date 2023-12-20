/**
 * @type {import('fastify').FastifyPluginAsync}
 * */
import S from 'fluent-json-schema'
import AJV from 'ajv'

const ajv = new AJV()
const schema = {
  params: S.object().prop('id', S.string().format('uuid').required()),
  response: {
    200: S.array().items(
      S.object()
        .prop('username', S.string().format('uuid').required())
        .prop('password', S.string().required())
        .prop('userID', S.string())
    ),
  },
}

export default async function users(fastify) {
  fastify.get('/users/:id', { schema }, async req => {
    const userID = req.params.id
    console.log(req.params)
    req.log.info('Users route called')

    const uid = { $id: req.params.id }
    const valid = ajv.validate(uid, schema.params)
    console.log('this is the error from ajv', valid)

    return [{ username: 'alice', password: '123', userID: userID }]
  })
}

//return [{username: 'alice'}, {username: 'bob'}]
