//import DB connection
const express = require('express');
const db = require('../database/database');
const multer = require('multer');
const path = require('path');
const upload = multer({ storage: multer.diskStorage({ destination: path.join(__dirname, '..', 'uploads'), filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-')}`) }) });

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
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      stock,
      price,
      image,
      category_ids
    } = req.body;

    const savedImage = req.file ? `/uploads/${req.file.filename}` : image;
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
    const parsedCategoryIds = typeof category_ids === 'string' ? JSON.parse(category_ids) : category_ids;
    if (
      !Array.isArray(parsedCategoryIds) ||
      parsedCategoryIds.length === 0
    ) {
      return res.status(400).json({
        error: 'At least one category is required'
      });
    }

    // Check that all category IDs exist
    const [categories] = await db.query(
      'SELECT id FROM categories WHERE id IN (?)',
      [parsedCategoryIds]
    );

    if (categories.length !== parsedCategoryIds.length) {
      return res.status(400).json({
        error: 'One or more category IDs do not exist'
      });
    }

    // Create product
    const [result] = await db.query(
      `INSERT INTO products
      (title, description, stock, price, image)
      VALUES (?, ?, ?, ?, ?)`,
      [title, description, stock, price, savedImage]
    );

    const productId = result.insertId;

    // Connect product to all selected categories
    for (const categoryId of parsedCategoryIds) {
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
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      stock,
      price,
      image: savedImage,
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

    const parsedCategoryIds = typeof category_ids === 'string' ? JSON.parse(category_ids) : category_ids;
    // Validate category_ids if included
    if (
      parsedCategoryIds !== undefined &&
      (!Array.isArray(parsedCategoryIds) || parsedCategoryIds.length === 0)
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
    if (parsedCategoryIds !== undefined) {
      const [categories] = await db.query(
        'SELECT id FROM categories WHERE id IN (?)',
        [parsedCategoryIds]
      );

      if (categories.length !== parsedCategoryIds.length) {
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
    const updatedImage = req.file ? `/uploads/${req.file.filename}` : image ?? product.image;

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
    if (parsedCategoryIds !== undefined) {

      // Remove old category connections
      await db.query(
        'DELETE FROM product_categories WHERE product_id = ?',
        [id]
      );

      // Add new category connections
      for (const categoryId of parsedCategoryIds) {
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
