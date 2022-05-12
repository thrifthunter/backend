const users = require('./controller/users');

// eslint-disable-next-line no-unused-vars
async function routes(fastify, options) {
	// Route Ujicoba
	fastify.get('/', (request, reply) => {
		reply.send({message: 'Hello World', code: 200});
	});

	fastify.post('/register', users.register);

	fastify.post('/login', users.login);

	fastify.get('/profile', users.profile);
}

module.exports = routes;
