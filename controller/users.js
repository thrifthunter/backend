let response = require('../response');
let connection = require('../connection');
let moment = require('moment');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

async function register (request, reply) {
    const email = request.body.email;
    const password = await bcrypt.hash(request.body.password, 12);
    const username = request.body.username;
    const phone = request.body.phone
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString();

    // const token = jwt.sign({ id: 12345 }, process.env.JWT_SECRET, { expiresIn: '72h' })


    const sql = `INSERT INTO users (username, email, password, phone, created_at)
            values(?, ?, ?, ?, ?)`;

    //Menggunakan promise apabila membutuhkan data yang akan dikembalikan setelah callback
    const data = await new Promise((resolve) =>
        connection.query(sql,
            [username, email, password, phone, created_at], function (error, rows) {
            if(error){
                //Check terlebih dahulu untuk data yang sudah ada.
                if(error.code === 'ER_DUP_ENTRY'){
                    return response.badRequest('', `E-mail ${email} telah digunakan!`, reply)
                }

                //Jika bukan duplicate entry maka cetak error yang terjadi.
                console.log(error);
                return response.badRequest('', `${error}`, reply)
            }

            return resolve({ name: username, email: email, });
        })
    );

    return response.ok(data, `Berhasil registrasi pengguna baru - ${email}`, reply);
}
module.exports = {
    register
};