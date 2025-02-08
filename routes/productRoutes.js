const express = require('express');

const {upload,addProductDetail} = require('../controllers/productController')
const router = express.Router();

router.get('/')
router.post('/:id',upload.single('productImage'),addProductDetail)

module.exports = router;