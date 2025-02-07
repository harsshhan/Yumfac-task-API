const express = require('express')
const {getShop, upload} = require('../controllers/shopController')
const {addShopImage} = require('../controllers/shopController')

const router = express.Router();

router.get('/',getShop)
router.post('/image/:id',upload.single('image'),addShopImage)

module.exports = router;