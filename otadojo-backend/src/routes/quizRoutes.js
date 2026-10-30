const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { listarQuizzes, verQuiz, crearQuiz, crearPreguntas, crearPregunta } = require('../controllers/quizController');

// GET /api/quizzes - Listar todos (PÚBLICO)
router.get('/', listarQuizzes);

// GET /api/quizzes/:id - Ver uno específico (PÚBLICO)
router.get('/:id', verQuiz);

// POST /api/quizzes - Crear quiz (SOLO ADMIN)
router.post('/', authMiddleware, adminMiddleware, crearQuiz);

// POST /api/quizzes/questions - Añadir UNA pregunta (SOLO ADMIN) ← AÑADIR ESTO
router.post('/questions', authMiddleware, adminMiddleware, crearPregunta);

// POST /api/quizzes/:id/questions - Añadir MÚLTIPLES preguntas (SOLO ADMIN)
router.post('/:id/questions', authMiddleware, adminMiddleware, crearPreguntas);

module.exports = router;