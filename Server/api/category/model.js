const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    categoryName:String,
    image:String,
    isActive:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model('category',categorySchema);