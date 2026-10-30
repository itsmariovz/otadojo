const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// RUTAS DE PRUEBA
router.get('/test-auth', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: '✅ Estás autenticado',
        user: req.user
    });
});

router.get('/test-admin', authMiddleware, adminMiddleware, (req, res) => {
    res.json({
        success: true,
        message: '✅ Eres administrador',
        user: req.user
    });
});
module.exports = router;
