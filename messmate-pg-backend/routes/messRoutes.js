const express = require('express');
const router = express.Router();
const Mess = require('../models/Mess');
const { Op } = require('sequelize');
const authenticateToken = require('../middleware/auth');

// ------------------ GET all messes (public) ------------------
router.get('/', async (req, res) => {
  try {
    const { location, minPrice, limit, offset } = req.query;
    const whereClause = {};
    if (location) whereClause.location = location;
    if (minPrice) whereClause.price = { [Op.gte]: parseInt(minPrice) };
    const queryLimit = Math.min(parseInt(limit) || 10, 100);
    const queryOffset = Math.max(parseInt(offset) || 0, 0);

    const messes = await Mess.findAll({
      where: whereClause,
      limit: queryLimit,
      offset: queryOffset
    });

    res.json({ count: messes.length, data: messes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------ GET a single mess (public) ------------------
router.get('/:id', async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);
    if (!mess) return res.status(404).json({ message: 'Mess not found' });
    res.json(mess);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------ CREATE a new mess (protected) ------------------
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, location, price, rating } = req.body;
    const newMess = await Mess.create({ name, location, price, rating });
    res.status(201).json(newMess);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(400).json({ message: 'Invalid input', error: err.message });
  }
});

// ------------------ UPDATE a mess (protected) ------------------
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);
    if (!mess) return res.status(404).json({ message: 'Mess not found' });

    const { name, location, price, rating } = req.body;
    await mess.update({ name, location, price, rating });

    res.json({ message: 'Mess updated successfully', mess });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(400).json({ message: 'Invalid input', error: err.message });
  }
});

// ------------------ DELETE a mess (protected) ------------------
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);
    if (!mess) return res.status(404).json({ message: 'Mess not found' });

    await mess.destroy();
    res.json({ message: 'Mess deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;

