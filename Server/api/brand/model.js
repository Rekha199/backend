const mongoose=require('mongoose');
var timestamps = require('mongoose-timestamp');

const BrandSchema=new mongoose.Schema({
    brandName:String,
    image:String,
    isActive: {
        type: Boolean,
        default: true
    }
})
BrandSchema.plugin(timestamps);

module.exports=mongoose.model('brand',BrandSchema);