const roleModel = require('./model');
const get = require('lodash/get');
async function create(req, res) {
    try {
        console.log(req.body);
        console.log('Role Deatail is', get(req, 'body', ''));
        let roleDetail = new roleModel();
        roleDetail.name = get(req, 'body.name', '');
        roleDetail.permissionRefId= get(req,'body.permissionRefId','');
        console.log('Before Save Successfully.',roleDetail);
        await roleDetail.save();
        console.log('Document Save Successfully.');
        return {
            status: 200,
            message: 'Document Save Successfully.'
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'+error
        }
    }

}

async function getRecord(req, res) {
    try {
        console.log('GET REcord.....',req.query.id);
        if(req.query.id){
            console.log(req.query.id);
            let record = await roleModel.findOne({ _id: req.query.id }).exec() ;
            if (!record) {
                return Promise.reject('Record Not Found.');
            }
            res.status(200).json({ doc: record, message: 'Success' });
            return {
                status: 200,
                message: 'Success.',
            }
        }
        else{
            console.log('Else Block........');
            let record = await roleModel.find().exec() ;
            if (!record) {
                return Promise.reject('Record Not Found.');
            }
            res.status(200).json({ doc: record, message: 'Success' }); 
            return {
                status: 200,
                message: 'Success.',
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}
async function update(req, res) {
    try {
        console.log(' Record TO Edit.', req.body, 'Id is',req.query.id);
        let record = await roleModel.findOneAndUpdate({ '_id': req.query.id }, req.body).exec();
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        return {
            status: 200,
            message: 'Document Update Successful.'
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Inernal Server Error.'+error
        }
    }
}
async function deleteRecord(req, res) {
    try {
        console.log('delete Record.',req.query.id);
        let record = await roleModel.findById({ '_id': req.query.id });
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        record.isDeleteFlag = true;
        await record.save();
        console.log('Document Delete Successful.');
        return {
            status: 200,
            message: 'Document Delete Successful.'
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}
module.exports = {
    create,
    getRecord,
    update,
    deleteRecord
}