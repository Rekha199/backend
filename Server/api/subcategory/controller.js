const subcategoryModel=require('./model');

async function create(req, res) {
    try {
        console.log('within create', req.body,'filename',req.file.filename);
        const subcategoryData = new subcategoryModel();
        subcategoryData.subCategoryName = req.body.subCategoryName;
        subcategoryData.categoryId = req.body.categoryId;
        subcategoryData.image = req.file.filename;
        await subcategoryData.save();
        return {
            status: 200,
            message: 'Document Save Successfully.'
        }
    }
    catch {
        return {
            status: 500,
            message: 'Internal Server Error.' + error
        }
    }
}
async function get(req, res) {
    console.log('Get all subcategory', req.query.id);
    try {
        if (req.query.id) {
            let response = await (await subcategoryModel.findById(req.query.id)).populate('categoryId','_id categoryName');
            if (!response) {
                return Promise.reject('Record Not Found..')
            }
            res.status(200).json({ doc: response, message: 'Success' });
            return {
                status: 200,
                message: 'Success.',
            }

        }
        else {
            console.log('Else Block........');
            let record = await subcategoryModel.find().populate('categoryId','_id categoryName').exec();
            if (!record) {
                return Promise.reject('Record Not Found.');
            }
            res.status(200).json({ doc: record, message: 'Success' });
            return {
                status: 200,
                message: 'Success.',
            }
        }
    }
    catch {
        return {
            status: 500,
            message: 'Internal Server Error' + error
        }
    }
}
async function put(req, res) {
    try {
        console.log('Update subcategory', req.query.id);
        var subcategoryData={};
        subcategoryData.subCategoryName=req.body.subCategoryName;
        subcategoryData.categoryId=req.body.categoryId;
        subcategoryData.image=req.file.filename;
        let record = await subcategoryModel.findOneAndUpdate({ '_id': req.query.id },subcategoryData).exec();
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        return {
            status: 200,
            message: 'Document Update Successful.'
        }

    }
    catch {
        return {
            status: 500,
            message: 'Internal Server Error' + error
        }
    }
}
async  function updateStatus(req,res)
{
    try{
        console.log(' Record TO Edit.', req.body, 'Id is',req.query.id);
        let record = await subcategoryModel.findOneAndUpdate({ '_id': req.query.id }, req.body).exec();
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        return {
            status: 200,
            message: 'Document Status Update Successful.'
        }
    }
    catch(error){
        return{
            status: 500,
            message: 'Internal Server Error.'  
        }
    }
}

module.exports = {
    create,
    get,
    put,
    updateStatus
}