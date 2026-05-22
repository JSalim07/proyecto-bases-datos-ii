# Proyecto Bases de Datos II - Sistema de Poesía

## 📁 Estructura del Proyecto

```
Proyecto/
├── sql/                            # Scripts SQL
│   ├── stored_procedures.sql       # Procedimientos almacenados
│   ├── create_views.sql            # Vistas (Views)
│   └── sample_data.sql             # Datos de prueba
├── src/                            # Código fuente
│   ├── controllers/                # Controladores REST
│   ├── models/                     # Modelos de datos
│   ├── routes/                     # Rutas del API
│   ├── database/                   # Configuración de BD
│   ├── graphql/                    # GraphQL/Apollo Server
│   ├── server.js                   # Servidor GraphQL
│   └── server-rest.js              # Servidor Rest-API
├── .env                            # Variables de entorno
├── .gitignore                      # Archivos ignorados por Git
├── package.json                    # Dependencias y scripts
└── README.md                       # Este archivo
```

---








## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```
Editar `.env` con tus credenciales de MySQL.

### 3. Iniciar la base de datos (Docker)
```bash
docker start mysql_tercerparcial
```

### 4. Ejecutar scripts SQL (opcional)
```bash
# Crear procedimientos almacenados
docker exec -i mysql_tercerparcial mysql -uroot -p<TU_PASSWORD> poesia_db < sql/stored_procedures.sql

# Crear vistas
docker exec -i mysql_tercerparcial mysql -uroot -p<TU_PASSWORD> poesia_db < sql/create_views.sql

# Insertar datos de prueba
docker exec -i mysql_tercerparcial mysql -uroot -p<TU_PASSWORD> poesia_db < sql/sample_data.sql
```

### 5. Iniciar el servidor Rest-API
```bash
npm run start:rest
```

El servidor estará disponible en: **http://localhost:3000**

---

## 🗄️ Base de Datos

**Configuración Docker MySQL:**
- Contenedor: `mysql_tercerparcial`
- Puerto: `3308:3306`
- Base de datos: `poesia_db`
- Usuario: `root`
- Contraseña: Ver archivo `.env` (no incluido en el repositorio)

---

## 🎯 Scripts Disponibles

```bash
# Rest-API
npm run start:rest      # Iniciar Rest-API en producción
npm run dev:rest        # Iniciar Rest-API en desarrollo

# GraphQL
npm run start:graphql   # Iniciar servidor GraphQL/Apollo
npm run dev:graphql     # Iniciar GraphQL en desarrollo
```

---

## 📡 Endpoints del Rest-API

**Base URL:** `http://localhost:3000`

- `/api/poets` - Gestión de poetas
- `/api/poems` - Gestión de poemas
- `/api/publications` - Gestión de publicaciones
- `/api/customers` - Gestión de clientes
- `/api/sales` - Gestión de ventas

**Documentación completa:** `GET http://localhost:3000/`

---

## 🛠️ Tecnologías

- Node.js v24.15.0
- Express.js v4.18.2 - Framework REST API
- Apollo Server v3.13.0 - GraphQL server
- MySQL 9.6.0 - Base de datos
- MySQL2 v3.22.3 - Driver Node.js
- Knex.js v3.2.10 - Query builder
- dotenv v17.4.2 - Variables de entorno
- Docker - Contenedor MySQL

---

## 👤 Autor

**Justin**
Bases de Datos II - Sistema de Gestión de Poesía con REST API y GraphQL
