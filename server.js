require('dotenv').config();
const connection = require('./connection');

const fastify = require('fastify')(
    { logger: true },
);

fastify.register(require('@fastify/formbody'))
// Fungsi ini untuk membuat kita bisa melakuakn post melalui www-url-encoded.
// fastify.register(require('fastify-formbody'));
fastify.register(require('@fastify/swagger'), {
    routePrefix: '/',
    swagger: {
        info: {
            title: 'API documentation',
            description: 'Here is list of API routes documentation | CI/CD',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        securityDefinitions: {
            ApiToken: {
                description: 'Authorization header token, sample: "Bearer #TOKEN#"',
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
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

    try {
        connection.query("select * from items");
        fastify.log.info('db connected')
    } catch (error) {
        console.error(err);
    }




};

start();
