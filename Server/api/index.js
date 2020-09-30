const router = require('express').Router();
const user = require('./user');
const role = require('./role');
const permission = require('./permission');
const brand =require('./brand');
const category =require('./category');
const subcategory =require('./subcategory');
const subsubcategory =require('./subsubcategory');





router.use('/user', user.route);
router.use('/role', role.route);
router.use('/permission', permission.route);
router.use('/brand', brand.route);
router.use('/category', category.route);
router.use('/subcategory', subcategory.route);
router.use('/subsubcategory', subsubcategory.route);



// router.use('/login', user.route);



module.exports = router;