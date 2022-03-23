var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var board = new Schema({
    boardId: String,
    columns: [
        {
            id: String,
            name: String,
            tasks: [
                {
                    id: String,
                    title: String,
                    description: String,
                    severity: Number,
                    client: String,
                    status: { 
                        columnId: String, 
                        statusName: String
                    }
                }
            ]
        }
    ],
});

module.exports = mongoose.model('board', board, 'mboards');