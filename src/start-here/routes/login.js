import { S } from 'fluent-json-schema'
import Ajv from 'ajv'
import createError from 'http-errors'
import SQL from '@nearform/sql'

// const loginOpts = {
//   schema: {
//     body: {
//       type: 'object',
//       required: ['username', 'password'],
//       properties: {
//         username: { type: 'string' },
//         password: { type: 'string' },
//       },
//     },
//   },
// }

// const loginOpts = {

const body = S.object()
  .prop('username', S.string().required())
  .prop('password', S.string().required())

const response =
  S.object().prop('token', S.string().required()) ||
  S.string().required()

const schema = {
  response: { 200: response },
  body: body,
}
// }

// const ajv = new Ajv({ allErrors: true })
// const validate = ajv.compile(schema.valueOf())

export default async function login(fastify) {
  fastify.post('/login', { schema }, async function (req, reply) {
    const { username, password } = req.body
    // const sql = SQL`SELECT * FROM users WHERE username LIKE ${username}`
    // const client = await fastify.pg.connect()

    req.log.info('logging the user into system')
    if (username !== password)
      throw createError(401, 'Please login to access this')

    const {
      rows: [user],
    } = await fastify.pg.query(
      SQL`SELECT id, username FROM users WHERE username = ${username}`
    )

    if (!user) throw createError(401, 'Please login to access this')

    return { token: fastify.jwt.sign({ username }) }
  })
}

//my implementation
// fastify.post('/login', { schema }, async function (req, reply) {
//   const { username, password } = req.body
//   const sql = SQL`SELECT * FROM users WHERE username LIKE ${username}`
//   const client = await fastify.pg.connect()

//   req.log.info('logging the user into system')

// try {
//   const { rows } = await client.query(sql)
//   // Note: avoid doing expensive computation here, this will block releasing the client
//   let returnedData = rows[0]
//   if (username === password)
//     if (returnedData?.username === username)
//       return { token: fastify.jwt.sign({ username }) }
//     else return createError(401, 'Please login to access this')
// } finally {
//   // Release the client immediately after query resolves, or upon error
//   client.release()
// }

// // let valid = validate(req.body)
// // console.log(valid)

// // const token = fastify.jwt.sign(username, { expires: 2000 })
// // return { username, password, user: req.user }
// //reply.send('user has been logged in')

// let valid = validate(req.body)
// console.log(valid)

// const token = fastify.jwt.sign(username, { expires: 2000 })
// return { username, password, user: req.user }
// reply.send('user has been logged in')
