require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});


// Bağlantı testi
pool.getConnection((err, connection) => {
    if (err) {
        console.error("MySQL bağlantı hatası:", err);
    } else {
        console.log("MySQL'e başarıyla bağlanıldı.");
        connection.release();
    }
});

module.exports = pool.promise();