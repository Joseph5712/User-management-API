# User Management API

API REST para la gestión de usuarios, desarrollada con **Node.js** y **Express**.  
El proyecto implementa autenticación con **JWT**, manejo de **roles** y buenas prácticas de backend.

Este proyecto fue creado con fines de aprendizaje y portafolio, simulando un escenario real de trabajo backend.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- express-validator
- Git / GitHub

---

## 📌 Funcionalidades principales

- Registro de usuarios
- Inicio de sesión (login)
- Autenticación mediante JWT
- Roles de usuario (`USER`, `ADMIN`)
- Rutas protegidas
- Perfil del usuario autenticado
- Listado de usuarios (solo `ADMIN`)
- Paginación y búsqueda
- Validaciones de entrada
- Manejo centralizado de errores

---

## 📂 Estructura del proyecto

```
src/
 ├── app.js
 ├── server.js
 ├── config/
 ├── controllers/
 ├── middlewares/
 ├── models/
 ├── routes/
 ├── services/
 ├── utils/
 └── validators/
```

La estructura está organizada por responsabilidades para facilitar el mantenimiento y la escalabilidad.

---

## ⚙️ Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/user_management_api
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

## ▶️ Ejecutar el proyecto

Instalar dependencias:

```
npm install
```

Ejecutar en modo desarrollo:

```
npm run dev
```

El servidor se iniciará en:

```
http://localhost:3000
```

Endpoint de prueba:

```
GET /health
```

---

## 🔐 Endpoints principales

### Auth

- `POST /api/auth/register` → Registro de usuario  
- `POST /api/auth/login` → Login y generación de token  

### Usuarios

- `GET /api/users/me` → Perfil del usuario autenticado  
- `GET /api/users` → Listado de usuarios (solo `ADMIN`)  

Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

---

## 🧠 Notas finales

Este proyecto fue desarrollado siguiendo buenas prácticas como:

- Separación de responsabilidades
- Validación de datos antes de procesarlos
- Manejo consistente de errores
- Seguridad básica en autenticación

El objetivo principal es demostrar conocimientos sólidos de backend y servir como base para proyectos más complejos.

---

## 👤 Autor

**Joseph Méndez Manzanares**  
Desarrollador Web / Backend Junior
