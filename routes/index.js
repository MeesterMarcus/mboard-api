var express = require('express');
var router = express.Router();
const cors = require("cors");
const { createBoard, insertColumn, getBoard, insertTask, updateTask, removeTask } = require('../factories/board.factory');
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({success: "The app is running!"});
});

router.post('/board', async function(req,res,next) {
  const result = await createBoard(req.body.boardId);
  res.json({data: result});
});

router.post('/board/columns', function(req,res,next) {
  insertColumn(req.body.boardId, req.body.column);
  res.json({success: "You are successfully calling POST(update) /board"});
});

router.post('/board/tasks', async function(req,res,next) {
  await insertTask(req.body.boardId, req.body.columnId, req.body.task);
  res.json({success: "You are successfully calling POST /tasks"});
});

router.put('/board/tasks', async function(req,res,next) {
  console.log(req.body);
  const result = await updateTask(req.body.boardId, req.body.task);
  res.json({success: "You are successfully calling PUT /tasks"});
});

router.delete('/board/tasks', async function(req,res,next) {
  console.log(req.body);
  const result = await removeTask(req.body.boardId, req.body.task);
  res.json({success: "You are successfully calling DELETE /tasks"});
});

router.get('/board', async function(req,res,next) {
  const result = await getBoard(req.query.boardId);
  res.json({data: result});
});

router.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
