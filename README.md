# 🥋 Otadojo — Plataforma Full-Stack & API REST con RBAC

Aplicación web Full-Stack desarrollada como Trabajo de Fin de Grado (DAW), diseñada con arquitectura cliente-servidor desacoplada, API RESTful y controles de seguridad y autorización basados en roles (RBAC).

## 🏗️ Estructura del Proyecto

* **`/otadojo-frontend`**: SPA desarrollada en **Angular (TypeScript)**. Implementa guardas de navegación (`Guards`), interceptores HTTP para inyección de tokens y gestión de estado por rol de usuario.
* **`/otadojo-backend`**: Servidor **Node.js / Express** con arquitectura modular. Gestiona la lógica de negocio, persistencia de datos y validación de seguridad en cada endpoint.

---

## 🛡️ Seguridad y Arquitectura (AppSec Highlights)

* **Control de Accesos Basado en Roles (RBAC):** Segregación de permisos entre usuarios estándar y administradores tanto en la capa de presentación (Angular Guards) como en el servidor (Middlewares de autorización).
* **Autenticación stateless con JWT:** Gestión segura de sesiones mediante JSON Web Tokens y protección de rutas privadas frente a accesos no autorizados (mitigación de *Broken Access Control* - OWASP A01).
* **Validación y sanitización de datos:** Verificación de esquemas en las peticiones entrantes a la API REST antes de interactuar con la base de datos.

---

## 🛠️ Stack Tecnológico

* **Frontend:** Angular, TypeScript, SCSS, RxJS.
* **Backend:** Node.js, Express, REST API, JWT.
* **Seguridad & Pruebas:** Postman, Control de sesiones, RBAC.
