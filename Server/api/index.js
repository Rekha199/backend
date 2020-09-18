const router = require('express').Router();
const user = require('./user');
const role = require('./role');
const permission = require('./permission');


router.use('/user', user.route);
router.use('/role', role.route);
router.use('/permission', permission.route);


// router.use('/login', user.route);



module.exports = router;