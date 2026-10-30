const express = require('express');
const router = express.Router();
const { guardarAttempt } = require('../controllers/attemptsController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/attempts - Guardar resultado (REQUIERE LOGIN)
router.post('/', authMiddleware, guardarAttempt);

module.exports = router;