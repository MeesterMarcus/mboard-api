var express = require('express');
var router = express.Router();
const cors = require("cors");
const { createBoard, insertColumn, getBoard } = require('../factories/board.factory');
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({success: "The app is running!"});
});

router.post('/board', function(req,res,next) {
  console.log(req.body);
  createBoard(req.body.id);
  res.json({success: "You are successfully calling POST /board"});
});

router.post('/board/columns', function(req,res,next) {
  console.log(req.body);
  insertColumn(req.body.boardId, req.body.column);
  res.json({success: "You are successfully calling PUT /board"});
});

router.get('/board', async function(req,res,next) {
  const result = await getBoard(req.query.boardId);
  res.json({data: result});
});

router.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
