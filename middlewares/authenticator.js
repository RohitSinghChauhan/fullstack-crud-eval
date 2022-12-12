require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticator = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (decoded) {
            const userID = decoded.userID;
            req.body.userID = userID;
            next();
        } else if (err) {
            res.send({ 'err': 'authorization failed' });
        }
    })
};

module.exports = authenticator;