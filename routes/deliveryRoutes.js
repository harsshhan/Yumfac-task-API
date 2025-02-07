const express = require('express')
const addDeliveryData = require('../controllers/deliveryController')
const router = express.Router();

router.post('/:id',addDeliveryData)

module.exports = router;