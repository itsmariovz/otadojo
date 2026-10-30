const jwt = require('jsonwebtoken');

// Middleware para verificar que el usuario esté autenticado
function authMiddleware(req, res, next) {
    try {
        // 1. Obtener el token del header Authorization
        const authHeader = req.headers.authorization;
        
        // 2. Verificar que exista el header
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autenticación'
            });
        }
        
        // 3. El formato es: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        // Extraemos solo el token (quitamos "Bearer ")
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Formato de token inválido'
            });
        }
        
        // 4. Verificar que el token sea válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 5. Guardar los datos del usuario en req.user para usarlos después
        req.user = decoded; // decoded = { id: 1, username: "admin", rol: "admin" }
        
        // 6. Continuar al siguiente middleware o controlador
        next();
        
    } catch (error) {
        // Si jwt.verify falla (token expirado, inválido, etc.)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }
        
        // Cualquier otro error
        return res.status(500).json({
            success: false,
            message: 'Error al verificar autenticación',
            error: error.message
        });
    }
}


module.exports = authMiddleware;