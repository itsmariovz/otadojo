const { pool } = require('../config/database');


// RANKING GLOBAL - TOP 10 USUARIOS

async function rankingGlobal(req, res) {
    try {
        // Query para obtener top 10 usuarios por puntos totales
        const [ranking] = await pool.query(`
            SELECT 
                u.id,
                u.username,
                SUM(qa.puntos_obtenidos) AS puntos_totales,
                COUNT(qa.id) AS quizzes_jugados
            FROM users u
            JOIN quiz_attempts qa ON u.id = qa.user_id
            GROUP BY u.id, u.username
            ORDER BY puntos_totales DESC
            LIMIT 10
        `);
        
        // Devolver el ranking
        res.json({
            success: true,
            ranking: ranking
        });
        
    } catch (error) {
        console.error('Error en rankingGlobal:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el ranking',
            error: error.message
        });
    }
}

// VER PERFIL DE USUARIO

async function verPerfil(req, res) {
    try {
        // Obtener el ID del usuario de la URL
        const userId = req.params.id;
        
        // Buscar el usuario
        const [users] = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [userId]
        );
        
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        const user = users[0];
        
        // Obtener estadísticas del usuario
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) AS quizzes_jugados,
                SUM(puntos_obtenidos) AS puntos_totales,
                MAX(puntos_obtenidos) AS mejor_puntuacion,
                AVG(puntos_obtenidos) AS promedio_puntos
            FROM quiz_attempts
            WHERE user_id = ?
        `, [userId]);
        
        // Devolver perfil + estadísticas
        res.json({
            success: true,
            usuario: user,
            estadisticas: stats[0]
        });
        
    } catch (error) {
        console.error('Error en verPerfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el perfil',
            error: error.message
        });
    }
}


// HISTORIAL DE ATTEMPTS DE UN USUARIO

async function historialUsuario(req, res) {
    try {
        // Obtener el ID del usuario de la URL
        const userId = req.params.id;
        
        // Obtener todos los attempts del usuario con info del quiz
        const [attempts] = await pool.query(`
            SELECT 
                qa.id,
                q.titulo AS quiz_titulo,
                q.dificultad,
                qa.puntos_obtenidos,
                qa.respuestas_correctas,
                qa.total_preguntas,
                qa.completado_at
            FROM quiz_attempts qa
            JOIN quizzes q ON qa.quiz_id = q.id
            WHERE qa.user_id = ?
            ORDER BY qa.completado_at DESC
        `, [userId]);
        
        // Devolver historial
        res.json({
            success: true,
            historial: attempts
        });
        
    } catch (error) {
        console.error('Error en historialUsuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el historial',
            error: error.message
        });
    }
}

module.exports = {
    rankingGlobal,
    verPerfil,
    historialUsuario
};