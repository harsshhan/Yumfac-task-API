const express = require('express');

const {upload,addProductDetail, getProductDetails} = require('../controllers/productController')
const router = express.Router();

router.get('/:id',getProductDetails)
router.post('/:id',upload.single('productImage'),addProductDetail)

module.exports = router;