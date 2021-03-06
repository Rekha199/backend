const permissionModel = require('./model');

async function create(req, res) {
    try {
        console.log(req.body);
        console.log('req.query.id', req.query.id);
        if (!req.query.id) {
            let permissionDetail = new permissionModel();
            permissionDetail.name = req.body.name;
            permissionDetail.url = req.body.url;
            if (req.body.hasChild) {
                permissionDetail.hasChild = req.body.hasChild;
                permissionDetail.childName = req.body.childName;
                console.log('Child......', req.body.childName);
                req.body.childName.forEach(element => {
                    if (element.hasSubChild) {
                        permissionDetail.childName.subChildName = element.subChildName;
                    }
                });
            }
            console.log('Before Save Successfully.', permissionDetail);

            await permissionDetail.save();
            console.log('Document Save Successfully.');
            return {
                status: 200,
                message: 'Document Save Successfully.'
            }
        }
        else {
            let record = await permissionModel.findOneAndUpdate({ '_id': req.query.id }, req.body).exec();
            if (!record) {
                return Promise.reject('Record Not Found..');
            }
            return {
                status: 200,
                doc: record,
                message: 'Document Update Successfully.'
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.' + error
        }
    }

}

async function getRecord(req, res) {
    try {
        console.log('Get prmossion record..');
        let record = await permissionModel.find().exec();
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        res.status(200).json({ doc: record, message: 'Success' });
        return {
            status: 200,
            message: 'Success.',
        }
    }
    catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}

async function deleteAll(req, res) {
    try {
        await permissionModel.deleteMany({ });
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
    getRecord,
    create,
    deleteAll
}