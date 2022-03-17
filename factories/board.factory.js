require('mongoose');
var Board = require('../schemas/board.schema');

exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.insertColumn = insertColumn;
exports.insertTask = insertTask;
exports.updateTask = updateTask;
exports.removeTask = removeTask;

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

async function updateTask(boardId, task) {
    const taskId = task.id;
    Board.findOne({boardId: boardId}, (err, board) => {
        // first remove task from currrent
        board.columns.forEach(col => {
            col.tasks = col.tasks.filter(t => t.id !== taskId);
        });
        // then add to new
        board.columns.forEach(col => {
            if (col.id === task.status.columnId) {
                col.tasks.push(task);
            }
        });
        board.save((err) => {
            console.log(err);
        })
    })
}

async function removeTask(boardId, task) {
    const taskId = task.id;
    Board.findOne({boardId: boardId}, (err, board) => {
        board.columns.forEach(col => {
            col.tasks = col.tasks.filter(t => t.id !== taskId);
        });
        board.save((err) => {
            console.log(err);
        })
    })
}