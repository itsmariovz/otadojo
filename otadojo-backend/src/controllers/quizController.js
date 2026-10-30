const { pool } = require('../config/database');

const DIFICULTADES = ['facil', 'medio', 'dificil'];
const CATEGORIAS = ['anime-clasico', 'anime-moderno', 'videojuegos'];
const PUNTOS_POR_DIFICULTAD = { facil: 100, medio: 200, dificil: 300 };


// LISTAR TODOS LOS QUIZZES (con filtro opcional por categoría)

async function listarQuizzes(req, res) {
    try {
        const { categoria } = req.query;

        let query = `
            SELECT q.id, q.titulo, q.descripcion, q.dificultad, q.categoria,
                   q.imagen_portada, q.created_at,
                   COUNT(qs.id) AS num_preguntas
            FROM quizzes q
            LEFT JOIN questions qs ON q.id = qs.quiz_id
        `;
        const params = [];

        if (categoria && CATEGORIAS.includes(categoria)) {
            query += ' WHERE q.categoria = ?';
            params.push(categoria);
        }

        query += ' GROUP BY q.id ORDER BY q.categoria, q.dificultad, q.created_at DESC';

        const [quizzes] = await pool.query(query, params);

        res.json({ success: true, quizzes });

    } catch (error) {
        console.error('Error en listarQuizzes:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los quizzes',
            error: error.message
        });
    }
}


// VER UN QUIZ ESPECÍFICO + SUS PREGUNTAS

async function verQuiz(req, res) {
    try {
        const quizId = req.params.id;

        const [quizzes] = await pool.query(
            'SELECT id, titulo, descripcion, dificultad, categoria, imagen_portada, created_at FROM quizzes WHERE id = ?',
            [quizId]
        );

        if (quizzes.length === 0) {
            return res.status(404).json({ success: false, message: 'Quiz no encontrado' });
        }

        const quiz = quizzes[0];

        const [questions] = await pool.query(
            'SELECT id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, puntos_base FROM questions WHERE quiz_id = ? ORDER BY id',
            [quizId]
        );

        res.json({ success: true, quiz, questions });

    } catch (error) {
        console.error('Error en verQuiz:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el quiz',
            error: error.message
        });
    }
}


// CREAR QUIZ (SOLO ADMIN)

async function crearQuiz(req, res) {
    try {
        const { titulo, descripcion, dificultad, categoria, imagen_portada } = req.body;

        if (!titulo || !descripcion || !dificultad || !categoria) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos obligatorios: titulo, descripcion, dificultad, categoria'
            });
        }

        if (!DIFICULTADES.includes(dificultad)) {
            return res.status(400).json({
                success: false,
                message: 'Dificultad inválida. Debe ser: facil, medio o dificil'
            });
        }

        if (!CATEGORIAS.includes(categoria)) {
            return res.status(400).json({
                success: false,
                message: `Categoría inválida. Debe ser: ${CATEGORIAS.join(', ')}`
            });
        }

        const [result] = await pool.query(
            'INSERT INTO quizzes (titulo, descripcion, dificultad, categoria, imagen_portada) VALUES (?, ?, ?, ?, ?)',
            [titulo, descripcion, dificultad, categoria, imagen_portada || null]
        );

        res.status(201).json({
            success: true,
            message: 'Quiz creado exitosamente',
            quizId: result.insertId
        });

    } catch (error) {
        console.error('Error en crearQuiz:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el quiz',
            error: error.message
        });
    }
}


// AÑADIR UNA PREGUNTA A UN QUIZ (SOLO ADMIN)

async function crearPregunta(req, res) {
    try {
        const { quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base } = req.body;

        if (!quiz_id || !texto_pregunta || !opcion_a || !opcion_b || !opcion_c || !opcion_d || !respuesta_correcta) {
            return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
        }

        const [quizzes] = await pool.query('SELECT id, dificultad FROM quizzes WHERE id = ?', [quiz_id]);

        if (quizzes.length === 0) {
            return res.status(404).json({ success: false, message: 'Quiz no encontrado' });
        }

        if (!['a', 'b', 'c', 'd'].includes(respuesta_correcta.toLowerCase())) {
            return res.status(400).json({ success: false, message: 'respuesta_correcta debe ser: a, b, c o d' });
        }

        const puntosFinales = puntos_base || PUNTOS_POR_DIFICULTAD[quizzes[0].dificultad] || 100;

        const [result] = await pool.query(
            'INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta.toLowerCase(), puntosFinales]
        );

        res.status(201).json({
            success: true,
            message: 'Pregunta añadida exitosamente',
            questionId: result.insertId
        });

    } catch (error) {
        console.error('Error en crearPregunta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear la pregunta',
            error: error.message
        });
    }
}


// AÑADIR MÚLTIPLES PREGUNTAS A UN QUIZ (SOLO ADMIN)

async function crearPreguntas(req, res) {
    try {
        const { quiz_id, preguntas } = req.body;

        if (!quiz_id || !preguntas || !Array.isArray(preguntas) || preguntas.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos obligatorios (quiz_id, preguntas como array)'
            });
        }

        const [quizzes] = await pool.query('SELECT id, dificultad FROM quizzes WHERE id = ?', [quiz_id]);

        if (quizzes.length === 0) {
            return res.status(404).json({ success: false, message: 'Quiz no encontrado' });
        }

        const puntosDefecto = PUNTOS_POR_DIFICULTAD[quizzes[0].dificultad] || 100;
        const preguntasValidas = [];

        for (const pregunta of preguntas) {
            if (!pregunta.texto_pregunta || !pregunta.opcion_a || !pregunta.opcion_b ||
                !pregunta.opcion_c || !pregunta.opcion_d || !pregunta.respuesta_correcta) {
                return res.status(400).json({ success: false, message: 'Cada pregunta debe tener todos los campos' });
            }

            if (!['a', 'b', 'c', 'd'].includes(pregunta.respuesta_correcta.toLowerCase())) {
                return res.status(400).json({ success: false, message: 'respuesta_correcta debe ser: a, b, c o d' });
            }

            preguntasValidas.push([
                quiz_id,
                pregunta.texto_pregunta,
                pregunta.opcion_a,
                pregunta.opcion_b,
                pregunta.opcion_c,
                pregunta.opcion_d,
                pregunta.respuesta_correcta.toLowerCase(),
                pregunta.puntos_base || puntosDefecto
            ]);
        }

        await pool.query(
            'INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES ?',
            [preguntasValidas]
        );

        res.status(201).json({
            success: true,
            message: `${preguntasValidas.length} pregunta(s) añadida(s) al quiz`,
            preguntasCreadas: preguntasValidas.length
        });

    } catch (error) {
        console.error('Error en crearPreguntas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear las preguntas',
            error: error.message
        });
    }
}

module.exports = {
    listarQuizzes,
    verQuiz,
    crearQuiz,
    crearPregunta,
    crearPreguntas
};
