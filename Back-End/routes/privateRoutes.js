const express = require('express')
const router = express.Router();
const {pool} =  require("../database/db");
const jwt = require("jwt-simple");
const TokenSecretPassword = process.env.TOKEN_SECRET;

// GET /private route
//Meant for testing of jwt tokens and the private routes -- DEPRICATED
// router.get("/", (req, res) => {
// 	console.log("hit private route");
// 	let passedToken = jwt.decode(req.headers['x-auth'], TokenSecretPassword)
// 	res.json(passedToken)
// })

//GET /private/roster
router.get("/roster", (req, res) => {
	//get active roster
	try {
		pool.query(`
			SELECT name, nickname, position, year, pledgeclass FROM users`)
			.then(response => { //user found
			console.log("rows:")
			console.log(response.rows)
			if (response.rows.length === 0) {
				// username doesn't exist
				console.log("Roster is empty");
				return res.status(201).json(response.rows);
			}
			return res.status(200).json(response.rows);
			}).catch( error => {//user not found
			console.log("error getting users in roster")
			return res.status(400).json({error: "error gettings members from roster"});
		})
		
	} catch (error) {
		console.log(`there was an error on the roster route: ${error}`)
		res.status(500).json({error: "unexpected problem getting members from roster"});	
	}
})

//GET /private/details
router.get("/details", (req, res) => {
	//get current details
	try {
		pool.query(`
			SELECT name, multiplier FROM users`)
			.then(response => { //user found
			console.log("rows:")
			console.log(response.rows)
			if (response.rows.length === 0) {
				// username doesn't exist
				console.log("details roster is empty");
				return res.status(201).json(response.rows);
			}
			let returnable = filterDetails(response.rows, 6)
			console.log(returnable)
			return res.status(200).json(returnable);
			}).catch( error => {//user not found
			console.log("error getting users in roster for details")
			console.log(error)
			return res.status(400).json({error: "error gettings members from roster for details"});
		})
		
	} catch (error) {
		console.log(`there was an error on the roster route: ${error}`)
		res.status(500).json({error: "unexpected problem getting members from roster for details"});	
	}
})

//GET /private/stations
router.get("/stations", (req, res) => {
	//get current stations
	try {
		pool.query(`
			SELECT name, multiplier FROM users`)
			.then(response => { //user found
			console.log("rows:")
			console.log(response.rows)
			if (response.rows.length === 0) {
				// username doesn't exist
				console.log("stations roster is empty");
				return res.status(201).json(response.rows);
			}
			let returnable = filterDetails(response.rows, 5)
			console.log(returnable)
			return res.status(200).json(returnable);
			}).catch( error => {//user not found
			console.log("error getting users in roster for stations")
			return res.status(400).json({error: "error gettings members from roster for stations"});
		})
		
	} catch (error) {
		console.log(`there was an error on the roster route: ${error}`)
		res.status(500).json({error: "unexpected problem getting members from roster for stations"});	
	}
})


function filterDetails(rows, numberOfDetails) {
	let returnable = []
	if (rows.length < numberOfDetails){
		for (let index = 0; index < rows.length; index++) {
			returnable.push({"pair1": rows[index].name})
			
		}
	} else {
		let numberOfDoubles = rows.length % numberOfDetails
		for (let index = 0; index < rows.length; index++) {
			if (numberOfDoubles > 0 && index < numberOfDetails*2){
				returnable.push({"pair1": rows[index].name, "pair2": rows[index+1].name})
				index++
				numberOfDoubles--
				continue
			}
			returnable.push({"pair1": rows[index].name})
			
		}
	}
	return returnable
}
module.exports = router;
