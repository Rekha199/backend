const router = require('express').Router();
const controller = require('./controller');
const fileUpload = require('../../helper').fileUpload;

async function post(req, res) {
    console.log('Post subCategory.');
    let response = await controller.create(req, res);
    res.status(response.status).json({ message: response.message });
}
async function get(req, res) {
    console.log('Get subCategory');
    let response = await controller.get(req, res);
    res.status(response.status).json({ message: response.message });
}
async function put(req, res) {
    console.log('Put subCategory');
    let response = await controller.put(req, res);
    res.status(response.status).json({ message: response.message });
}
async function updateStatus(req, res) {
    console.log('Within update status');
    let response = await controller.updateStatus(req, res);
    res.status(response.status).json({ message: response.message });
}

router.post('/', fileUpload.single('image'), post);
router.get('/?', get);
router.put('/?', fileUpload.single('image'), put);
router.put('/status/?', updateStatus);

module.exports = router