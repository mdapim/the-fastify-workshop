import fastify, { FastifyRequest, FastifyReply } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
  }
}

declare function authenticate(): Promise<void>
declare namespace authenticate {}
export = authenticate
