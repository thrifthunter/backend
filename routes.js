const users = require('./controller/users');
const userOpt =  require('./controller/users_opt')

// const  


// eslint-disable-next-line no-unused-vars
async function routes(fastify, options) {
	// Route Ujicoba
	fastify.get('/',userOpt.defaultOpt, (request, reply) => {
		reply.send({ message: 'Test Routes', code: 200 });
	});

	fastify.post('/register',userOpt.registerOpt, users.register);

	fastify.post('/login', userOpt.loginOpt, users.login);

	fastify.get('/profile',userOpt.getProfileOpt, users.getProfile);

	fastify.put('/profile',userOpt.updateProfileOpt, users.updateProfile);
}

module.exports = routes;
