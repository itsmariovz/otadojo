const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// REGISTRAR NUEVO USUARIO

async function register(req, res) {
    try {
        // 1. Obtener los datos del body
        const { username, email, password } = req.body;

        // 2. Validar que vengan todos los datos
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos obligatorios (username, email, password)'
            });
        }

        // 3. Verificar si el username ya existe
        const [existingUsername] = await pool.query(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existingUsername.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El username ya está en uso'
            });
        }

        // 4. Verificar si el email ya existe
        const [existingEmail] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingEmail.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }

        // 5. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10); // Genera "sal" (seguridad extra)
        const hashedPassword = await bcrypt.hash(password, salt); // Encripta

        // 6. Insertar usuario en la BD
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password, rol) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, 'user']
        );

        // 7. Responder con éxito
        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
}
async function login(req, res) {
    try {
        // 1. Obtener los datos del body
        const { email, password } = req.body;

        // 2. Validar que vengan los datos
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y password son obligatorios'
            });
        }

        // 3. Buscar el usuario por email
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // 4. Verificar si existe el usuario
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const user = users[0]; // El usuario encontrado

        // 5. Comparar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        // 6. Generar el token JWT
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                rol: user.rol 
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 7. Responder con el token y datos del usuario
        res.json({
            success: true,
            message: 'Login exitoso',
            token: token,
            usuario: {              
                id: user.id,
                username: user.username,
                email: user.email,
                rol: user.rol
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
}

// Exportamos las funciones
module.exports = { register, login };