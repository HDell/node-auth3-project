const express = require('express');
const session = require('express-session');
const server = express();
const entryRouter = require('./routes/entry.js');
const usersRouter = require('./routes/users.js');
const restricted = require('./auth/restricted.js');
/*const sessionConfig = {
    name: 'savedInfo',
    secret: 'to be moved to environment variable in production',
    cookie: {
        maxAge: 1000 * 30,
        secure: false, //does not need https -> but true in production, so needs https
        httpOnly: true //cookie cannot be accessed by js online
    },
    resave: false, //do we want to recreate a session even if it hasn't changed?
    saveUninitialized: false // GDPR compliance laws make use defauly to false (only true once user has opted in to us automatically saving cookies on their browser)
}*/
// server.use(session(sessionConfig));
server.use(express.json());
server.use('/api/', entryRouter); //generates/signs token
server.use('/api/users', restricted, usersRouter); //verifies token
module.exports = server;