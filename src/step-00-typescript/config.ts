import { join } from 'desm'
import envSchema from 'env-schema'
import { S } from 'fluent-json-schema'

const schema = S.object()
  .prop('JWT_SECRET', S.string().required())
  .prop('LOG_LEVEL', S.string().default('info'))
  .prop('PRETTY_PRINT', S.string().default(true))
  .valueOf()

export default envSchema<Config>({
  schema,
  dotenv: { path: join(import.meta.url, '.env') },
})

export type Config = {
  JWT_SECRET: string
  LOG_LEVEL: string
  PRETTY_PRINT: string
}
