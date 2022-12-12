const express = require('express');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT;
const connection = require('./config/db');
const userRoute = require('./routes/users.routes');
const todoRoute = require('./routes/todos.routes');
const authenticator = require('./middlewares/authenticator');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/todos', authenticator, todoRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage');
});

app.listen(PORT, async (req, res) => {
    try {
        await connection;
        console.log('Connected to DB');
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Listening at port ${PORT}`);
});