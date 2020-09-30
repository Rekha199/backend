const categoryModel=require('./model');

async function create(req, res) {
    try {
        console.log('within create', req.body,'filename',req.file.filename);
        const categoryData = new categoryModel();
        categoryData.categoryName = req.body.categoryName;
        categoryData.image = req.file.filename;
        await categoryData.save();
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
    console.log('Get all category', req.query.id);
    try {
        if (req.query.id) {
            let response = await categoryModel.findById(req.query.id);
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
            let record = await categoryModel.find().exec();
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
        console.log('Update category', req.query.id);
        var categoryData={};
        categoryData.categoryName=req.body.categoryName;
        categoryData.image=req.file.filename;
        let record = await categoryModel.findOneAndUpdate({ '_id': req.query.id },categoryData).exec();
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
        let record = await categoryModel.findOneAndUpdate({ '_id': req.query.id }, req.body).exec();
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