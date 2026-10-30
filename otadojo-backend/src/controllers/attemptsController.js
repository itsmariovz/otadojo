const { pool } = require('../config/database');


// GUARDAR RESULTADO DE QUIZ JUGADO

async function guardarAttempt(req, res) {
    try {
        // 1. Obtener user_id del token JWT (seguro, no puede falsificarse)
        const userId = req.user.id;
        
        // 2. Obtener datos del body
        const { quiz_id, respuestas } = req.body;
        
        // 3. Validar datos obligatorios
        if (!quiz_id || !respuestas) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos obligatorios (quiz_id, respuestas)'
            });
        }
        
        // 4. Verificar que el quiz existe
        const [quizzes] = await pool.query(
            'SELECT id FROM quizzes WHERE id = ?',
            [quiz_id]
        );
        
        if (quizzes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Quiz no encontrado'
            });
        }
        
        // 5. Obtener TODAS las preguntas del quiz (CON respuesta_correcta)
        const [questions] = await pool.query(
            'SELECT id, respuesta_correcta, puntos_base FROM questions WHERE quiz_id = ?',
            [quiz_id]
        );
        
        if (questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Este quiz no tiene preguntas'
            });
        }
        
        // 6. Calcular puntuación
        let puntosObtenidos = 0;
        let respuestasCorrectas = 0;
        const totalPreguntas = questions.length;
        
        // Recorrer cada pregunta y verificar
        for (const question of questions) {
            const questionId = question.id.toString();
            const respuestaUsuario = respuestas[questionId];
            const respuestaCorrecta = question.respuesta_correcta;
            
            // Verificar si el usuario respondió esta pregunta
            if (respuestaUsuario && respuestaUsuario === respuestaCorrecta) {
                respuestasCorrectas++;
                puntosObtenidos += question.puntos_base;
            }
        }
        
        // 7. Guardar en la base de datos
        const [result] = await pool.query(
            'INSERT INTO quiz_attempts (user_id, quiz_id, puntos_obtenidos, respuestas_correctas, total_preguntas) VALUES (?, ?, ?, ?, ?)',
            [userId, quiz_id, puntosObtenidos, respuestasCorrectas, totalPreguntas]
        );
        
        // 8. Devolver resultado
        res.status(201).json({
            success: true,
            message: 'Quiz completado',
            resultado: {
                attemptId: result.insertId,
                puntos: puntosObtenidos,
                correctas: respuestasCorrectas,
                total: totalPreguntas,
                porcentaje: Math.round((respuestasCorrectas / totalPreguntas) * 100)
            }
        });
        
    } catch (error) {
        console.error('Error en guardarAttempt:', error);
        res.status(500).json({
            success: false,
            message: 'Error al guardar el intento',
            error: error.message
        });
    }
}

module.exports = {
    guardarAttempt
};