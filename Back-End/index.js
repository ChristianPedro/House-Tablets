//Variables and libraries
const express = require("express");
require('dotenv/config');
app = express();
const cors = require('cors');

//Serve static files
app.use(express.static('public'));
//allow server to read json body
app.use(express.json());
//Allow cors
app.use(cors());



//Set private middleware and routes
app.use("/private", require("./middleware/auth"));
app.use("/private", require('./routes/privateRoutes'));

//Set public routes
app.use("/auth", require("./routes/publicRoutes"));




//Server listen
app.listen(3000 || process.env.PORT );
