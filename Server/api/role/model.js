const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var role = new Schema({
    name: String,
    permissionRefId:[{
        permissionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"permission"
        } ,
        isView:{
            type:Boolean,
            default:false
        },
        isEdit:{
            type:Boolean,
            default:false
        },
        isAdd:{
            type:Boolean,
            default:false
        }
    },
    
],
    isDeleteFlag:{
        type:Boolean,
        default:false
    }

});
role.plugin(timestamps);
module.exports = mongoose.model('role', role);