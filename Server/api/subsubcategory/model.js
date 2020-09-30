const mongoose=require('mongoose')

const subsubcategorySchema=new mongoose.Schema({
    subSubCategoryName:String,
    image:String,
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
        
    },
    subCategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
        
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model('subsubcategory',subsubcategorySchema);