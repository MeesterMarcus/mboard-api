require('mongoose');
var Board = require('../schemas/board.schema');

exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.insertColumn = insertColumn;
exports.insertTask = insertTask;

async function createBoard(boardId) {
    console.log("createBoard boardId:", boardId);
    // a document instance
    var board = new Board({ boardId: boardId, columns: [] });

    // save model to database
    board.save(function (err, board) {
        if (err) return console.error(err);
        console.log(board.boardId + " saved to mboards collection.");
    });

}

async function getBoard(boardId) {
    console.log(boardId);
    return Board.findOne({ boardId: boardId });

}

async function insertColumn(boardId, column) {
    Board.findOneAndUpdate(
        { boardId: boardId },
        { $push: { 'columns': column } },
        (res) => {
            console.log(res);
        }
    );
}

async function insertTask(boardId, columnId, task) {
    Board.findOneAndUpdate(
        { 
            boardId: boardId,
            "columns.id": columnId
        },
        {
            $push: {
                "columns.$.tasks": task
            }
        },
        (res) => {
            console.log(res);
        }
    );
}