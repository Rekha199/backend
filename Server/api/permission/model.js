const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var permission = new Schema({
    name: String,
    url: String,
    isChild: {
        type: Boolean,
        default: false
    },
    childName: [{
        name: String,
        url: String,
        isSubChild: {
            type: Boolean,
            default: false
        },
        subChildName: [{
            name: String,
            url: String
        }]
    }],
});

module.exports = mongoose.model('permission', permission);