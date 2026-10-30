const express = require('express');
const router = express.Router();
const { rankingGlobal, verPerfil, historialUsuario } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/users/rankings - Ranking global (PÚBLICO)
router.get('/rankings', rankingGlobal);

// GET /api/users/:id - Ver perfil (REQUIERE LOGIN)
router.get('/:id', authMiddleware, verPerfil);

// GET /api/users/:id/attempts - Historial (REQUIERE LOGIN)
router.get('/:id/attempts', authMiddleware, historialUsuario);

module.exports = router;