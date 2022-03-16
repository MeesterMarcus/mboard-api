require('mongoose');
var Board = require('../schemas/board.schema');

exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.insertColumn = insertColumn;

async function createBoard(boardId) {

    // a document instance
    var board = new Board({ boardId: boardId, columns: []});

    // save model to database
    board.save(function (err, board) {
        if (err) return console.error(err);
        console.log(board.boardId + " saved to mboards collection.");
    });

}

async function getBoard(boardId) {
    console.log(boardId);
    return Board.findOne({boardId: boardId});

}

async function insertColumn(boardId, column) {
    Board.findOneAndUpdate(
        {boardId: boardId},
        {$push: {'columns': column}},
        (res) => {
            console.log(res);
        }
    );
}