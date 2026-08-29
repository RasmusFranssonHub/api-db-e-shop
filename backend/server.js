
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

