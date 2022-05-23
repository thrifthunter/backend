const users = require('./controller/users');
const userOpt = require('./controller/users_opt')
const mysql = require('mysql');
const items = require('./controller/firestore');
// const  


// eslint-disable-next-line no-unused-vars
async function routes(fastify, options) {
	// Route Ujicoba
	fastify.get('/', userOpt.defaultOpt, (request, reply) => {
		
		reply.send({ message: test , code: 200 });
	});

	fastify.post('/register', userOpt.registerOpt, users.register);

	fastify.post('/login', userOpt.loginOpt, users.login);

	fastify.get('/profile', userOpt.getProfileOpt, users.getProfile);

	fastify.put('/profile', userOpt.updateProfileOpt, users.updateProfile);

	fastify.get('/items', items.getItems);
}

module.exports = routes;
