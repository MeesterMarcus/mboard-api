require('mongoose');
var Board = require('../schemas/board.schema');

exports.createBoard = createBoard;

async function createBoard(boardId) {

    // a document instance
    var board = new Board({ boardId: boardId, columns: []});

    // save model to database
    board.save(function (err, board) {
        if (err) return console.error(err);
        console.log(board.boardId + " saved to mboards collection.");
    });

}