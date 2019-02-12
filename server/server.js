const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = require('./users/userController');
const secret = process.env.SERVER_SECRET;

const server = express();

server.use(cors({
    origin: ['http://localhost:3000'], credentials: true
}));

server.use(express.json());

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            req.jwtPayload = decodedToken;
            if (err) {
                return res.status(401).json({ errorMessage: "Please Sign In" })
            }

            next();
        })
    } 
    else {
        res.status(401).json({ errorMessage: "Please Sign In" });
    }
}

server.get('/', (req, res) => {
    res.status(200).json({ api: "running..." });
})

server.use('/user', userController);

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbActivities', {}, (error) => {
    if (error) console.log(error);
    console.log("Mongoose connected us to our DB");
})

server.listen(port, () => {
    console.log(`\n=== API running on http:localhost:${port} ===\n`);
})
