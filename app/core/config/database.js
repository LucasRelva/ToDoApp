require('dotenv').config()

module.exports = {

    dialect: 'mysql',
    host: '127.0.0.1',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    port: process.env.DB_PORT,
    define: {
        timestamps: true, // created_at e updated_at
    }
}