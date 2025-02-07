const  express  = require('express');
const { connectDB } = require('./config/db');
const shopRoutes = require('./routes/shopRoutes')
const productRoutes = require('./routes/productRoutes')
const deliveryRoutes = require('./routes/deliveryRoutes')
require('dotenv').config();


const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/shop',shopRoutes)
app.use('/api/product',productRoutes)
app.use('/api/delivery',deliveryRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));