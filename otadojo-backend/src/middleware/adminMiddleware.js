// Middleware para verificar que el usuario sea ADMIN
// IMPORTANTE: Este middleware debe usarse DESPUÉS de authMiddleware
function adminMiddleware(req, res, next) {
    try {
        // 1. Verificar que req.user exista (debería existir si authMiddleware se ejecutó antes)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
        }
        
        // 2. Verificar que el rol sea 'admin'
        if (req.user.rol !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requieren permisos de administrador'
            });
        }
        
        // 3. Si es admin, continuar
        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al verificar permisos',
            error: error.message
        });
    }
}

module.exports = adminMiddleware;