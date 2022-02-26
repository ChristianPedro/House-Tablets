const pg = require("pg");
const bcrypt = require("bcryptjs")

const Pool = pg.Pool;
const pool = new Pool ({
	"user": process.env.DATABASE_USER,
	"host": process.env.DATABASE_HOST,
	"database": process.env.DATABASE_NAME,
	"password": process.env.DATABASE_PASSWORD,
	"port": process.env.DATABASE_PORT,
})

pool.connect().then( () => {
	console.log(`connected to database: ${process.env.DATABASE_NAME}`)
})

module.exports = {
	pg , pool
}