const Database = require('../database');

const client = new Database();
const db = client.db('users');


module.exports = db