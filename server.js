require('dotenv').config();
const connection = require('./connection');

const fastify = require('fastify')(
	{ logger: true },
);

// Fungsi ini untuk membuat kita bisa melakuakn post melalui www-url-encoded.
// fastify.register(require('fastify-formbody'));
fastify.register(require('@fastify/swagger'), {
	routePrefix: '/',
	swagger: {
		info: {
			title: 'API documentation',
			description: 'Here is list of API routes documentation',
			version: '1.0.0'
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here'
		},
	},
	exposeRoute: true
})

fastify.ready(async (err) => {
	if (err) throw err
	await fastify.swagger()

})

fastify.register(require('./routes'), { prefix: 'api/v1' });

const start = async () => {
	try {
		await fastify.listen(process.env.APP_PORT, process.env.APP_HOST);
		fastify.log.info(`server listening on ${fastify.server.address().port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	try{
		await connection.connect();
		
	}
	catch(err){
		console.error('error connecting: ' + err.stack);
		process.exit(1);
	}
	fastify.log.info( 'db connected')
};

start();
