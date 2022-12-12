const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    taskname: { type: String, required: true },
    status: { type: Boolean, default: false },
    tags: [],
    userID: { type: String }
}, {
    versionKey: false
});

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;