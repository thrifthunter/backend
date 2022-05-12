let response = require('../response');
let connection = require('../connection');
const utils = require('../utils')
let moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(request, reply) {
    if (request.body.password.length < 8)
        return response.badRequest('', `Password minimal 8 karakter!`, reply)

    const email = request.body.email;
    const password = await bcrypt.hash(request.body.password, 12);
    const username = request.body.username;
    const phone = request.body.phone
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString();

    const sql = `INSERT INTO users (username, email, password, phone, created_at)
            values(?, ?, ?, ?, ?)`;

    const data = await new Promise((resolve) =>
        connection.query(sql,
            [username, email, password, phone, created_at], async function (error, rows) {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return response.badRequest('', `E-mail ${email} telah digunakan!`, reply)
                    }
                    return response.badRequest('', `${error}`, reply)
                }

                return resolve({ name: username, email: email, });
            })
    );

    return response.ok(data, `Berhasil registrasi pengguna baru - ${email}`, reply);
}

async function login(request, reply) {
    const { email, password } = request.body
    console.log(email, password)
    let sql = `SELECT * FROM users WHERE email = ?`;
    let data = await new Promise((resolve) =>
        connection.query(sql, [email], function (error, rows) {
            if (error) {
                console.log(error);
                return response.badRequest('', `${error}`, reply)
            }
            if (rows.length > 0) {
                const isMatch = bcrypt.compare(password, rows[0].password);
                const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1m' });
                const data = {
                    username: rows[0].username,
                    email: rows[0].email,
                    token: token
                };

                return isMatch ? resolve(data) : resolve(false);
            }
            else {
                return resolve(false);
            }
        })
    );

    if (!data) {
        return response.badRequest('', 'Email atau password yang anda masukkan salah!', reply)
    }

    return response.ok(data, `Berhasil login!`, reply);
}

async function profile(request, reply) {
    const token = request.headers.authorization.replace('Bearer ', '');

    const id = await utils.verifyJWT(token,reply)

    // let decode;
    // try {
    //     decode = jwt.verify(token, process.env.JWT_SECRET)
    // }

    // catch (err) {
    //     if (err.name == "TokenExpiredError")
    //         return reply
    //             .code(401)
    //             .header('Content-Type', 'application/json; charset=utf-8')
    //             .send({
    //                 error: true,
    //                 message: "Token Expired",
    //             });
    // }

    const data = await new Promise((resolve) =>
        connection.query(`select * from users where id =?`, [id], function (error, rows) {
            if (error) {
                console.log(error);
                return response.badRequest('', `${error}`, reply)
            }
            if (rows.length > 0) {
                const data = {
                    username: rows[0].username,
                    email: rows[0].email,
                    phone: rows[0].phone
                };

                return resolve(data)
            }
        }));
   
    return response.ok(data, `Success`, reply);
}


module.exports = {
    register,
    login,
    profile
};