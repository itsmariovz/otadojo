const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Crear la aplicación Express
const app = express();

// MIDDLEWARES GLOBALES
app.use(cors()); // Permite que Angular se comunique con el backend
app.use(express.json()); // Parsea JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Parsea formularios

// RUTA DE PRUEBA (para verificar que funciona)
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: '🎉 Backend de AnimeQuiz funcionando!',
        timestamp: new Date().toISOString()
    });
});


// RUTAS DE AUTENTICACIÓN 

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// RUTAS DE QUIZZES
const quizRoutes = require('./routes/quizRoutes');
app.use('/api/quizzes', quizRoutes);

// RUTAS DE ATTEMPTS 
const attemptsRoutes = require('./routes/attemptsRoutes');
app.use('/api/attempts', attemptsRoutes);

// RUTAS DE USUARIOS
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// RUTA NO ENCONTRADA (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});


// Exportamos la app
module.exports = app;