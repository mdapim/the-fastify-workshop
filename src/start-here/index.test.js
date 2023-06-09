import createServer from './index.js'
import t from 'tap'

const { test } = t
// instead of writing tap.test
// test('GET /users', async tap => {
t.test('returns users', async t => {
  const fastify = createServer()

  const res = await fastify.inject('/users')

  t.equal(res.statusCode, 200)

  t.same(res.json(), [{ username: 'alice' }, { username: 'bob' }])
})
// })

//my solution

test('GET /users my solution', async t => {
  const app = createServer()

  const response = await app.inject({
    method: 'GET',
    url: 'http://localhost:3000/users',
  })

  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.same(response.json(), [
    { username: 'alice' },
    { username: 'bob' },
  ])
  console.log('status', response.statusCode)
  console.log('response', response.body)
})
// test()
