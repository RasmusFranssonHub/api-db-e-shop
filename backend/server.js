
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

// Use routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

