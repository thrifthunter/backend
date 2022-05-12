async function ok (values, message, reply) {
    return reply
    .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            error : false,
            message : message,
            values : values,
            
        });
}

async function badRequest (values, message, reply) {
    return reply
        .code(400)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            error : true,
            message : message,
            values : values,
        });
}

module.exports = {
    ok, badRequest
};