const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var permission = new Schema({
    name: String,
    url: String,
<<<<<<< HEAD
    hasChild: {
=======
    isChild: {
>>>>>>> ce719aad3a90fc4131fea12c892bf2712f8cd4de
        type: Boolean,
        default: false
    },
    childName: [{
        name: String,
        url: String,
<<<<<<< HEAD
        hasSubChild: {
=======
        isSubChild: {
>>>>>>> ce719aad3a90fc4131fea12c892bf2712f8cd4de
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