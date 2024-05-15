const { Router } = require('express');
const router = Router();

const {getProducts, postUsers, postProducts } = require('../controllers/index.controller');

router.post('/users', postUsers);

router.get('/products', getProducts);

router.post('/products2', postProducts)

module.exports = router;