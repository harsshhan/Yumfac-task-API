const { connectDB } = require('../config/db')
const multer = require('multer')
const axios = require('axios')

const getShop = async (req, res) => {
    try {
        const db = await connectDB();
        const { license_no } = req.query;
        if (!license_no) {
            return res.status(400).json({ message: "FSSAI license number is required" });
        }

        const shop = await db.collection('Shops').findOne({ fssai_license_no: license_no });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        res.json(shop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addShopImage = async (req, res) => {
    try {
        const db = await connectDB();
        const shopsCollection = db.collection('Shops')
        const { license_no } = req.params.id;
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }


        const base64Image = req.file.buffer.toString('base64');

        const formData = new URLSearchParams();
        formData.append('image', base64Image);

        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            formData.toString(), 
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const imageUrl = response.data.data.url;

        
        const result = await shopsCollection.updateOne(
            { license_no }, 
            { $set: { image_url: imageUrl } } 
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.status(200).json({ message: 'Image uploaded successfully', image_url: imageUrl });

    } catch (error) {
        console.error('Error uploading image:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data?.error?.message || 'Server error' });
    }
};
module.exports = { addShopImage, getShop, upload };

