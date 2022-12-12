const { Router } = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../models/users.model');

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userPresent = await UserModel.findOne({ email });
        if (userPresent?.email) {
            res.send(400).send({ 'msg': 'user already existed, Please login to proceed' });
        }
        else {
            bcrypt.hash(password, 8, async function (err, hash) {
                await UserModel.create({ email, password: hash });
                res.status(200).send({ 'msg': 'user signed in successfully' });
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ 'err': 'something went wrong' });
    }

});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user?.email) {
            const hashed_password = user.password;

            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY);
                    res.status(200).send({ 'msg': 'User has been logged in', 'token': token });
                }
                else {
                    res.status(404).send({ 'err': 'invalid password' });
                }
            })
        }
        else {
            res.status(404).send({ 'err': 'invalid email' });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }

});

module.exports = userRoute;