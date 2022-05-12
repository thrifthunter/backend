require('dotenv').config();
const fastify = require('fastify')(
	{logger: true},
);

// Fungsi ini untuk membuat kita bisa melakuakn post melalui www-url-encoded.
// fastify.register(require('fastify-formbody'));

fastify.register(require('./routes'));

const start = async () => {
	try {
		await fastify.listen(process.env.APP_PORT || 3000);
		fastify.log.info(`server listening on ${fastify.server.address().port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
