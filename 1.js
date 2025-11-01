const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Replace with actual DB connection logic (e.g., Mongoose.connect)
// require('./db/connection'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow frontend to talk to the backend
app.use(express.json()); // Body parser

// --- Routes ---
app.use('/api/products', productRoutes);
app.use('/api', cartRoutes); // Cart routes like /api/cart, /api/checkout

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
