const { Router } = require('express');
const router = Router();

const {getProducts, postUsers } = require('../controllers/index.controller');

router.post('/users', postUsers);

router.get('/products', getProducts);

module.exports = router;