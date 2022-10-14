const mongo = require('mongoose');

module.exports = mongo.model(
    'pingchecks',
    new mongo.Schema({
        ping: Number,
        user: Number
    })
)
