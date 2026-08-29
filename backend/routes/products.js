//import DB connection
const express = require('express');
const db = require('../database/database');

const router = express.Router();

//********************************//
// ------- PRODUCT ROUTES --------//
// *******************************//

// GET - get all products with search and sorting
router.get('/', async (req, res) => {
  try {
    const { search, sort } = req.query;

    let sql = 'SELECT * FROM products';
    const values = [];

    // Search by product title
    if (search) {
      sql += ' WHERE title LIKE ?';
      values.push(`%${search}%`);
    }

    // Sort by price
    if (sort === 'price_asc') {
      sql += ' ORDER BY price ASC';
    }

    if (sort === 'price_desc') {
      sql += ' ORDER BY price DESC';
    }

    const [rows] = await db.query(sql, values);

    res.json(rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not fetch products'
    });
  }
});

// GET - a specific product by ID

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Could not fetch product'
    });
  }
});

// POST - create product
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      stock,
      price,
      image,
      category_ids
    } = req.body;

    // Validate required product fields
    if (
      !title ||
      !description ||
      stock === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        error: 'title, description, stock and price are required'
      });
    }

    // Validate categories
    if (
      !Array.isArray(category_ids) ||
      category_ids.length === 0
    ) {
      return res.status(400).json({
        error: 'At least one category is required'
      });
    }

    // Check that all category IDs exist
    const [categories] = await db.query(
      'SELECT id FROM categories WHERE id IN (?)',
      [category_ids]
    );

    if (categories.length !== category_ids.length) {
      return res.status(400).json({
        error: 'One or more category IDs do not exist'
      });
    }

    // Create product
    const [result] = await db.query(
      `INSERT INTO products
      (title, description, stock, price, image)
      VALUES (?, ?, ?, ?, ?)`,
      [title, description, stock, price, image]
    );

    const productId = result.insertId;

    // Connect product to all selected categories
    for (const categoryId of category_ids) {
      await db.query(
        `INSERT INTO product_categories
        (product_id, category_id)
        VALUES (?, ?)`,
        [productId, categoryId]
      );
    }

    res.status(201).json({
      id: productId,
      title,
      description,
      stock,
      price,
      image,
      category_ids
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not add product'
    });
  }
});


// PATCH - update product
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      stock,
      price,
      image,
      category_ids
    } = req.body;

    // Validate product fields if they are included
    if (
      (title !== undefined && !title) ||
      (description !== undefined && !description) ||
      (stock !== undefined && stock === '') ||
      (price !== undefined && price === '')
    ) {
      return res.status(400).json({
        error: 'title, description, stock and price cannot be empty'
      });
    }

    // Validate category_ids if included
    if (
      category_ids !== undefined &&
      (!Array.isArray(category_ids) || category_ids.length === 0)
    ) {
      return res.status(400).json({
        error: 'category_ids must contain at least one category'
      });
    }

    // Check that product exists
    const [products] = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    const product = products[0];

    // Check that all category IDs exist
    if (category_ids !== undefined) {
      const [categories] = await db.query(
        'SELECT id FROM categories WHERE id IN (?)',
        [category_ids]
      );

      if (categories.length !== category_ids.length) {
        return res.status(400).json({
          error: 'One or more category IDs do not exist'
        });
      }
    }

    // Keep old values if they were not included in PATCH
    const updatedTitle = title ?? product.title;
    const updatedDescription = description ?? product.description;
    const updatedStock = stock ?? product.stock;
    const updatedPrice = price ?? product.price;
    const updatedImage = image ?? product.image;

    // Update product
    await db.query(
      `UPDATE products
       SET title = ?, description = ?, stock = ?, price = ?, image = ?
       WHERE id = ?`,
      [
        updatedTitle,
        updatedDescription,
        updatedStock,
        updatedPrice,
        updatedImage,
        id
      ]
    );

    // Update categories if category_ids was included
    if (category_ids !== undefined) {

      // Remove old category connections
      await db.query(
        'DELETE FROM product_categories WHERE product_id = ?',
        [id]
      );

      // Add new category connections
      for (const categoryId of category_ids) {
        await db.query(
          `INSERT INTO product_categories
           (product_id, category_id)
           VALUES (?, ?)`,
          [id, categoryId]
        );
      }
    }

    res.json({
      id: Number(id),
      title: updatedTitle,
      description: updatedDescription,
      stock: updatedStock,
      price: updatedPrice,
      image: updatedImage,
      category_ids: category_ids
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not update product'
    });
  }
});

// DELETE - delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Could not delete product'
    });
  }
});
module.exports = router;