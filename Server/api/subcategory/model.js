const mongoose=require('mongoose')

const subcategorySchema=new mongoose.Schema({
    subCategoryName:String,
    image:String,
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
        
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model('subcategory',subcategorySchema);