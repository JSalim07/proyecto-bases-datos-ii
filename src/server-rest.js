const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Importar conexión a la base de datos
require('./database/db-rest');

// Importar rutas
const poetRoutes = require('./routes/poetRoutes');
const poemRoutes = require('./routes/poemRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const customerRoutes = require('./routes/customerRoutes');
const saleRoutes = require('./routes/saleRoutes');
const storedProceduresRoutes = require('./routes/storedProceduresRoutes');

// Inicializar express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'Poetry Database REST API',
        version: '1.0.0',
        author: 'Justin - Bases de Datos II',
        endpoints: {
            poets: '/api/poets',
            poems: '/api/poems',
            publications: '/api/publications',
            customers: '/api/customers',
            sales: '/api/sales'
        },
        documentation: {
            poets: {
                'GET /api/poets': 'Get all poets',
                'GET /api/poets/:id': 'Get poet by ID',
                'POST /api/poets': 'Create new poet',
                'PUT /api/poets/:id': 'Update poet',
                'DELETE /api/poets/:id': 'Delete poet',
                'GET /api/poets/:id/poems': 'Get all poems by poet'
            },
            poems: {
                'GET /api/poems': 'Get all poems',
                'GET /api/poems/:id': 'Get poem by ID',
                'POST /api/poems': 'Create new poem',
                'PUT /api/poems/:id': 'Update poem',
                'DELETE /api/poems/:id': 'Delete poem',
                'GET /api/poems/:id/publications': 'Get publications containing this poem'
            },
            publications: {
                'GET /api/publications': 'Get all publications',
                'GET /api/publications/:id': 'Get publication by ID',
                'POST /api/publications': 'Create new publication',
                'PUT /api/publications/:id': 'Update publication',
                'DELETE /api/publications/:id': 'Delete publication',
                'GET /api/publications/:id/poems': 'Get all poems in publication',
                'POST /api/publications/:id/poems': 'Add poem to publication',
                'DELETE /api/publications/:id/poems/:poemId': 'Remove poem from publication'
            },
            customers: {
                'GET /api/customers': 'Get all customers',
                'GET /api/customers/:id': 'Get customer by ID',
                'POST /api/customers': 'Create new customer',
                'PUT /api/customers/:id': 'Update customer',
                'DELETE /api/customers/:id': 'Delete customer',
                'GET /api/customers/:id/sales': 'Get all sales by customer'
            },
            sales: {
                'GET /api/sales': 'Get all sales',
                'GET /api/sales/:id': 'Get sale by ID',
                'POST /api/sales': 'Create new sale',
                'PUT /api/sales/:id': 'Update sale',
                'DELETE /api/sales/:id': 'Delete sale',
                'GET /api/sales/:id/publications': 'Get publications in sale',
                'POST /api/sales/:id/publications': 'Add publication to sale',
                'DELETE /api/sales/:id/publications/:publicationId': 'Remove publication from sale'
            }
        }
    });
});

// Usar rutas
app.use('/api/poets', poetRoutes);
app.use('/api/poems', poemRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/stored-procedures', storedProceduresRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════╗
║       Poetry Database REST API - BD II              ║
║       Server running on port ${PORT}                    ║
║       http://localhost:${PORT}                          ║
║                                                      ║
║       Documentación: http://localhost:${PORT}/          ║
╚══════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
