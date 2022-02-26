const express = require('express')
const router = express.Router();
const {pool} =  require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const TokenSecretPassword = process.env.TOKEN_SECRET;



// GET /auto/login route
router.get("/create-user", (req, res) => {
	let name = req.body.username;
	let password = req.body.password;
	let nickname = req.body.nickname;
	let phoneNumber = req.body.phonenumber;
	let position = req.body.position;
	let year = req.body.year;
	let multiplier = req.body.multiplier;
	let venmo = req.body.venmo;
	let pledgeclass = req.body.pledgeclass;
	console.log(typeof name);
	try {
		//if username and password is found in body and all values is of type string
		if (name && password && nickname && phoneNumber && position && year && multiplier && venmo && pledgeclass
			&& typeof name == 'string' && typeof password == 'string' && typeof phoneNumber == 'string' && 
			typeof position == 'string' && typeof year == 'string' && typeof multiplier == 'string' && typeof venmo == 'string'
			&& typeof pledgeclass == 'string'){
			//Hash password
			let hashedPassword = bcrypt.hashSync(password, 10);
			
			console.log(`name: ${name}, password: ${password}, | password: ${hashedPassword} 
			phoneNumber: ${phoneNumber} position: ${position} year: ${year} multiplier: ${multiplier} 
			venmo: ${venmo} pledgeclass: ${pledgeclass}`)
			
			//trim spaces off text
			let name = name.tostring().trim(); //spaces arent the problem

			//insert into user: name, nickname, phonenumber, position, year, pultiplier, venmo, pledgeclass, password
			pool.query(`
			INSERT INTO users (name, nickname, phonenumber, position, year, multiplier, venmo, pledgeclass, password)
			VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
			returning *`, [name, nickname, phoneNumber, position, year, multiplier, venmo, pledgeclass, hashedPassword]).then(response => {
				console.log("rows:")
				console.log(response.rows)
			}).catch( error => {//Error inserting
				console.log("insertion error")
				res.status(500).send()
			})
			return res.send("auth successful");
			
		}
		else {
			//if username and password is not found in body
			console.log(`username: ${username}, password: ${password}`)
			return res.status(401).send("auth failed");
		}

	} catch (error) {
		console.log(error);
		return res.status(400).send("server error");
	}
})

// GET /auth/login route
router.get("/login", (req, res) => {
	try {
		let name = req.body.username;
		let password = req.body.password;
		
		//if username and password is found in body and all values is of type string
		if (name && password && typeof name == 'string' && typeof password == 'string'){
			//Hash password

			console.log(`name: ${name}, password: ${password}`)
			
			//check if user is in database by verifying hashed password is stored
			pool.query(`
			SELECT password FROM users WHERE name = $1`, [name,]).then(response => {
				if (response.rows.length === 0) {
					// username doesn't exist
					return res.status(401).send();
				}
				let hashedPassword = response.rows[0].password;

				bcrypt
					.compare(password, hashedPassword)
					
					.then(function (isSame) {
						if (isSame) {
							// password matched
							console.log("password matched")
							let tokenJWT = jwt.encode({ username: name}, TokenSecretPassword);
							res.status(200).json( {token: tokenJWT});
							console.log(`token: ${tokenJWT}`)
						} else {
							// password didn't match
							console.log("password didnt match")
							res.status(401).send();
						}
					})
					.catch(error => { //Encryotion comparison error
						console.log(error);
						res.status(500).send(); // server error
					});
				}).catch(error => { //Database error
					console.log(error);
					console.log("database error")
					res.status(500).send(); // server error
			});	
		}
		else {
			//if username and password is not found in body
			return res.status(401).send("auth failed");
		}

	} catch (error) {
		//Unexpected error
		console.log(`error: ${error}`);
		return res.status(400).send("server error");
	}
})

module.exports = router;
