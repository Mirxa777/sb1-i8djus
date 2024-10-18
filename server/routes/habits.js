import express from 'express';
import { pool } from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Obtener todos los hábitos del usuario
router.get('/', auth, async (req, res) => {
  try {
    const [habits] = await pool.execute(`
      SELECT h.*, c.nombre as categoria_nombre
      FROM Habitos h
      LEFT JOIN Categorias c ON h.categoria_id = c.id
      WHERE h.usuario_id = ?
    `, [req.user.userId]);
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Crear un nuevo hábito
router.post('/', auth, async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id } = req.body;
    const [result] = await pool.execute(`
      INSERT INTO Habitos (usuario_id, categoria_id, nombre, descripcion)
      VALUES (?, ?, ?, ?)
    `, [req.user.userId, categoria_id, nombre, descripcion]);
    
    const [newHabit] = await pool.execute('SELECT * FROM Habitos WHERE id = ?', [result.insertId]);
    res.status(201).json(newHabit[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Actualizar un hábito
router.put('/:id', auth, async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id } = req.body;
    const [result] = await pool.execute(`
      UPDATE Habitos
      SET nombre = ?, descripcion = ?, categoria_id = ?
      WHERE id = ? AND usuario_id = ?
    `, [nombre, descripcion, categoria_id, req.params.id, req.user.userId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hábito no encontrado' });
    }
    
    const [updatedHabit] = await pool.execute('SELECT * FROM Habitos WHERE id = ?', [req.params.id]);
    res.json(updatedHabit[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Eliminar un hábito
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.execute(`
      DELETE FROM Habitos
      WHERE id = ? AND usuario_id = ?
    `, [req.params.id, req.user.userId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hábito no encontrado' });
    }
    res.json({ message: 'Hábito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

export default router;