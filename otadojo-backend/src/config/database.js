// Importamos mysql2 con soporte de promesas (async/await)
const mysql = require('mysql2/promise');

// Importamos dotenv para leer el archivo .env
require('dotenv').config();

// Creamos el pool de conexiones
// Un "pool" es como un grupo de conexiones reutilizables (más eficiente)
const pool = mysql.createPool({
    host: process.env.DB_HOST,        // localhost (del .env)
    user: process.env.DB_USER,        // root (del .env)
    password: process.env.DB_PASSWORD, // vacío  no he pueto password (del .env)
    database: process.env.DB_NAME,    // animequiz_db (del .env)
    port: process.env.DB_PORT,        // 3306 (del .env)
    waitForConnections: true,
    connectionLimit: 10,              // Máximo 10 conexiones simultáneas
    queueLimit: 0
});

// Función para probar que la conexión funciona
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a MySQL');
        connection.release(); // Liberamos la conexión para que otros la usen
        return true;
    } catch (error) {
        console.error('Error conectando a MySQL:', error.message);
        return false;
    }
}

// Exportamos el pool y la función de prueba
module.exports = { pool, testConnection };