const router=require('express').Router();
const controller=require('./controller');
const fileUpload = require('../../helper').fileUpload;
const authService = require('../../helper').authService;

async function post(req,res){
    console.log('Post');
    let response=await controller.create(req,res);
    res.status(200).json({message:response.message});
}
async function get(req,res){
    console.log('Get')
    let response=await controller.getRecord(req,res);
    res.status(200).json({message:response.message});
}


async function put(req, res) {
    console.log('Put');
    let response = await controller.update(req,res);
    res.status(response.status).json({ message: response.message });
}

async function put2(req, res) {
    console.log('Put2');
    let response = await controller.updateStatus(req,res);
    res.status(response.status).json({ message: response.message });
}

async function deleteRecord(req, res) {
    console.log('Delete.');
    let response = await controller.deleteRecord(req, res);
    res.status(response.status).json({ message: response.message });
}
async function adminlogin(req,res) {
    console.log('Login...');
    let response = await controller.checkAdminLogin(req,res);
    res.status(response.status).json({message: response.message});
}




router.post('/', fileUpload.single('image'), post);
router.get('/?', get);
router.post('/login',adminlogin);
router.put('/?', fileUpload.single('image'), put);
router.put('/status/?',put2);
router.get('/?', authService, get);
router.delete('/?', deleteRecord);


module.exports=router;