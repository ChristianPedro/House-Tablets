const express = require('express')
const router = express.Router();
const {pool} =  require("../database/db");
const jwt = require("jwt-simple");
const TokenSecretPassword = process.env.TOKEN_SECRET;

// GET /private route
router.get("/", (req, res) => {
	console.log("hit private route");
	let passedToken = jwt.decode(req.headers['x-auth'], TokenSecretPassword)
	res.json(passedToken)
})

//GET /private/roster
router.get("/roster", (req, res) => {
	console.log("hit private route");
	let decodedToken = jwt.decode(req.headers['x-auth'], TokenSecretPassword)
	console.log(decodedToken)
	let name = decodedToken.username
	pool.query(`
	SELECT name FROM users WHERE name = $1`, [name, ])
	.then(response => { //user found
		console.log("rows:")
		console.log(response.rows)
		if (response.rows.length === 0) {
			// username doesn't exist
			return res.status(401).send();
		}
	}).catch( error => {//user not found
		console.log("insertion error")
		res.status(500).send()
	})
	res.json(decodedToken)
})

module.exports = router;
