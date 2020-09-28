const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
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
role.plugin(timestamps);
module.exports = mongoose.model('role', role);