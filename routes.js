let users = require('./controller/users');


async function routes (fastify, options) {

    //Route Ujicoba
    fastify.get('/', function (request, reply) {
        reply.send({message: 'Hello World', code: 200});
    });

    fastify.post('/register', users.register);

}

module.exports = routes;