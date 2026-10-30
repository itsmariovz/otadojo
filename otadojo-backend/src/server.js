const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Función para iniciar el servidor
async function startServer() {
    try {
        // 1. Probar conexión a MySQL
        console.log(' Probando conexión a MySQL...');
        const dbConnected = await testConnection();
        
        if (!dbConnected) {
            console.error(' No se pudo conectar a MySQL.');
            console.error(' Verifica que XAMPP esté corriendo y que el .env tenga los datos correctos.');
            process.exit(1); // Salir si no hay conexión
        }

        // 2. Iniciar el servidor Express
        app.listen(PORT, () => {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('Servidor AnimeQuiz corriendo');
            console.log(` URL: http://localhost:${PORT}`);
            console.log(`Prueba: http://localhost:${PORT}/api/test`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        });

    } catch (error) {
        console.error(' Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Iniciar
startServer();