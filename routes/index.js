var express = require('express');
var router = express.Router();
const cors = require("cors");
const { createBoard } = require('../factories/board.factory');
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({success: "The app is running!"});
});

router.post('/board', function(req,res,next) {
  console.log(req.body);
  createBoard(req.body.id);
  res.json({success: "You are successfully calling /board"});
});

router.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
