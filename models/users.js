const knex = require('knex');
const configOptions = require('../knexfile.js').development;
const db = knex(configOptions);

module.exports = {
    find,
    findBy,
    add
};

function find() {
    return db("users");
}

function findBy(username) {
    return db("users")
        .where("username", username)
        .first();
}

function add(user) {
    return db("users")
        .insert(user);
}