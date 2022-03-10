var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({success: "The app is running!"});
});

router.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
