# Proyecto Bases de Datos II - Sistema de Poesía

## 📁 Estructura del Proyecto

```
Proyecto/
├── docs/                           # Documentación
│   ├── ACTIVIDAD_2_REST_API.md    # Documentación del Rest-API
│   ├── DIAGRAMA_BASE_DATOS.md     # Diagramas de la BD
│   └── INSTRUCCIONES_DATAGRIP.md  # Guía de DataGrip
├── sql/                            # Scripts SQL
│   ├── create_tables_english.sql   # Creación de tablas
│   ├── insert_sample_data.sql      # Datos de prueba
│   └── queries_and_procedures.sql  # Consultas y procedimientos
├── src/                            # Código fuente
│   ├── controllers/                # Controladores del Rest-API
│   ├── models/                     # Modelos de datos
│   ├── routes/                     # Rutas del API
│   ├── database/                   # Configuración de BD
│   ├── graphql/                    # GraphQL (legacy)
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

### 2. Iniciar la base de datos (Docker)
```bash
docker start mysql_tercerparcial
```

### 3. Ejecutar scripts SQL
- Abrir DataGrip
- Conectar a `localhost:3308`
- Ejecutar: `sql/create_tables_english.sql`

### 4. Iniciar el servidor Rest-API
```bash
npm run start:rest
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📚 Documentación

- **Rest-API:** [docs/ACTIVIDAD_2_REST_API.md](docs/ACTIVIDAD_2_REST_API.md)
- **Base de Datos:** [docs/DIAGRAMA_BASE_DATOS.md](docs/DIAGRAMA_BASE_DATOS.md)
- **DataGrip:** [docs/INSTRUCCIONES_DATAGRIP.md](docs/INSTRUCCIONES_DATAGRIP.md)

---

## 🗄️ Base de Datos

**Configuración Docker MySQL:**
- Contenedor: `mysql_tercerparcial`
- Puerto: `3308:3306`
- Base de datos: `poesia_db`
- Usuario: `root`
- Contraseña: `P4rc1al_3DB`

---

## 🎯 Scripts Disponibles

```bash
# Rest-API
npm run start:rest      # Iniciar Rest-API en producción
npm run dev:rest        # Iniciar Rest-API en desarrollo

# GraphQL (legacy)
npm run start:graphql   # Iniciar servidor GraphQL
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
- Express.js v4.18.2
- MySQL 9.6.0
- MySQL2 Driver v3.22.3
- Docker

---

## 👤 Autor

**Justin**
Bases de Datos II
Universidad La Salle
