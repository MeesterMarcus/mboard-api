var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var board = new Schema({
    boardId: String,
    columns: Array,
});

module.exports = mongoose.model('board', board, 'mboards');