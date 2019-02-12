const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./userModel');
const secret = process.env.SERVER_SECRET;

