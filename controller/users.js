let response = require('../response');
let db = require('../connection');
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
        db.query(sql,
            [username, email, password, phone, created_at], async function (error, rows) {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return response.badRequest('', `E-mail ${email} telah digunakan!`, reply)
                    }
                    return response.badRequest('', `${error}`, reply)
                }

                return resolve({ username: username, email: email, });
            })
    );

    return response.ok(data, `Berhasil registrasi pengguna baru - ${email}`, reply);
}

async function login(request, reply) {
    const { email, password } = request.body
    let sql = `SELECT * FROM users WHERE email = ?`;
    let data = await new Promise((resolve) =>
        db.query(sql, [email], function (error, rows) {
            if (error) {

                return response.badRequest('', `${error}`, reply)
            }

            if (rows.length > 0 && password != undefined) {
                const isMatch = bcrypt.compareSync(password, rows[0].password)
                const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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

async function updateProfile(request, reply) {
    const { email, phone, username } = request.body;
    const id = await utils.verifyJWT(request.headers.authorization, reply)

    const data = await new Promise((resolve) =>
        db.query(`
        update users 
        set email = ?,
        phone = ?,
        username = ?
        where id = ? 
        `, [email, phone, username, id], function (error) {
            if (error) {
                return response.badRequest('', `${error}`, reply)
            }
            else {
                const data = {
                    username: username,
                    email: email,
                    phone: phone
                };

                return resolve(data)
            }
        }));

    return response.ok(data, `Success`, reply);
}

async function getProfile(request, reply) {

    const id = await utils.verifyJWT(request.headers.authorization, reply)
    const data = await new Promise((resolve) =>
        db.query(`select * from users where id =?`, [id], function (error, rows) {
            if (error) {
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
    getProfile,
    updateProfile
};