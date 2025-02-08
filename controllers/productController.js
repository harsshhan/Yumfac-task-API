const { connectDB } = require('../config/db');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addProductDetail = async (req, res) => {
    try {
        const license_no = req.params.id;
        const db = await connectDB();
        const productsCollection = db.collection('products');
        
        const {
            inStockStatus,
            foodPreference,
            productName,
            description,
            servingInformation,
            note,
        } = req.body;

        const product = {
            fssai_license_no: license_no,  
            inStockStatus: inStockStatus === 'true',
            foodPreference,
            productName,
            description,
            servingInformation,
            note,
            createdAt: new Date(),
        };


        const result = await productsCollection.insertOne(product);

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: result,  
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding product',
            error: error.message,
        });
    }
};


const getProductDetails = async (req, res) => {
    try {
        const license_no = req.params.id; 
        const db = await connectDB();
        const productsCollection = db.collection('products');

        // Fetch all products related to the given license_no
        const products = await productsCollection.find({ fssai_license_no: license_no }).toArray();
        console.log(products)
        if (!products.length) {
            return res.status(404).json({
                success: false,
                message: 'No products found for this license number',
            });
        }

        res.status(200).send(products)

    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product details',
            error: error.message,
        });
    }
};

module.exports = { addProductDetail, upload, getProductDetails };