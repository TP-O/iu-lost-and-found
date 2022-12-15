const mongoose = require('mongoose');

const schema = mongoose.Schema
const ObjectId = schema.ObjectId;

const Account = new schema({
    username: { type: String },
    password: { type: String },
})

module.exports = mongoose.model('Account', Account);