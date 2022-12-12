const { Router } = require('express');

const TodoModel = require('../models/todos.model');

const todoRoute = Router();

todoRoute.get('/', async (req, res) => {
    const params = req.query.params;

    try {
        const todos = await TodoModel.find(params);
        res.status(200).send(todos);
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ 'err': 'something went wrong when fetching the data!' });
    }
});

todoRoute.get('/:todoId', async (req, res) => {
    const id = req.params.todoId;

    try {
        const todo = await TodoModel.findById(id);
        res.status(200).send(todo);
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ 'err': 'something went wrong' });
    }
});

todoRoute.post('/create', async (req, res) => {
    const data = req.body;

    try {
        await TodoModel.create(data);
        res.status(200).send({ 'msg': 'todo has been added' });
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ 'err': 'something went wrong' });
    }
});

todoRoute.patch('/edit/:id', async (req, res) => {
    const data = req.body;
    const userID = req.body.userID;
    const id = req.query.params;

    try {
        const todo = await TodoModel.findById(id);
        if (todo.userID !== userID) {
            res.status(404).send({ 'err': 'not authorized' });
        }
        else {
            await TodoModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).send({ 'msg': 'todo has been modified' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ 'err': 'something went wrong' })
    }
});

todoRoute.delete('/delete/:id', async (req, res) => {
    const userID = req.body.userID;
    const id = req.query.params;

    try {
        const todo = await TodoModel.findById(id);
        if (todo.userID !== userID) {
            res.status(404).send({ 'err': 'not authorized' });
        }
        else {
            await TodoModel.findByIdAndDelete({ _id: id });
            res.status(200).send({ 'msg': 'todo has been deleted!' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ 'err': 'something went wrong' })
    }
});



module.exports = todoRoute;