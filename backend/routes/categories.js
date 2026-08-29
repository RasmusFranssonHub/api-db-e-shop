const express = require('express');
const db = require('../database/database');

const router = express.Router();

//********************************//
// ------ CATEGORY ROUTES --------//
// *******************************//


// GET - all categories

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch categories' });
  }
});

// GET - category by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Category not found'
      });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not fetch category'
    });
  }
});

// GET - products for a specific category

router.get('/:id/products', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT products.*
      FROM products
      JOIN product_categories
        ON products.id = product_categories.product_id
      WHERE product_categories.category_id = ?
      `,
      [id]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch products for category' });
  }
});

// POST - create category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Category name is required'
      });
    }

    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );

    res.status(201).json({
      id: result.insertId,
      name
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not add category'
    });
  }
});

// PATCH - update category
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Category name is required'
      });
    }

    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Category not found'
      });
    }

    res.json({
      id: Number(id),
      name
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not update category'
    });
  }
});

// DELETE - delete category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Category not found'
      });
    }

    res.json({
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not delete category'
    });
  }
});

module.exports = router;