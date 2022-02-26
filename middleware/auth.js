const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
  console.log('aye your authed dog');
  console.log(req.headers["x-auth"])
//   req.baseUrl
  next();
});

module.exports = router;
