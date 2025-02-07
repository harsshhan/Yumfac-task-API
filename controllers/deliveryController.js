const { connectDB } = require('../config/db')

const addDeliveryData = async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('delivery_details')
        const license_no = req.params.id;

        const {
            deliveryTime,
            deliveryRadius,
            freeDeliveryRadius,
            orderValueGreaterOrEqual500,
            orderValueLess500
        } = req.body;
        if (
            deliveryTime == null ||
            deliveryRadius == null ||
            freeDeliveryRadius == null ||
            orderValueGreaterOrEqual500 == null ||
            orderValueLess500 == null
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const result = await collection.updateOne(
            { fssai_license_no: license_no }, 
            { 
                $set: {
                    deliveryTime,
                    deliveryRadius,
                    freeDeliveryRadius,
                    "orderValueRanges.OV ≥ 500": orderValueGreaterOrEqual500,
                    "orderValueRanges.OV < 500": orderValueLess500
                }
            },
            { upsert: true } 
        );
        
        res.status(200).json({
            success: true,
            message: 'Package settings updated successfully',
            data: result
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = addDeliveryData