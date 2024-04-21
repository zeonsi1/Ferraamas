const { Router } = require('express');
const router = Router();

const { getUsers, getProducts } = require('../controllers/index.controller');

router.get('/users', getUsers);

router.get('/products', getProducts);

module.exports = router;