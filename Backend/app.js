'use strict';
// Dependencias
var express = require('express');
var bodyparser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var app = express();

// Cargar archivos de rutas
var enrutador_servicio = require('./rutas/servicio');
var enrutador_destino = require('./rutas/destino');
var enrutador_testimonio = require('./rutas/testimonio');

// Middlewares (capa que se ejecuta antes de ejecutar la accion de un controlador)
// Body-parser, es para que cualquier cosa que llegue lo convierta en JSON
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// CORS
// configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//Swagger
//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Documento API',
			version: '1.0.0',
			description: 'Información de Servicios, Destinos y Testimonios.',
			contact: {
				name: 'MABC',
			},
		},
		servers: ['http://localhost:3700'],
	},
	apis: ['./rutas/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api', enrutador_servicio);
app.use('/api', enrutador_destino);
app.use('/api', enrutador_testimonio);

// Exportar
module.exports = app;
