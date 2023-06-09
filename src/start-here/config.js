import envSchema from 'env-schema'
import S from 'fluent-json-schema'
import { join } from 'desm'

const schema = S.object()
  .prop('JWT_SECRET', S.string().required())
  .prop('PORT', S.number().default(3000).required())
  .prop('PG_CONNECTION_STRING', S.string().required())

// const config = envSchema({
//   schema: schema,
//   data: process.env,
//   dotenv: true,
// })

// export default function config() {
//   const confg = envSchema({
//     schema: schema,
//     data: process.env,
//     dotenv: true,
//   })
//   return confg
// }

export default envSchema({
  schema,
  dotenv: true,
})
