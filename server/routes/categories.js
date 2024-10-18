import express from 'express';
import { pool } from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Obtener todas las categorías
router.get('/', auth, async (req, res) => {
  try {
    const [categories] = await pool.execute('SELECT * FROM Categorias');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Crear una nueva categoría
router.post('/', auth, async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.execute('INSERT INTO Categorias (nombre) VALUES (?)', [nombre]);
    const [newCategory] = await pool.execute('SELECT * FROM Categorias WHERE id = ?', [result.insertId]);
    res.status(201).json(newCategory[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

export default router;