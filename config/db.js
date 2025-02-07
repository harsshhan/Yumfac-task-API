require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

let db; 

async function connectDB() {
    if (!db) {  
        try {
            await client.connect();
            db = client.db("Yumfac"); 
            console.log('✅ Connected to MongoDB');
        } catch (err) {
            console.error('❌ MongoDB connection error:', err);
        }
    }
    return db;  
}


module.exports = { connectDB };
