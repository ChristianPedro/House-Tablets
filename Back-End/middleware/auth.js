const express = require('express')
const router = express.Router();
const {pool} =  require("../database/db");
const jwt = require("jwt-simple");
const TokenSecretPassword = process.env.TOKEN_SECRET;

router.use((req, res, next) => {
  try {
    if (req.headers['x-auth'] === ""){
      return res.redirect('/login.html');
    }
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
        console.log("user doesnt exist");
        return res.redirect('/login.html');
      }
    }).catch( error => {//user not found
      console.log("insertion error")
      return res.redirect('/login.html');
    })
    next();
  } catch (error) {
    console.log("Signature verification failed in JWT middleware")
    return res.redirect('/login.html')
  }
  
});

module.exports = router;
