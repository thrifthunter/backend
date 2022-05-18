const jwt = require('jsonwebtoken');
let response = require('./response');

async function verifyJWT (headers, reply) {
    const token = headers.replace('Bearer ', '');
    let decode;
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET)
    }

    catch (err) {
        if (err.name == "TokenExpiredError")
            return reply
                .code(401)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({
                    error: true,
                    message: "Token Expired",
                });
    }

    return decode.id
}

module.exports = {
    verifyJWT
};