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
    const name = request.body.name;
    const phone = request.body.phone
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString();

    const sql = `INSERT INTO users (name, email, password, phone, created_at)
            values(?, ?, ?, ?, ?)`;

    const data = await new Promise((resolve) =>
        db.query(sql,
            [name, email, password, phone, created_at], async function (error, rows) {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return response.badRequest('', `E-mail ${email} telah digunakan!`, reply)
                    }
                    return response.badRequest('', `${error}`, reply)
                }
                else {
                    return resolve();
                }


            })
    );

    return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            error: false,
            message: 'User Created'
        })
}

async function login(request, reply) {
    const { email, password } = request.body
    let sql = `SELECT * FROM users WHERE email = ?`;
    let loginResult = await new Promise((resolve) =>
        db.query(sql, [email], function (error, rows) {
            if (error) {

                return response.badRequest('', `${error}`, reply)
            }

            if (rows.length > 0 && password != undefined) {
                const isMatch = bcrypt.compareSync(password, rows[0].password)
                const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                const loginResult = {
                    name: rows[0].name,
                    token: token
                };

                return isMatch ? resolve(loginResult) : resolve(false);
            }
            else {
                return resolve(false);
            }
        })
    );

    if (!loginResult) {
        return response.badRequest('', 'Email atau password yang anda masukkan salah!', reply)
    }

    return response.ok(loginResult, `Success`, reply);
}

async function updateProfile(request, reply) {
    const { email, phone, name } = request.body;
    const id = await utils.verifyJWT(request.headers.authorization, reply)

    const updateResult = await new Promise((resolve) =>
        db.query(`
        update users 
        set email = ?,
        phone = ?,
        name = ?
        where id = ? 
        `, [email, phone, name, id], function (error) {
            if (error) {
                return response.badRequest('', `${error}`, reply)
            }
            else {
                const updateResult = {
                    name: name,
                    email: email,
                    phone: phone
                };

                return resolve(updateResult)
            }
        }));

    return response.ok(updateResult, `Updated`, reply);
}

async function getProfile(request, reply) {

    const id = await utils.verifyJWT(request.headers.authorization, reply)
    const result = await new Promise((resolve) =>
        db.query(`select * from users where id =?`, [id], function (error, rows) {
            if (error) {
                return response.badRequest('', `${error}`, reply)
            }
            if (rows.length > 0) {
                const result = {
                    name: rows[0].name,
                    email: rows[0].email,
                    phone: rows[0].phone
                };

                return resolve(result)
            }
        }));

    return response.ok(result, `Success`, reply);
}

module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};