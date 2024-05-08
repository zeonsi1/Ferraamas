const { Router } = require('express');
const router = Router();

const {getProducts, postUsers, postDivisa } = require('../controllers/index.controller');

router.post('/users', postUsers);

router.get('/products', getProducts);

router.post('/divisa', postDivisa)

module.exports = router;