const router = require('express').Router();
const controller = require('./controller');

async function post(req, res) {
    console.log('post');
    let response = await controller.create(req, res);
    res.status(response.status).json({ message: response.message });
}
async function get(req, res) {
    console.log('Get');
    let response = await controller.getRecord(req, res);
    res.status(response.status).json({ message: response.message });
}

async function deleteAll(req,res){
    let response = await controller.deleteAll(req,res);
    res.status(response.status).json({ message: response.message });
}

router.post('/?', post);
router.get('/', get);
router.delete('/dall', deleteAll);


module.exports = router;