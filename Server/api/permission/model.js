const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var permission = new Schema({
    name: String,
});

module.exports = mongoose.model('permission', permission);