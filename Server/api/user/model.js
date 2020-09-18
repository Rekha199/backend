const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    name: String,
    phoneNo: Number,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        pattern: '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roleRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
        
    },
    image: String,
    isActive: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('user', user);