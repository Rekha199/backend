const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var role = new Schema({
    name: String,
    permissiondetails:[{
        id:String,

        label:String,

        view_permission:{
            type:Boolean,
            default:false
        },
        add_permission:{
            type:Boolean,
            default:false
        },
        edit_permission:{
            type:Boolean,
            default:false
        }
    },
    
],

    createdDate: String,
    isActive:{
        type:Boolean,
        default:true
    }

});

module.exports = mongoose.model('role', role);