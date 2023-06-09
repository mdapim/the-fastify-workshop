import fp from 'fastify-plugin';
async function authenticate(fastify, opts) {
    fastify.register(import('@fastify/jwt'), {
        secret: opts.JWT_SECRET,
    });
    fastify.decorate('authenticate', async (req, reply) => {
        try {
            await req.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
}
export default fp(authenticate);
