const userModel = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const get = require('lodash/get');
const { has } = require('lodash');
const secretkey=require('../../../default.json').myprivatekey;

async function create(req, res) {
    try {
        console.log('User Deatil.',req.body);
        let userData = new userModel();
        userData.name =req.body.name;
        userData.email =req.body.email;
        userData.roleRef=req.body.roleRef;
        userData.phoneNo =req.body.phoneNo;
        userData.image = req.file.filename;
        let hash = bcrypt.hashSync(req.body.password, 10);
        userData.password = hash;
        console.log('Details=>',userData);
        let response = await userModel.findOne({ email: userData.email }).exec();
        if (response) {
            return res.send('Email Already Present.');
        }
        await userData.save().exec();
        return {
            status: 200,
            message: 'Document Save Successfull.'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}

async function getRecord(req,res){
try{
    console.log('Request Id',req.query.id)
    if(req.query.id){
        const record=await userModel.findById(req.query.id);
        if(!record){
            return Promise.reject('Record Not Found..');
        }
        res.status(200).json({ doc: record, message: 'Success' });
        return {
            status: 200,
            message: 'Success.',
        }
    }
    else{
        console.log('Within Else Block.....');
        const record=await userModel.find().exec();
        if(!record){
            return Promise.reject('Record Not Found..');
        }
        res.status(200).json({ doc: record, message: 'Success' });
        return {
            status: 200,
            message: 'Success.',
        }
    }

}
catch(error){
    return{
        status:500,
        message:'Internal Server Error.'
    }
}
}

async function update(req, res) {
    try {
        console.log(' Record TO Edit.', req.body, 'Id is',req.query.id);
        let hash = bcrypt.hashSync(req.body.password, 10);
        let record = await userModel.updateOne({ "_id": req.query.id}, 
                                                { $set: { 
                                                "phoneNo":req.body.phoneNo,
                                                "password":hash,
                                                "roleRef":req.body.roleRef,
                                                "image": req.file.filename}});
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
        let record = await userModel.findById({ '_id': req.query.id });
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        record.isActive = false;
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

async function deleteAll(req, res) {
    try {
        await userModel.deleteMany({ });
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

async  function updateStatus(req,res)
{
    try{
        console.log(' Record TO Edit.', req.body, 'Id is',req.query.id);
        let record = await userModel.findOneAndUpdate({ '_id': req.query.id }, req.body).exec();
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        return {
            status: 200,
            message: 'Document Update Successful.'
        }
    }
    catch(error){
        return{
            status: 500,
            message: 'Internal Server Error.'  
        }
    }
}

async function checkAdminLogin(req,res){
    try{
        console.log('Check Login ...',req.body);
        let record =await userModel.findOne({'email':req.body.email});
        if(!record){
            return Promise.reject('Email Not Found.');
        }
        console.log('Record==>',record);
        let hash = bcrypt.hashSync(req.body.password, 10);
        console.log('pass==>',hash);
        let result = await bcrypt.compare(req.body.password, record.password);
        console.log('Result===>',result);
        if (!result) {
            throw new Error('Invalid Password');
        }

        let payload = { subject: record.email ,role:record.roleRef};
        console.log('Payoad...',payload);
        let token = jwt.sign(payload, secretkey);
        console.log('Tolen::',token);
        res.status(200).json({ status: 'success', message: 'success', doc: token });

        return {
            status: 200,
            message: 'Login Successful.'
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
    getRecord,
    update,
    deleteRecord,
    deleteAll,
    checkAdminLogin,
    updateStatus
}